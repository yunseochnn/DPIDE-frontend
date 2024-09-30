import { useEffect } from 'react';
import styled from 'styled-components';
import logo2 from '../../assets/images/logo2.png';
import profile from '../../assets/images/default-profile-image.png';
import { FaRegBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NotificationList from '../NotificationList';
import { useRecoilState } from 'recoil';
import { isNotifyOpenState, isProfileMenuOpenState } from '../../recoil/MainHeader/atoms';

const MainHeader = () => {
  const [isNotifyOpen, setNotifyOpen] = useRecoilState(isNotifyOpenState);
  const [isProfileMenuOpen, setProfileMenuOpen] = useRecoilState(isProfileMenuOpenState);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (isNotifyOpen && !target.closest('.notify-button') && !target.closest('.notify-list')) {
        setNotifyOpen(false);
      }

      if (isProfileMenuOpen && !target.closest('.profile-button') && !target.closest('.profile-dropdown')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNotifyOpen, isProfileMenuOpen, setNotifyOpen, setProfileMenuOpen]);

  const notifications = [
    {
      id: 1,
      profileImg: profile,
      message: '닉네임 1 님이 note-app에 초대했습니다',
      time: '2시간 전',
    },
    {
      id: 2,
      profileImg: profile,
      message: '닉네임 2 님이 note에 초대했습니다',
      time: '3시간 전',
    },
  ];

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo src={logo2} alt="Logo" />
        <ServiceName>DPIDE</ServiceName>
        <Spacer />
        <NotifyButton onClick={toggleNotify} className="notify-button">
          <NotifyIcon size={32} />
        </NotifyButton>
        <ProfileButton onClick={toggleProfileMenu} className="profile-button">
          <ProfileCircle>
            <img src={profile} alt="Profile" />
          </ProfileCircle>
        </ProfileButton>
      </HeaderWrapper>
      {isNotifyOpen && <NotificationList notifications={notifications} />}
      {isProfileMenuOpen && (
        <ProfileDropdown>
          <DropdownItem to="/mypage">마이페이지</DropdownItem>
          <DropdownItem to="/logout">로그아웃</DropdownItem>
        </ProfileDropdown>
      )}
    </HeaderContainer>
  );
};

export default MainHeader;

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
  right: 10px;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled(Link)`
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
