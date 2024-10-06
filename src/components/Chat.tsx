import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { messagesState, inputState } from '../recoil/Chat/atoms';
import profile from '../assets/images/default-profile-image.png'; // 프로필 이미지 경로
import { Client } from '@stomp/stompjs';
import dayjs from 'dayjs';
import { IdeChat_Top } from '../pages/IDEPage/Ide.style';
import { useCookies } from 'react-cookie';
import CodeState from '../recoil/Code/atoms';
import { useDebounce } from '../hooks/useDebounce';
import ReceiveContent from '../recoil/ReceiveContent/atom';
import ChatSearch from './ChatSearch';
import { FaArrowCircleDown } from 'react-icons/fa'; // 아이콘 사용
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false); // 스크롤 버튼 상태 추가
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const location = useLocation().pathname;

  // 검색어 처리 함수
  const handleSearch = (keyword: string) => setAppliedKeyword(keyword);

  // 스크롤 처리 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHighlightChange = (index: number) => {
    const messageElement = document.getElementById(`message-${index}`);
    messageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // 스크롤 이벤트 처리 함수
  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 700; // 하단에 거의 근접한지 확인
      setIsScrollButtonVisible(!isAtBottom); // 하단에 있으면 버튼 숨기기
      console.log(`Scroll position: ${scrollTop}, Scroll height: ${scrollHeight}, Client height: ${clientHeight}`);
    }
  };
  // 스크롤 이벤트 연결
  useEffect(() => {
    const chatMessagesElement = chatMessagesRef.current;
    if (chatMessagesElement) {
      chatMessagesElement.addEventListener('scroll', handleScroll);
      return () => {
        chatMessagesElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // 채팅 기록을 서버에서 불러오기
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

  const subscribeToCode = useCallback(() => {
    client.current?.subscribe(`/topic/project/${projectId}`, response => {
      const codeResponse = JSON.parse(response.body);
      setReceiveCode({
        sender: codeResponse.sender,
        content: codeResponse.content,
      });
    });
  }, [projectId, setReceiveCode]);

  // 초대한 사용자가 코드 요청을 받고 코드를 전송
  const subscribeToRequest = useCallback(() => {
    if (client.current) {
      client.current.subscribe(`/topic/request/${projectId}`, message => {
        const receiveMessage = JSON.parse(message.body);

        if (receiveMessage.userId !== userId && !location.includes('invite')) {
          // 코드 요청을 받은 경우 현재 코드를 전송
          const currentCodeMessage = {
            sender: userName,
            content: Code.content, // 현재 작성 중인 코드
            projectId: projectId,
            userId: userId,
          };
          client.current?.publish({
            destination: `/app/code`, // 응답 경로
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

  // WebSocket 연결 설정 및 구독
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

        const requestCode = {
          sender: userName,
          projectId: projectId,
          userId: userId,
        };
        client.current?.publish({
          destination: `/app/request`,
          body: JSON.stringify(requestCode),
        });
      },
      onDisconnect: () => console.log('Disconnected from WebSocket'),
    });
    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [projectId, subscribeToChat, subscribeToCode, subscribeToRequest, userId, userName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        <div>채팅</div>
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
          <ChatMessage key={index} id={`message-${index}`} isOwnMessage={message.sender === userName}>
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

      {isScrollButtonVisible && ( // 스크롤 버튼 표시
        <ScrollToBottomButton onClick={scrollToBottom}>
          <FaArrowCircleDown />
        </ScrollToBottomButton>
      )}
    </ChatContainer>
  );
};

export default Chat;

// 스타일 정의
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
})<ChatMessageProps>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  ${({ isOwnMessage }) =>
    isOwnMessage
      ? `
    justify-content: flex-end;
    margin-left: auto; 
  `
      : `
    justify-content: flex-start;
    margin-right: auto; 
  `}
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
