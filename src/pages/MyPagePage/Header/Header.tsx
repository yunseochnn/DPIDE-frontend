import { Link, useNavigate } from 'react-router-dom';
import {
  HeaderWrapper,
  Logo,
  MyPageHeader,
  MyPageHeader_Logo,
  MyPageHeader_Logout,
  ServiceName,
  Spacer,
} from './Header.style';
import { confirmAlert } from 'react-confirm-alert';
import LogoutRequest from '../../../apis/Auth/Logout/LogoutRequest';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import RefreshToken from '../../../apis/RefrshToken';
import logo2 from '../../../../public/images/logo2.png';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId', 'nickname']);
  const authorization = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];
  const navigate = useNavigate();

  const LogoutResponse = async () => {
    try {
      const response = await LogoutRequest(refreshToken, authorization);
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

            const result = await LogoutRequest(refreshToken, authorization);
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
    <>
      <MyPageHeader>
        <MyPageHeader_Logo>
          <Link to={'/main'}>
            <HeaderWrapper>
              <Logo src={logo2} alt="Logo" />
              <ServiceName>DPIDE</ServiceName>
              <Spacer />
            </HeaderWrapper>
          </Link>
        </MyPageHeader_Logo>
        <MyPageHeader_Logout onClick={onClickLogoutHandler}>로그아웃</MyPageHeader_Logout>
      </MyPageHeader>
    </>
  );
};

export default Header;
