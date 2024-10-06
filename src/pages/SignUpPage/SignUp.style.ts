import styled from 'styled-components';

export const SignUpContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignUp_logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 53px;
  img {
    width: 35 px;
  }
  span {
    font-size: 52px;
    font-weight: 800;
    color: #474747;
  }
`;

export const SignUp_form = styled.form``;

export const SignUp_InputBoxs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SignUp_InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 398px;
  height: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  padding: 20px 10px 20px 16px;
  box-sizing: border-box;

  input {
    flex: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    height: 19px;
    width: 398px;
    &::placeholder {
      color: #bdbdbd;
    }
  }

  img {
    width: 35px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  margin-top: -8px;
`;

export const SignUp_content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 26px;
`;

export const SignUp_button = styled.button`
  width: 398px;
  height: 61px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.green1};
  border: none;
  cursor: pointer;
`;

export const SignUp_text = styled.div`
  color: #868b94;
  margin-top: 12px;
  a {
    color: #2cc8de;
    margin-left: 5px;
    list-style: nones;
    text-decoration: none;
  }
`;

export const Error = styled.div`
  font-size: 12px;
  color: red;
  margin-bottom: 2px;
`;
