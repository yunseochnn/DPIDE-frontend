import styled from 'styled-components';

export const FileListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid black;
  max-width: 150px;
  flex: 1;
  padding: 0 2px;
  cursor: pointer;
`;

export const FileIcon = styled.div`
  svg {
    color: white;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 3px;
`;

export const FileName = styled.div`
  color: white;
`;

export const FileClose = styled.div`
  color: white;
`;
