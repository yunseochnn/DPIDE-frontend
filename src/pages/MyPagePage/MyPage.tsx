import { Link, useNavigate } from 'react-router-dom';
import {
  MyPageContainer,
  MyPageContent,
  MyPageContent_Leave,
  MyPageContent_Nickname,
  MyPageContent_Nickname_Content,
  MyPageContent_Nickname_Input,
  MyPageContent_Nickname_Top,
  MyPageContent_Nickname_Top_button,
  MyPageContent_Nickname_Top_Title,
  MyPageContent_Password,
  MyPageContent_Password_Input,
  MyPageContent_Password_InputBox,
  MyPageContent_Password_Top,
  MyPageContent_Password_Top_Title,
  MyPageContent_UserImage,
  MyPageHeader,
  MyPageHeader_Logo,
  MyPageHeader_Logout,
  MyPageHeader_Title,
} from './MyPage.style';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useCookies } from 'react-cookie';
import LogoutRequest from '../../apis/Auth/Logout/LogoutRequest';
import RefreshToken from '../../apis/RefrshToken';
import LeaveRequest from '../../apis/Auth/Leave/LeaveRequest';
import { toast } from 'react-toastify';

const MyPage = () => {
  const [nickname, setNickname] = useState('하이루');
  const [password, setPassword] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setnewPwConfirm] = useState('');
  const [editNickname, setEditNickname] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId']);
  const onNicknameClickHandler = () => {
    setEditNickname(!editNickname);
  };

  const authorization = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];

  const LogoutResponse = async () => {
    const response = await LogoutRequest(authorization, refreshToken);

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
    } else if (status === 401) {
      console.log('유효하지 않는 토큰입니다.');

      try {
        await RefreshToken(authorization, setCookie);

        await LogoutRequest(authorization, refreshToken);
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('userId', { path: '/' });

        navigate('/');
      } catch (error) {
        console.log(error);
        alert('토큰 발급 에러');
      }
    } else if (status === 500) {
      alert('데이터베이스 오류입니다.');
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

  const LeaveResponse = async (authorization: string) => {
    try {
      const response = await LeaveRequest(authorization);

      if (!response) {
        alert('네트워크 오류입니다.');
        return;
      }

      const { status } = response;

      if (status === 200) {
        toast.success('탈퇴가 완료되었습니다.');
        removeCookie('Authorization', { path: '/' });
        removeCookie('Refresh-Token', { path: '/' });
        removeCookie('userId', { path: '/' });

        navigate('/');
      } else if (status === 401) {
        try {
          await RefreshToken(authorization, setCookie);

          await LeaveRequest(authorization);
          toast.success('탈퇴가 완료되었습니다.');
          removeCookie('Authorization', { path: '/' });
          removeCookie('Refresh-Token', { path: '/' });
          removeCookie('userId', { path: '/' });
          navigate('/');
        } catch (error) {
          console.log(error);
          alert('토큰 발급을 실패하였습니다.');
        }
      }
    } catch (error) {
      console.log(error);
      alert('회원 탈퇴를 실패하였습니다.');
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

        <MyPageContent_Nickname>
          <MyPageContent_Nickname_Top>
            <MyPageContent_Nickname_Top_Title>
              <span> 닉네임:</span>
              {editNickname ? (
                <MyPageContent_Nickname_Input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />
              ) : (
                <MyPageContent_Nickname_Content>{nickname}</MyPageContent_Nickname_Content>
              )}
            </MyPageContent_Nickname_Top_Title>
            <MyPageContent_Nickname_Top_button onClick={onNicknameClickHandler}>
              {editNickname ? '변경사항 저장' : '변경하기'}
            </MyPageContent_Nickname_Top_button>
          </MyPageContent_Nickname_Top>
        </MyPageContent_Nickname>

        <MyPageContent_Password>
          <MyPageContent_Password_Top>
            <MyPageContent_Password_Top_Title>비밀번호 변경</MyPageContent_Password_Top_Title>
            <MyPageContent_Nickname_Top_button>비밀번호 변경</MyPageContent_Nickname_Top_button>
          </MyPageContent_Password_Top>
          <MyPageContent_Password_InputBox>
            <MyPageContent_Password_Input
              placeholder="현재 비밀번호"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <MyPageContent_Password_Input
              placeholder="새 비밀번호"
              type="password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
            />
            <MyPageContent_Password_Input
              placeholder="새 비밀번호 확인"
              type="password"
              value={newPwConfirm}
              onChange={e => setnewPwConfirm(e.target.value)}
            />
          </MyPageContent_Password_InputBox>
        </MyPageContent_Password>
        <MyPageContent_Leave onClick={onClickLeaveHandler}>탈퇴하기</MyPageContent_Leave>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
