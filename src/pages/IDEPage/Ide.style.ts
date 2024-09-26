import styled from 'styled-components';

export const IdeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const IdeTop = styled.div`
  width: 100%;
  height: 45px;
  background-color: #2f3336;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000000;
`;

export const IdeTop_Logo = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 32px;
  }

  span {
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
    margin-left: 8px;
  }
`;
export const IdeTop_Close = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;

export const IdeCenter = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 45px);
`;

export const IdeSideBar = styled.div`
  width: 45px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  border-right: 1px solid #000;

  @media screen and (max-width: 1280px) {
    flex: 45;
  }
`;
export const IdeSideBarIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 30px;
`;
export const IdeSideBarIcon = styled.div`
  cursor: pointer;
`;

export const IdeExplorer = styled.div`
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  border-right: 1px solid black;

  @media screen and (max-width: 1280px) {
    flex: 220;
  }
`;

export const IdeExplorer_Top = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 0 18px;
`;

export const IdeExplorer_ProjectName = styled.div`
  font-size: 16px;
  color: white;
  font-weight: 700;
`;
export const IdeExplorer_Plus = styled.div`
  position: relative;
`;
export const IdeExplorer_PlusModal = styled.div`
  position: absolute;
  z-index: 2;
  width: 100px;
  height: 50px;
  /* background-color: #2f3336; */
  background-color: #222426;
  border-radius: 3px;
  border: 1px solid white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const IdeExplorer_PlusModal_content = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  flex: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & + & {
    border-top: 1px solid white;
  }
`;

export const IdeExplorer_Folders = styled.div``;

export const IdeCode = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #2f3336;

  @media screen and (max-width: 1280px) {
    flex: 800;
  }
`;
export const IdeCode_Top = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid black;

  display: flex;
  justify-content: space-between;
`;
export const IdeCode_Files = styled.div``;
export const IdeCode_Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 8px;
`;
export const IdeCode_Button = styled.div``;

export const IdeChat = styled.div`
  width: 355px;
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
