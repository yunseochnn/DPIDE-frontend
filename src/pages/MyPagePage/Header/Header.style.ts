import styled from 'styled-components';

export const MyPageHeader = styled.div`
  width: 100%;
  height: 96px;
  border-bottom: 2px solid #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 105px;
`;

export const MyPageHeader_Logo = styled.div`
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
  }
  a {
    display: flex;
    gap: 8px;
  }
`;
export const MyPageHeader_Title = styled.div`
  color: #474747;
  font-size: 32px;
  font-weight: 800;
`;

export const MyPageHeader_Logout = styled.div`
  font-size: 18px;
  color: #aaaaaa;
  cursor: pointer;
`;
