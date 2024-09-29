import styled from 'styled-components';

export const IdeExplorer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2f3336;
  border-right: 1px solid black;
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
  z-index: 100;
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

  &:hover {
    background-color: gray;
  }

  & + & {
    border-top: 1px solid white;
  }
`;

export const IdeExplorer_Folders = styled.div`
  padding: 10px 0 0 5px;
  height: auto;
  width: 100%;
`;

export const InputBox = styled.input`
  border: 1px solid rgba(16, 16, 16);
  border-radius: 3px;
  height: 30px;
  margin: 10px 10px 0 10px;
  padding-left: 5px;
  color: white;
`;
