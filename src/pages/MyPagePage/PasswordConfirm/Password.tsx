import {
  ErrorMessage,
  InputBox,
  MyPageContent_Password,
  MyPageContent_Password_Input,
  MyPageContent_Password_InputBox,
  MyPageContent_Password_Top,
  MyPageContent_Password_Top_button,
  MyPageContent_Password_Top_Title,
} from './Password.style';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import PasswordRequest from '../../../apis/Auth/Password/PasswordRequest';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

interface FormData {
  password: string;
  newPw: string;
  newPwConfirm: string;
}

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();
  const [cookies] = useCookies(['Authorization', 'Refresh-Token', 'userId', 'nickname']);
  const Authorization = cookies['Authorization'];
  const [error, setError] = useState('');

  const onSubmit = async (data: FormData) => {
    const { password, newPw } = data;
    try {
      const response = await PasswordRequest(password, newPw, Authorization);

      if (!response) {
        alert('네트워크 이상입니다.');
        return;
      }
      const { status } = response;
      if (status === 200) {
        setError('');
        toast.success('비밀번호변경이 완료되었습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
        reset();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            setError(data.message);
          }
        }
      }
    }
  };
  return (
    <MyPageContent_Password onSubmit={handleSubmit(onSubmit)}>
      <MyPageContent_Password_Top>
        <MyPageContent_Password_Top_Title>비밀번호 변경</MyPageContent_Password_Top_Title>
        <MyPageContent_Password_Top_button type="submit">비밀번호 변경</MyPageContent_Password_Top_button>
      </MyPageContent_Password_Top>
      <MyPageContent_Password_InputBox>
        <InputBox>
          <MyPageContent_Password_Input
            placeholder="현재 비밀번호"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && errors.password?.type === 'required' && (
            <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
          )}
          {errors.password && errors.password?.type === 'pattern' && (
            <ErrorMessage>비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.</ErrorMessage>
          )}
        </InputBox>

        <InputBox>
          <MyPageContent_Password_Input
            placeholder="새 비밀번호"
            type="password"
            {...register('newPw', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })}
          />
          {errors.newPw && errors.newPw?.type === 'required' && <ErrorMessage>새비밀번호를 입력해주세요.</ErrorMessage>}
          {errors.newPw && errors.newPw?.type === 'pattern' && (
            <ErrorMessage>비밀번호는 최소 8자 이상이며, 문자와 숫자를 포함해야 합니다.</ErrorMessage>
          )}
        </InputBox>

        <InputBox>
          <MyPageContent_Password_Input
            placeholder="새 비밀번호 확인"
            type="password"
            {...register('newPwConfirm', { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })}
          />
          {errors.newPwConfirm && errors.newPwConfirm?.type === 'required' && (
            <ErrorMessage>새비밀번호 확인을 입력해주세요.</ErrorMessage>
          )}
          {watch('newPwConfirm') && watch('newPw') !== watch('newPwConfirm') && (
            <ErrorMessage>새비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
          {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
        </InputBox>
      </MyPageContent_Password_InputBox>
    </MyPageContent_Password>
  );
};

export default Password;
