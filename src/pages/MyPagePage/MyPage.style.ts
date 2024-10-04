import styled from 'styled-components';

export const MyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

export const MyPageContent_Leave = styled.div`
  width: 300px;
  display: flex;
  justify-content: flex-end;
  color: #aaaaaa;
  font-size: 16px;
  margin-top: 15px;
  cursor: pointer;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
