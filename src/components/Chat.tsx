import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { messagesState, inputState } from '../recoil/Chat/atoms';
import profile from '../assets/images/default-profile-image.png';
import { Client } from '@stomp/stompjs';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import CodeState from '../recoil/Code/atoms';
import { useDebounce } from '../hooks/useDebounce';
import ReceiveContent from '../recoil/ReceiveContent/atom';
import { FaArrowCircleDown } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ChatSearch from './ChatSearch';

interface ChatProps {
  userName: string;
  projectId: number;
  token: string;
}

interface ChatMessage {
  senderName: string;
  content: string;
  createdAt: string;
}

interface RecoilMessage {
  text: string;
  sender: string;
  profile: string;
  createdAt: string;
}

interface ChatMessageProps {
  isOwnMessage: boolean;
}

const socketUrl = `${import.meta.env.VITE_API_BASE_URL.replace('http', 'ws')}/ws`;
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Chat = ({ userName, projectId, token }: ChatProps) => {
  const [messages, setMessages] = useRecoilState<RecoilMessage[]>(messagesState);
  const [input, setInput] = useRecoilState<string>(inputState);
  const client = useRef<Client | null>(null);
  const [cookies] = useCookies(['userId']);
  const userId = Number(cookies['userId']);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const Code = useRecoilValue(CodeState);
  const setReceiveCode = useSetRecoilState(ReceiveContent);
  const sendCode = useDebounce(Code.content, 1000);
  const [appliedKeyword, setAppliedKeyword] = useState<string>('');
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleSearch = (keyword: string) => setAppliedKeyword(keyword);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHighlightChange = (index: number) => {
    const messageElement = document.getElementById(`message-${index}`);
    messageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 700;
      setIsScrollButtonVisible(!isAtBottom);
    }
  };

  useEffect(() => {
    const chatMessagesElement = chatMessagesRef.current;
    if (chatMessagesElement) {
      chatMessagesElement.addEventListener('scroll', handleScroll);
      return () => {
        chatMessagesElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  //채팅 기록
  const fetchChatHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/chat/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.chatInfoList) {
        const { chatInfoList } = response.data;
        const formattedMessages = chatInfoList.map((message: ChatMessage) => ({
          text: message.content,
          sender: message.senderName,
          profile: profile,
          createdAt: message.createdAt,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  }, [projectId, token, setMessages]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  //채팅 send
  const subscribeToChat = useCallback(() => {
    client.current?.subscribe(`/topic/chatroom/${projectId}`, message => {
      const receivedMessage = JSON.parse(message.body);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: receivedMessage.content,
          sender: receivedMessage.sender,
          profile: profile,
          createdAt: receivedMessage.createdAt,
        },
      ]);
    });
  }, [projectId, setMessages]);

  //코드 공유
  const subscribeToCode = useCallback(() => {
    client.current?.subscribe(`/topic/project/${projectId}`, response => {
      const codeResponse = JSON.parse(response.body);
      setReceiveCode({
        sender: codeResponse.sender,
        content: codeResponse.content,
      });
    });
  }, [projectId, setReceiveCode]);

  const subscribeToRequest = useCallback(() => {
    if (client.current) {
      client.current.subscribe(`/topic/request/${projectId}`, message => {
        const receiveMessage = JSON.parse(message.body);

        if (receiveMessage.userId !== userId && location.search !== '') {
          const currentCodeMessage = {
            sender: userName,
            content: Code.content,
            projectId: projectId,
            userId: userId,
          };
          client.current?.publish({
            destination: `/app/code`,
            body: JSON.stringify(currentCodeMessage),
          });
        }
      });
    }
  }, [Code.content, location.search, projectId, userId, userName]);

  const sendCodeContent = useCallback(() => {
    if (client.current && client.current.connected && sendCode) {
      const Code = {
        sender: userName,
        content: sendCode,
        projectId: projectId,
        userId: userId,
      };

      client.current.publish({
        destination: `/app/code`,
        body: JSON.stringify(Code),
      });
    } else {
      console.error('STOMP connection is not established or input is empty.');
    }
  }, [sendCode, userName, projectId, userId]);

  useEffect(() => {
    sendCodeContent();
  }, [sendCode, sendCodeContent]);

  useEffect(() => {
    client.current = new Client({
      brokerURL: socketUrl,
      debug: console.log,
      reconnectDelay: 50000,
      onConnect: () => {
        console.log('Connected to WebSocket');

        subscribeToChat();
        subscribeToCode();
        subscribeToRequest();
      },
      onDisconnect: () => console.log('Disconnected from WebSocket'),
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
      client.current = null;
    };
  }, [projectId, subscribeToChat, subscribeToCode, subscribeToRequest, userId, userName]);

  const sendMessage = () => {
    if (client.current?.connected && input) {
      client.current.publish({
        destination: '/app/message',
        body: JSON.stringify({
          sender: userName,
          content: input,
          projectId: projectId,
          userId: userId,
        }),
      });
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <IdeChat_Top>
        <ChatTitle>채팅</ChatTitle>
        <ChatSearch
          messages={messages.map(msg => ({
            senderName: msg.sender,
            content: msg.text,
            createdAt: msg.createdAt,
          }))}
          onSearch={handleSearch}
          onHighlightChange={handleHighlightChange}
        />
      </IdeChat_Top>

      <ChatMessages ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            id={`message-${index}`}
            isOwnMessage={message.sender === userName}
            sender={message.sender}
          >
            {message.sender !== userName && <ProfileImage src={message.profile} alt={`${message.sender}'s profile`} />}

            <MessageContent isOwnMessage={message.sender === userName}>
              {message.sender !== userName && <SenderName>{message.sender}</SenderName>}
              <MessageText isOwnMessage={message.sender === userName}>
                {appliedKeyword && message.text.includes(appliedKeyword) ? (
                  <>
                    {message.text
                      .split(new RegExp(`(${appliedKeyword})`, 'gi'))
                      .map((part, index) =>
                        part.toLowerCase() === appliedKeyword.toLowerCase() ? (
                          <HighlightedText key={index}>{part}</HighlightedText>
                        ) : (
                          part
                        ),
                      )}
                  </>
                ) : (
                  message.text
                )}
              </MessageText>
              <MessageTime>{dayjs(message.createdAt).format('HH:mm')}</MessageTime>
            </MessageContent>
          </ChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isComposing) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </ChatInputContainer>

      {isScrollButtonVisible && (
        <ScrollToBottomButton onClick={scrollToBottom}>
          <FaArrowCircleDown />
        </ScrollToBottomButton>
      )}
    </ChatContainer>
  );
};

export default Chat;

const IdeChat_Top = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 23px;
`;

const ChatTitle = styled.div`
  font-size: 16px;
  color: white;
  font-weight: 700;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  height: 100%;
  position: relative;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  color: white;
  height: calc(100vh - 170px);
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ChatMessage = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOwnMessage',
})<ChatMessageProps & { sender: string }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  justify-content: ${({ isOwnMessage }) => (isOwnMessage ? 'flex-end' : 'flex-start')};
  margin-left: ${({ isOwnMessage }) => (isOwnMessage ? 'auto' : '0')};
  margin-right: ${({ isOwnMessage }) => (isOwnMessage ? '0' : 'auto')};
`;

const SenderName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 5px;
`;

const MessageContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOwnMessage',
})<ChatMessageProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isOwnMessage }) => (isOwnMessage ? 'flex-end' : 'flex-start')};
  position: relative;
`;

const MessageText = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOwnMessage',
})<ChatMessageProps>`
  background-color: ${({ isOwnMessage, theme }) => (isOwnMessage ? theme.colors.green1 : '#3a3d41')};
  color: ${({ isOwnMessage }) => (isOwnMessage ? '#000000' : '#ffffff')};
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  word-wrap: break-word;
  max-width: 250px;
  position: relative;
`;

const HighlightedText = styled.span`
  background-color: yellow;
  color: black;
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  border-top: 1px solid black;
  padding: 10px;
  background-color: #1e2124;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  background-color: #3a3d41;
  border: none;
  color: white;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.green1};
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const ScrollToBottomButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;
