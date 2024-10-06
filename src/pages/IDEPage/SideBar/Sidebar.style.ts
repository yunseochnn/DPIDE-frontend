import styled from 'styled-components';

export const IdeSideBarIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  gap: 30px;
`;
export const IdeSideBarIcon = styled.div`
  cursor: pointer;
  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
  &:hover {
    svg {
      color: gray;
    }
  }
`;
