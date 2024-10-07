import { useEffect } from 'react';
import styled from 'styled-components';
import logo2 from '../../../public/images/logo2.png';
import { useRecoilState } from 'recoil';
import { isNotifyOpenState, isProfileMenuOpenState } from '../../recoil/MainHeader/atoms';

const StartHeader = () => {
  const [isNotifyOpen, setNotifyOpen] = useRecoilState(isNotifyOpenState);
  const [isProfileMenuOpen, setProfileMenuOpen] = useRecoilState(isProfileMenuOpenState);

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

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo src={logo2} alt="Logo" />
        <ServiceName>DPIDE</ServiceName>

        <Spacer />
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default StartHeader;

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
