import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { messagesState, inputState } from '../recoil/Chat/atoms';
import profile from '../assets/images/default-profile-image.png';
import { Client } from '@stomp/stompjs';
import dayjs from 'dayjs';
import { IdeChat_Top } from '../pages/IDEPage/Ide.style';

interface ChatProps {
  userName: string;
  projectId: number;
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

const Chat = ({ userName, projectId }: ChatProps) => {
  const [messages, setMessages] = useRecoilState<RecoilMessage[]>(messagesState);
  const [input, setInput] = useRecoilState<string>(inputState);
  const client = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subscribe = useCallback(() => {
    if (client.current) {
      client.current.subscribe(`/topic/projectId/${projectId}`, message => {
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
    }
  }, [projectId, setMessages]);

  useEffect(() => {
    const wsUrl = `${socketUrl}`;

    client.current = new Client({
      brokerURL: wsUrl,
      debug: str => console.log(str),
      reconnectDelay: 50000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        subscribe(); // 연결 성공 후 구독
      },
      onStompError: frame => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [projectId, subscribe]);
  const sendMessage = () => {
    if (client.current && client.current.connected && input) {
      const message = {
        sender: userName,
        content: input,
        projectId: projectId,
      };

      client.current.publish({
        destination: `/app/message`,
        body: JSON.stringify(message),
      });

      const sentAt = dayjs().toISOString();

      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: input,
          sender: userName,
          profile,
          createdAt: sentAt,
        },
      ]);
      setInput('');
    } else {
      console.error('STOMP connection is not established or input is empty.');
    }
  };

  return (
    <ChatContainer>
      <IdeChat_Top>
        <div>채팅</div>
      </IdeChat_Top>

      <ChatMessages>
        {messages.map((message, index) => (
          <ChatMessage key={index} isOwnMessage={message.sender === userName}>
            {message.sender !== userName && <ProfileImage src={message.profile} alt={`${message.sender}'s profile`} />}
            <MessageContent isOwnMessage={message.sender === userName}>
              {message.sender !== userName && <SenderName>{message.sender}</SenderName>}
              <MessageText isOwnMessage={message.sender === userName}>{message.text}</MessageText>
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
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  height: 100%;
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

const ChatMessage = styled.div<ChatMessageProps>`
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

const MessageContent = styled.div<ChatMessageProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isOwnMessage }) => (isOwnMessage ? 'flex-end' : 'flex-start')};
  position: relative;
`;

const MessageText = styled.div<ChatMessageProps>`
  background-color: ${({ isOwnMessage, theme }) => (isOwnMessage ? theme.colors.green1 : '#3a3d41')};
  color: ${({ isOwnMessage }) => (isOwnMessage ? '#000000' : '#ffffff')};
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  word-wrap: break-word;
  max-width: 250px;
  position: relative;
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
