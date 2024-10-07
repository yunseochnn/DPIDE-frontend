import Input from './InputBox/Input';
import {
  Button,
  ErrorMessage,
  LoginBox,
  LoginButton,
  LoginContainer,
  LoginContents,
  LoginForm,
  LoginInputs,
  LoginLogo,
  LogintContent,
  LoginWrapper,
} from './LoginPage.style';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginRequest from '../../apis/Auth/Login/LoginRequest';
import { useCookies } from 'react-cookie';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [cookies, setCookie] = useCookies(['Authorization', 'Refresh-Token', 'nickname', 'userId']);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const LoginResponse = (responseBody: AxiosResponse) => {
    const responseData = responseBody.data;
    if (!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const { status } = responseBody;
    const { nickname, id } = responseData;
    if (status === 200) {
      const authToken = responseBody.headers['authorization']?.replace('Bearer ', '').trim();
      const refreshToken = responseBody.headers['refresh-token'].trim();
      if (authToken) {
        setCookie('Authorization', authToken, { path: '/', secure: false, sameSite: 'strict' });
      }
      if (refreshToken) {
        setCookie('Refresh-Token', refreshToken, { path: '/', secure: false, sameSite: 'strict' });
      }
      if (id) {
        setCookie('userId', id, { path: '/', secure: false, sameSite: 'strict' });
      }
      if (nickname) {
        setCookie('nickname', nickname, { path: '/', secure: false, sameSite: 'strict' });
      }
      navigate('/main');
    }
    if (status === 401) {
      setError(true);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = async data => {
    await LoginRequest(data.email, data.password).then(LoginResponse);
  };

  useEffect(() => {
    if (cookies['Authorization'] && cookies['Refresh-Token'] && cookies['nickname'] && cookies['userId']) {
      navigate('/main');
    }
  }, [cookies, navigate]);

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginLogo>
          <img src="/src/assets/images/logo2.png" />
          <span>D P I D E</span>
        </LoginLogo>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginInputs>
            <Input placeholder="이메일" name="email" register={register} errors={errors.email} />
            <Input placeholder="비밀번호" name="password" register={register} errors={errors.password} />
          </LoginInputs>
          <LoginBox>
            <Button>
              {error && <ErrorMessage>이메일 주소와 비밀번호를 다시 확인해주세요.</ErrorMessage>}
              <LoginButton type="submit">로그인</LoginButton>
            </Button>
            <LoginContents>
              <LogintContent>
                {`아직 계정이 없나요?`}
                <Link to={'/sign-up'}>회원가입</Link>
              </LogintContent>
            </LoginContents>
          </LoginBox>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
