import React from 'react';
import styled from 'styled-components';

interface Notification {
  id: number;
  profileImg: string;
  message: string;
  time: string;
}

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <NotificationContainer>
      <NotificationHeader>알림</NotificationHeader>
      {notifications.map(notification => (
        <NotificationItem key={notification.id}>
          <ProfileImage src={notification.profileImg} alt="Profile" />
          <NotificationText>
            <Message>{notification.message}</Message>
            <Time>{notification.time}</Time>
          </NotificationText>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

export default NotificationList;

const NotificationContainer = styled.div`
  position: absolute;
  top: 85px;
  right: 10px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NotificationHeader = styled.h3`
  margin: 18px;
  font-size: 18px;
  color: #333;
  padding-bottom: 8px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e1e8;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const NotificationText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.span`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const Time = styled.span`
  font-size: 12px;
  color: #868899;
`;
