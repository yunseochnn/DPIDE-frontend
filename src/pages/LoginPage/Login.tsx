import Input from './InputBox/Input';
import {
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
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  // const [error, setError] = useState(true);

  const onSubmit: SubmitHandler<FormInput> = data => {
    console.log('Email: ', data.email);
    console.log('Passwor: ', data.password);
  };

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
            {/* {error && <ErrorMessage>이메일 주소와 비밀번호를 다시 확인해주세요.</ErrorMessage>} */}
            <LoginButton type="submit">로그인</LoginButton>
            <LoginContents>
              <LogintContent>
                {`아직 계정이 없나요?`}
                <Link to={'/sign-up'}>회원가입</Link>
              </LogintContent>
              <LogintContent>비밀번호 재설정</LogintContent>
            </LoginContents>
          </LoginBox>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
