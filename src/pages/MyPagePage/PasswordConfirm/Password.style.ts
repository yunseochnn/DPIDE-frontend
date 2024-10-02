import styled from 'styled-components';

export const MyPageContent_Password = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 50px;
`;
export const MyPageContent_Password_Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MyPageContent_Password_Top_Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
export const MyPageContent_Password_Top_button = styled.div`
  width: 87px;
  height: 34px;
  border-radius: 5px;
  background-color: #aaaaaa;
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const MyPageContent_Password_InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;
export const MyPageContent_Password_Input = styled.input`
  width: 300px;
  height: 50px;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  font-size: 16px;
  padding-left: 10px;

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 10px;
  color: red;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
