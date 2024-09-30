import { useNavigate } from 'react-router-dom';
import {
  Start,
  StartContainer,
  StartWraper_Bottom_Image,
  StartWrapper_Bottom,
  StartWrapper_Bottom_Buttons,
  StartWrapper_Bottom_context,
  StartWrapper_Bottom_context_text1,
  StartWrapper_Bottom_context_text2,
  StartWrapper_Login_Button,
  StartWrapper_SignUp_Button,
} from './StartPage.style';
import StartHeader from '../../components/Header/StartHeader';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const StartPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['Authorization', 'Refresh-Token', 'userId']);

  useEffect(() => {
    if (cookies['Authorization'] && cookies['Refresh-Token'] && cookies['userId']) {
      navigate('/main');
    }
  }, [cookies, navigate]);

  return (
    <StartContainer>
      <StartHeader />
      <StartWrapper_Bottom>
        <Start>
          <StartWrapper_Bottom_context>
            <StartWrapper_Bottom_context_text1>{`언제 어디서나 개발 가능한 \n DPIDE`}</StartWrapper_Bottom_context_text1>
            <StartWrapper_Bottom_context_text2>{`브라우저만 열어 바로 시작하세요!`}</StartWrapper_Bottom_context_text2>
          </StartWrapper_Bottom_context>
          <StartWrapper_Bottom_Buttons>
            <StartWrapper_SignUp_Button onClick={() => navigate('/sign-up')}>회원가입</StartWrapper_SignUp_Button>
            <StartWrapper_Login_Button onClick={() => navigate('/login')}>로그인</StartWrapper_Login_Button>
          </StartWrapper_Bottom_Buttons>
        </Start>
        <StartWraper_Bottom_Image>
          <img src="/src/assets/images/startPage.png" />
        </StartWraper_Bottom_Image>
      </StartWrapper_Bottom>
    </StartContainer>
  );
};

export default StartPage;
