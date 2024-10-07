import { useRef } from 'react';
import styled from 'styled-components';
import logo2 from '../../assets/images/logo2.png';
import profile from '../../assets/images/default-profile-image.png';
import { FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NotificationList from '../NotificationList';
import { useRecoilState } from 'recoil';
import { isNotifyOpenState, isProfileMenuOpenState } from '../../recoil/MainHeader/atoms';
import { useCookies } from 'react-cookie';
import LogoutRequest from '../../apis/Auth/Logout/LogoutRequest';
import axios from 'axios';
import RefreshToken from '../../apis/RefrshToken';
import { confirmAlert } from 'react-confirm-alert';

const MainHeader = () => {
  const [isNotifyOpen, setNotifyOpen] = useRecoilState(isNotifyOpenState);
  const [isProfileMenuOpen, setProfileMenuOpen] = useRecoilState(isProfileMenuOpenState);
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh-Token', 'nickname', 'userId']);
  const Authorization = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];
  const navigate = useNavigate();

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleNotify = () => {
    setNotifyOpen((prev: boolean) => {
      if (!prev) {
        setTimeout(() => setProfileMenuOpen(false), 0);
      }
      return !prev;
    });
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev: boolean) => {
      if (!prev) {
        setTimeout(() => setNotifyOpen(false), 0);
      }
      return !prev;
    });
  };

  const LogoutResponse = async () => {
    try {
      const response = await LogoutRequest(refreshToken, Authorization);
      const { status } = response;
      if (status === 200) {
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('nickname', { path: '/' });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          console.log('유효하지 않은 토큰입니다.');

          try {
            await RefreshToken(refreshToken, setCookie);

            const result = await LogoutRequest(refreshToken, Authorization);
            const { status } = result;
            if (status === 200) {
              removeCookie('Authorization', { path: '/' });
              removeCookie('Refresh-Token', { path: '/' });
              removeCookie('nickname', { path: '/' });

              navigate('/');
            }
          } catch (refreshError) {
            console.log('토큰 발급 실패:', refreshError);
            alert('새로운 토큰을 발급받지 못했습니다.');
          }
        }
        if (error.response && error.response.status === 500) {
          console.log('데이터베이스 오류입니다.');
        }
        alert('로그아웃을 실패하였습니다.');
      }
    }
  };

  const onClickLogoutHandler = () => {
    confirmAlert({
      message: '로그아웃을 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => LogoutResponse(),
        },
        {
          label: '아니오',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo src={logo2} alt="Logo" />
        <ServiceName>DPIDE</ServiceName>
        <Spacer />
        <NotifyButton onClick={toggleNotify} className="notify-button">
          <NotifyIcon size={28} />
        </NotifyButton>
        <ProfileButton onClick={toggleProfileMenu} className="profile-button">
          <ProfileCircle>
            <img src={profile} alt="Profile" />
          </ProfileCircle>
        </ProfileButton>
      </HeaderWrapper>

      {isNotifyOpen && (
        <NotificationListWrapper ref={notificationRef} className="notify-list">
          <NotificationList token={Authorization} />
        </NotificationListWrapper>
      )}

      {isProfileMenuOpen && (
        <ProfileDropdown ref={profileMenuRef}>
          <DropdownItem onClick={() => navigate('/mypage')}>마이페이지</DropdownItem>
          <DropdownItem onClick={onClickLogoutHandler}>로그아웃</DropdownItem>
        </ProfileDropdown>
      )}
    </HeaderContainer>
  );
};

export default MainHeader;

const NotificationListWrapper = styled.div``;
const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid #f4f4f4;
  position: relative;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  height: 78px;
  margin: 0 auto;
  padding-right: 10px;
  padding-left: 10px;
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
`;

const ServiceName = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #474747;
  margin-left: 8px;
  letter-spacing: 0.1em;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const NotifyButton = styled.button`
  margin-right: 40px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotifyIcon = styled(FaRegBell)`
  color: #474747;
`;

const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;

const ProfileCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 79px;
  right: 55px;
  width: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  &:hover {
    background-color: #f4f4f4;
  }
  & + & {
    border-top: 1px solid #f4f4f4;
  }
`;
