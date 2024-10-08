import styled from 'styled-components';

export const StartContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StartWrapper_Top = styled.div`
  height: 93px;
  display: flex;
  align-items: center;
  width: 100wh;
  border-bottom: 3px solid #f4f4f4;
  padding-left: 105px;

  @media screen and (max-height: 900px) {
    height: 70px;
  }
`;

export const StartWrapper_Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
`;

export const Start = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

export const StartWrapper_Bottom_context = styled.div`
  margin-bottom: 20px;
`;

export const StartWrapper_Bottom_context_text1 = styled.div`
  font-size: 50px;
  font-weight: 800;
  line-height: 120%;
  white-space: pre-line;
`;

export const StartWrapper_Bottom_context_text2 = styled.div`
  font-size: 28px;
  margin-top: 30px;
`;

export const StartWrapper_Bottom_Buttons = styled.div`
  display: flex;
  justify-content: flex-start; /* 버튼을 가로로 정렬 */
  gap: 30px;
`;

export const StartWrapper_Login_Button = styled.button`
  border: none;
  background-color: #edf9fb;
  width: 226px;
  height: 61px;
  color: ${({ theme }) => theme.colors.green1};
  border-radius: 8px;
  font-size: 26px;
  cursor: pointer;

  @media screen and (max-height: 900px) {
    width: 220px;
    height: 55px;
  }
`;

export const StartWrapper_SignUp_Button = styled.button`
  border: none;
  background-color: #00bdc7;
  width: 226px;
  height: 61px;
  color: white;
  border-radius: 8px;
  font-size: 26px;

  @media screen and (max-height: 900px) {
    width: 220px;
    height: 55px;
    cursor: pointer;
  }
`;

export const StartWraper_Bottom_Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 700px;
    height: auto;
  }
`;
