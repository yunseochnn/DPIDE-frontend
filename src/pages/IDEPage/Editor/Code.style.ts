import styled from 'styled-components';

export const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

export const CodeTop = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 0 18px;
  box-sizing: border-box;
`;

export const Files = styled.div``;
export const CodeButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 8px;
`;
export const CodeButton = styled.div`
  cursor: pointer;
`;

export const Edit = styled.div`
  background-color: rebeccapurple;
  height: 60%;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;
