import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 340px;
`;

export const LoginLogo = styled.div`
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

export const LoginForm = styled.form``;

export const LoginInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 26px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-bottom: 3px;
`;

export const LoginButton = styled.button`
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

export const LoginContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LogintContent = styled.div`
  color: #868b94;
  margin-top: 12px;
  a {
    color: #2cc8de;
    margin-left: 5px;
    list-style: nones;
    text-decoration: none;
  }
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
`;
