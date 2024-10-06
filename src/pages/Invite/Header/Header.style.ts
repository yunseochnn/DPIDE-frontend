import styled from 'styled-components';

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
