import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface AlarmInfo {
  id: number;
  senderName: string;
  projectName: string;
  isRead: boolean;
}

interface Notification {
  id: number;
  profileImg: string;
  message: string;
  time: string;
}

interface NotificationListProps {
  token: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ token }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${baseURL}/alarm`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const alarmInfoList: AlarmInfo[] = response.data.alarmInfoList;

        const formattedNotifications = alarmInfoList.map((alarm: AlarmInfo) => ({
          id: alarm.id,
          profileImg: '',
          message: `${alarm.senderName}님이 ${alarm.projectName} 프로젝트에 초대했습니다.`,
          time: alarm.isRead ? '읽음' : '안 읽음',
        }));

        setNotifications(formattedNotifications);
      } catch (error) {
        setError('알림을 불러오지 못했습니다.');
        console.error(error);
      }
    };

    fetchNotifications();
  }, [token, baseURL]);

  const acceptInvitation = async (alarmId: number) => {
    try {
      await axios.post(
        `${baseURL}/alarm/${alarmId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('초대를 수락했습니다.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === 'USER_ALREADY_PARTICIPANT') {
          alert('이미 참여 중인 유저입니다.');
        } else {
          alert('초대 수락에 실패했습니다.');
        }
      } else {
        alert('예상치 못한 오류가 발생했습니다.');
      }
    }
  };

  const denyInvitation = async (alarmId: number) => {
    try {
      await axios.post(
        `${baseURL}/alarm/${alarmId}/deny`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('초대를 거절했습니다.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === 'INVALID_ALARM') {
          alert('존재하지 않는 알람 ID입니다.');
        } else {
          alert('초대 거절에 실패했습니다.');
        }
      } else {
        alert('예상치 못한 오류가 발생했습니다.');
      }
    }
  };
  return (
    <NotificationContainer>
      <NotificationHeader>알림</NotificationHeader>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {notifications.map(notification => (
        <NotificationItem key={notification.id}>
          <ProfileImage src={notification.profileImg} alt="Profile" />
          <NotificationText>
            <Message>{notification.message}</Message>
            <Time>{notification.time}</Time>
            <ButtonContainer>
              <ActionButton onClick={() => acceptInvitation(notification.id)}>수락</ActionButton>
              <ActionButton onClick={() => denyInvitation(notification.id)}>거절</ActionButton>
            </ButtonContainer>
          </NotificationText>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

export default NotificationList;

const NotificationContainer = styled.div`
  position: absolute;
  top: 79px;
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

const ErrorMessage = styled.div`
  color: red;
  margin: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
