import profile from '../assets/images/default-profile-image.png';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IdeChat_Top } from '../pages/IDEPage/Ide.style';
import { useRecoilState } from 'recoil';
import { messagesState, inputState } from '../recoil/Chat/atoms';

interface ChatMessageProps {
  isOwnMessage: boolean;
}

const currentUser = 'User1';

const Chat = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [input, setInput] = useRecoilState(inputState);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (input) {
      setMessages([...messages, { text: input, sender: currentUser, profile: profile }]);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <IdeChat_Top>
        <div>채팅</div>
      </IdeChat_Top>
      <ChatMessages>
        {messages.map((message, index) => (
          <ChatMessage key={index} isOwnMessage={message.sender === currentUser}>
            {message.sender !== currentUser && (
              <ProfileImage src={message.profile} alt={`${message.sender}'s profile`} />
            )}
            <MessageContent isOwnMessage={message.sender === currentUser}>
              {message.sender !== currentUser && <SenderName>{message.sender}</SenderName>}
              <MessageText isOwnMessage={message.sender === currentUser}>{message.text}</MessageText>
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

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const MessageContent = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isOwnMessage',
})<ChatMessageProps>`
  display: flex;
  flex-direction: column;
  ${({ isOwnMessage }) =>
    isOwnMessage
      ? `
    align-items: flex-end;
  `
      : `
    align-items: flex-start;
  `}
`;

const SenderName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  margin-bottom: 5px;
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
