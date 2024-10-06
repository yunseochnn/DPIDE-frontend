import { useNavigate } from 'react-router-dom';
import { MyPageContainer, MyPageContent, MyPageContent_Leave, MyPageContent_UserImage } from './MyPage.style';
import { FaRegCircleUser } from 'react-icons/fa6';
import { confirmAlert } from 'react-confirm-alert';
import { useCookies } from 'react-cookie';
import RefreshToken from '../../apis/RefrshToken';
import LeaveRequest from '../../apis/Auth/Leave/LeaveRequest';
import { toast } from 'react-toastify';
import axios from 'axios';
import Password from './PasswordConfirm/Password';
import Nickname from './Nickname/Nickname';
import Header from './Header/Header';

const MyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId', 'nickname']);
  const authorization = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];

  const navigate = useNavigate();

  //회원탈퇴
  const LeaveResponse = async (authorization: string) => {
    try {
      const response = await LeaveRequest(authorization, refreshToken);

      const { status } = response;

      if (status === 200) {
        toast.success('탈퇴가 완료되었습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('nickname', { path: '/' });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          // 401 Unauthorized 에러 처리
          console.log('유효하지 않은 토큰입니다.');

          try {
            // 토큰을 새로 발급받는 로직
            await RefreshToken(refreshToken, setCookie);
            // 새로 발급받은 토큰을 사용해 다시 요청
            const result = await LeaveRequest(authorization, refreshToken);
            const { status } = result;
            if (status === 200) {
              toast.success('탈퇴가 완료되었습니다.', {
                autoClose: 2000,
                pauseOnHover: false,
              });
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
        alert('회원 탈퇴를 실패하였습니다.');
      }
    }
  };

  const onClickLeaveHandler = () => {
    confirmAlert({
      message: '정말 회원을 탈퇴하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            LeaveResponse(authorization);
          },
        },
        {
          label: '아니오',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <MyPageContainer>
      <Header />
      <MyPageContent>
        <MyPageContent_UserImage>
          <FaRegCircleUser />
        </MyPageContent_UserImage>
        <Nickname />
        <Password />
        <MyPageContent_Leave onClick={onClickLeaveHandler}>탈퇴하기</MyPageContent_Leave>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
