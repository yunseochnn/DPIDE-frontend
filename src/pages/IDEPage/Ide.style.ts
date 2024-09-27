import styled from 'styled-components';

export const IdeContainer = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const IdeCenter = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`;

export const Side = styled.div`
  width: 3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  border-right: 1px solid #000;
`;
export const File = styled.div`
  width: 18%;
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  flex-grow: 1;
  background-color: #2f3336;
  height: 100%;
  margin: 0;
`;

export const IdeChat = styled.div`
  width: 22%;
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
