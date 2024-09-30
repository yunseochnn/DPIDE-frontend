import { Link, useNavigate } from 'react-router-dom';
import {
  Content,
  Error,
  ErrorMessage,
  SignUp_button,
  SignUp_content,
  SignUp_form,
  SignUp_InputBox,
  SignUp_InputBoxs,
  SignUp_logo,
  SignUp_text,
  SignUpContainer,
  SignUpWrapper,
} from './SignUp.style';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SignUpRequest from '../../apis/Auth/SignUp/SignUpRequest';
import { SignUpErrorDto, SignUpResponseDto } from '../../apis/Auth/SignUp/SignUpResponse.dto';
import { useCookies } from 'react-cookie';

interface FormIF {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const SignUp = () => {
  const [pwState, setPwState] = useState(false);
  const [pwConfirmState, setPwConfirmState] = useState(false);
  const [error, setError] = useState(false);
  const [cookies] = useCookies(['Authorization', 'Refresh-Token', 'userId']);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormIF>();

  const SignUpResponse = (responseBody: SignUpResponseDto | SignUpErrorDto | null) => {
    console.log(responseBody);
    if (!responseBody) {
      alert('네트워크 이상입니다.');
      return;
    }
    const { status, message } = responseBody;
    if (status === 201) {
      //toast message로 회원가입 완료 메시지

      navigate('/login');
    }
    if (status === 400) {
      setError(true);
      setErrorMessage('회원가입 형식에 맞지 않습니다.');
    }
    if (status === 409) {
      if (message === 'Email already in use') {
        setError(true);
        setErrorMessage('중복되는 이메일입니다.');
      }
      if (message === 'Nickname already in use') {
        setError(true);
        setErrorMessage('중복되는 닉네임입니다.');
      }
    }
  };

  const onSubmitHandler = async (data: FormIF) => {
    SignUpRequest(data.email, data.password, data.nickname).then(SignUpResponse);
  };

  const onPasswordHandler = () => {
    setPwState(!pwState);
  };

  const onPasswordConfirmHandler = () => {
    setPwConfirmState(!pwConfirmState);
  };

  useEffect(() => {
    if (cookies['Authorization'] && cookies['Refresh-Token'] && cookies['userId']) {
      navigate('/main');
    }
  }, [cookies, navigate]);

  return (
    <SignUpContainer>
      <SignUpWrapper>
        <SignUp_logo>
          <img src="/src/assets/images/logo2.png" />
          <span>D P I D E</span>
        </SignUp_logo>

        <SignUp_form onSubmit={handleSubmit(onSubmitHandler)}>
          <SignUp_InputBoxs>
            <SignUp_InputBox>
              <input
                placeholder="이메일"
                type="text"
                {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
              />
            </SignUp_InputBox>
            {errors.email && errors.email?.type === 'required' && <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>}
            {errors.email && errors.email?.type === 'pattern' && (
              <ErrorMessage>올바른 이메일 주소를 입력해주세요.</ErrorMessage>
            )}

            <SignUp_InputBox>
              <input
                placeholder="비밀번호"
                type={pwState ? 'text' : 'password'}
                {...register('password', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })}
              />
              <img
                src={pwState ? '/src/assets/images/eye-light-on.png' : '/src/assets/images/eye-light-off.png'}
                onClick={onPasswordHandler}
              />
            </SignUp_InputBox>
            {errors.password && errors.password?.type === 'required' && (
              <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
            )}

            {errors.password && errors.password?.type === 'pattern' && (
              <ErrorMessage>비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.</ErrorMessage>
            )}

            <SignUp_InputBox>
              <input
                placeholder="비밀번호 확인"
                type={pwConfirmState ? 'text' : 'password'}
                {...register('passwordConfirm', {
                  required: true,
                })}
              />
              <img
                src={pwConfirmState ? '/src/assets/images/eye-light-on.png' : '/src/assets/images/eye-light-off.png'}
                onClick={onPasswordConfirmHandler}
              />
            </SignUp_InputBox>
            {errors.passwordConfirm && errors.passwordConfirm?.type === 'required' && (
              <ErrorMessage>비밀번호 확인을 입력해주세요.</ErrorMessage>
            )}
            {watch('passwordConfirm') && watch('password') !== watch('passwordConfirm') && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}

            <SignUp_InputBox>
              <input placeholder="닉네임" type="text" {...register('nickname', { required: true, minLength: 2 })} />
            </SignUp_InputBox>
            {errors.nickname && errors.nickname?.type === 'required' && (
              <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
            )}
            {errors.nickname && errors.nickname?.type === 'minLength' && (
              <ErrorMessage>닉네임은 2글자 이상이어야 합니다.</ErrorMessage>
            )}
          </SignUp_InputBoxs>

          <SignUp_content>
            <Content>
              {error && <Error>{errorMessage}</Error>}
              <SignUp_button type="submit">회원가입</SignUp_button>
            </Content>
            <SignUp_text>
              계정이 있으신가요? <Link to={'/login'}>로그인</Link>
            </SignUp_text>
          </SignUp_content>
        </SignUp_form>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
