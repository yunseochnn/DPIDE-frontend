import styled from 'styled-components';

export const MyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MyPageHeader = styled.div`
  width: 100%;
  height: 96px;
  border-bottom: 2px solid #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 105px;
`;

export const MyPageHeader_Logo = styled.div`
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
  }
  a {
    display: flex;
    gap: 8px;
  }
`;
export const MyPageHeader_Title = styled.div`
  color: #474747;
  font-size: 32px;
  font-weight: 800;
`;

export const MyPageHeader_Logout = styled.div`
  font-size: 18px;
  color: #aaaaaa;
  cursor: pointer;
`;
export const MyPageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

export const MyPageContent_UserImage = styled.div`
  svg {
    width: 120px;
    height: 120px;
  }
`;
export const MyPageContent_Nickname = styled.div`
  display: flex;
  flex-direction: column;
`;
export const MyPageContent_Nickname_Top = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;
export const MyPageContent_Nickname_Top_Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MyPageContent_Nickname_Top_button = styled.div`
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
export const MyPageContent_Nickname_Content = styled.span`
  margin-left: 5px;
  font-size: 20px;
  font-weight: 400;
`;
export const MyPageContent_Nickname_Input = styled.input`
  width: 130px;
  height: 34px;
  color: black;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  margin-left: 5px;
  font-size: 15px;
`;

export const MyPageContent_Password = styled.div`
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
export const MyPageContent_Leave = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  color: #aaaaaa;
  font-size: 16px;
  margin-top: 15px;
  cursor: pointer;
`;
