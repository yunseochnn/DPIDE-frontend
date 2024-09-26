import { Link } from 'react-router-dom';
import {
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
import { useState } from 'react';

interface FormIF {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const SignUp = () => {
  const [pwState, setPwState] = useState(false);
  const [pwConfirmState, setPwConfirmState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormIF>();

  const onSubmitHandler = (data: FormIF) => {
    console.log(data);
  };

  const onPasswordHandler = () => {
    setPwState(!pwState);
  };

  const onPasswordConfirmHandler = () => {
    setPwConfirmState(!pwConfirmState);
  };
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
            <SignUp_button type="submit">회원가입</SignUp_button>
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
