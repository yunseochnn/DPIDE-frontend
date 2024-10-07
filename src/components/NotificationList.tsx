import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface AlarmInfo {
  id: number;
  senderName: string;
  projectName: string;
  read: boolean;
}

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

interface NotificationListProps {
  token: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ token }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchNotifications = useCallback(async () => {
    console.log('fetchNotifications 호출됨');
    try {
      const response = await axios.get(`${baseURL}/alarm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const alarmInfoList = response.data.alarmInfoList.map((alarm: AlarmInfo) => ({
        id: alarm.id,
        message: `${alarm.senderName}님이 ${alarm.projectName} 프로젝트에 초대했습니다.`,
        isRead: alarm.read,
      }));

      setNotifications(alarmInfoList.reverse());
    } catch (error) {
      setError('알림을 불러오지 못했습니다.');
      console.error(error);
    }
  }, [token, baseURL]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    console.log('최종 알림 상태:', notifications);
  }, [notifications]);

  const acceptInvitation = async (alarmId: number) => {
    try {
      await axios.put(
        `${baseURL}/alarm/${alarmId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchNotifications();
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
      await axios.put(
        `${baseURL}/alarm/${alarmId}/deny`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('초대를 거절했습니다.');
      fetchNotifications();
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
      {notifications.map(notification => {
        console.log('렌더링 중 알림 데이터:', notification);
        return (
          <NotificationItem key={notification.id} $isRead={notification.isRead}>
            <NotificationText>
              <Message>{notification.message}</Message>
              <ReadStatus>{notification.isRead ? '읽음' : '안 읽음'}</ReadStatus>
              {!notification.isRead && (
                <ButtonContainer>
                  <AcceptButton onClick={() => acceptInvitation(notification.id)}>수락</AcceptButton>
                  <DenyButton onClick={() => denyInvitation(notification.id)}>거절</DenyButton>
                </ButtonContainer>
              )}
            </NotificationText>
          </NotificationItem>
        );
      })}
    </NotificationContainer>
  );
};

export default NotificationList;

const AcceptButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  color: #000000;
  background-color: #dcdcdc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #bdbdbd;
  }
`;

const DenyButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  color: #000000;
  background-color: #dcdcdc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #bdbdbd;
  }
`;

const NotificationContainer = styled.div`
  position: absolute;
  top: 79px;
  right: 190px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const NotificationHeader = styled.h3`
  margin: 18px;
  font-weight: 500;
  font-size: 18px;
  color: #333;
`;

const NotificationItem = styled.div<{ $isRead: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e1e8;
  background-color: ${({ $isRead }) => ($isRead ? '#f9f9f9' : '#ffffff')};

  &:last-child {
    border-bottom: none;
  }
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
  max-width: 270px;
  display: inline-block;
`;

const ReadStatus = styled.span`
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
