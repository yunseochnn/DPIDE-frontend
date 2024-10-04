import styled from 'styled-components';

export const InviteContainer = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const InviteContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const InviteChat = styled.div`
  width: 30%;
  background-color: #2f3336;
  border-left: 1px solid black;

  @media screen and (max-width: 1280px) {
    flex: 350;
  }
`;
export const IdeChat_Top = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 23px;

  div {
    font-size: 16px;
    color: white;
    font-weight: 700;
  }
`;
