import { Link, useNavigate } from 'react-router-dom';
import {
  InputBox,
  MyPageContainer,
  MyPageContent,
  MyPageContent_Leave,
  MyPageContent_Nickname,
  MyPageContent_Nickname_Content,
  MyPageContent_Nickname_Input,
  MyPageContent_Nickname_Submit_button,
  MyPageContent_Nickname_Top,
  MyPageContent_Nickname_Top_button,
  MyPageContent_Nickname_Top_Title,
  MyPageContent_Submit_Nickname,
  MyPageContent_UserImage,
  MyPageHeader,
  MyPageHeader_Logo,
  MyPageHeader_Logout,
  MyPageHeader_Title,
  NicknameError,
} from './MyPage.style';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useCookies } from 'react-cookie';
import LogoutRequest from '../../apis/Auth/Logout/LogoutRequest';
import RefreshToken from '../../apis/RefrshToken';
import LeaveRequest from '../../apis/Auth/Leave/LeaveRequest';
import { toast } from 'react-toastify';
import NicknameRequest from '../../apis/Auth/Nickname/NicknameRequest';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Password from './PasswordConfirm/Password';

interface FormData {
  nic: string;
  nicknamePw: string;
}
const MyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId', 'nickname']);
  const authorization = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];
  const Nic = cookies['nickname'];
  const [editNickname, setEditNickname] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nic: Nic, // 기본 닉네임 값 설정
    },
  });

  const navigate = useNavigate();

  const onNicknameClickHandler = () => {
    setEditNickname(!editNickname);
  };

  //로그아웃
  const LogoutResponse = async () => {
    try {
      const response = await LogoutRequest(refreshToken, authorization);

      if (!response) {
        alert('네트워크 이상입니다.');
        return;
      }
      const { status } = response;
      if (status === 200) {
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('userId', { path: '/' });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          // 401 Unauthorized 에러 처리
          console.log('유효하지 않은 토큰입니다.');

          try {
            // 토큰을 새로 발급받는 로직
            await RefreshToken(refreshToken, setCookie);
            // 새로 발급받은 토큰을 사용해 다시 요청
            const result = await LogoutRequest(refreshToken, authorization);
            const { status } = result;
            if (status === 200) {
              removeCookie('Authorization', { path: '/' });
              removeCookie('Refresh-Token', { path: '/' });
              removeCookie('userId', { path: '/' });
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

  //회원탈퇴
  const LeaveResponse = async (authorization: string) => {
    try {
      const response = await LeaveRequest(authorization, refreshToken);

      if (!response) {
        alert('네트워크 오류입니다.');
        return;
      }

      const { status } = response;

      if (status === 200) {
        toast.success('탈퇴가 완료되었습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('userId', { path: '/' });

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
              removeCookie('userId', { path: '/' });
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

  //닉네임 변경
  const onSubmitNicknameHandler = async (data: FormData) => {
    const { nic } = data;
    try {
      const response = await NicknameRequest(nic, authorization);

      if (!response) {
        alert('네트워크 이상입니다.');
        return;
      }

      const { status } = response;

      if (status === 200) {
        setCookie('nickname', nic, { path: '/', secure: false, sameSite: 'strict' });
        setEditNickname(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status } = error.response;
          if (status === 400) {
            console.log('요청하신 데이터가 유효하지 않습니다.');
          } else if (status === 401) {
            setNicknameError('중복된 닉네임입니다.');
          } else if (status === 404) {
            console.log('사용자를 찾을 수 없습니다.');
          } else if (status === 500) {
            console.log('데이터 베이스 오류');
          }
        }
      }
    }
  };
  return (
    <MyPageContainer>
      <MyPageHeader>
        <MyPageHeader_Logo>
          <Link to={'/main'}>
            <img src="/src/assets/images/logo2.png" />
            <MyPageHeader_Title>D P I D E</MyPageHeader_Title>
          </Link>
        </MyPageHeader_Logo>
        <MyPageHeader_Logout onClick={onClickLogoutHandler}>로그아웃</MyPageHeader_Logout>
      </MyPageHeader>

      <MyPageContent>
        <MyPageContent_UserImage>
          <FaRegCircleUser />
        </MyPageContent_UserImage>
        {editNickname ? (
          <MyPageContent_Submit_Nickname onSubmit={handleSubmit(onSubmitNicknameHandler)}>
            <MyPageContent_Nickname_Top>
              <MyPageContent_Nickname_Top_Title>
                <span> 닉네임:</span>
                <InputBox>
                  <MyPageContent_Nickname_Input type="text" {...register('nic', { required: true, minLength: 2 })} />
                  {errors.nic && errors.nic?.type === 'required' && (
                    <NicknameError>닉네임을 입력해주세요.</NicknameError>
                  )}
                  {errors.nic && errors.nic?.type === 'minLength' && (
                    <NicknameError>닉네임은 2글자 이상이어야 합니다.</NicknameError>
                  )}
                </InputBox>
              </MyPageContent_Nickname_Top_Title>
              <MyPageContent_Nickname_Submit_button type="submit">변경사항 저장</MyPageContent_Nickname_Submit_button>
            </MyPageContent_Nickname_Top>
            {nicknameError !== '' && <NicknameError>{nicknameError}</NicknameError>}
          </MyPageContent_Submit_Nickname>
        ) : (
          <MyPageContent_Nickname>
            <MyPageContent_Nickname_Top>
              <MyPageContent_Nickname_Top_Title>
                <span> 닉네임:</span>

                <MyPageContent_Nickname_Content>{Nic}</MyPageContent_Nickname_Content>
              </MyPageContent_Nickname_Top_Title>
              <MyPageContent_Nickname_Top_button onClick={onNicknameClickHandler}>
                변경하기
              </MyPageContent_Nickname_Top_button>
            </MyPageContent_Nickname_Top>
          </MyPageContent_Nickname>
        )}
        <Password />
        <MyPageContent_Leave onClick={onClickLeaveHandler}>탈퇴하기</MyPageContent_Leave>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
