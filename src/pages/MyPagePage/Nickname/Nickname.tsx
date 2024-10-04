import { useForm } from 'react-hook-form';
import {
  InputBox,
  MyPageContent_Nickname,
  MyPageContent_Nickname_Content,
  MyPageContent_Nickname_Input,
  MyPageContent_Nickname_Submit_button,
  MyPageContent_Nickname_Top,
  MyPageContent_Nickname_Top_button,
  MyPageContent_Nickname_Top_Title,
  MyPageContent_Submit_Nickname,
  NicknameError,
} from './Nickname.style';
import { useState } from 'react';
import NicknameRequest from '../../../apis/Auth/Nickname/NicknameRequest';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface FormData {
  nic: string;
  nicknamePw: string;
}
const Nickname = () => {
  const [cookies, setCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId', 'nickname']);
  const authorization = cookies['Authorization'];
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

  const onNicknameClickHandler = () => {
    setEditNickname(!editNickname);
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
    <>
      {editNickname ? (
        <MyPageContent_Submit_Nickname onSubmit={handleSubmit(onSubmitNicknameHandler)}>
          <MyPageContent_Nickname_Top>
            <MyPageContent_Nickname_Top_Title>
              <span> 닉네임:</span>
              <InputBox>
                <MyPageContent_Nickname_Input type="text" {...register('nic', { required: true, minLength: 2 })} />
                {errors.nic && errors.nic?.type === 'required' && <NicknameError>닉네임을 입력해주세요.</NicknameError>}
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
    </>
  );
};

export default Nickname;
