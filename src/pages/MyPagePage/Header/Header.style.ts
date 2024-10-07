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
export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  height: 78px;
  margin: 0 auto;
  padding-right: 10px;
  padding-left: 10px;
`;
export const Logo = styled.img`
  height: 32px;
  width: 32px;
`;

export const ServiceName = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #474747;
  margin-left: 8px;
  letter-spacing: 0.2em;
`;
export const Spacer = styled.div`
  flex-grow: 1;
`;
