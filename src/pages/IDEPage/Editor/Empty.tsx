import { CiFileOff } from 'react-icons/ci';
import styled from 'styled-components';

const Empty = () => {
  return (
    <EmptyContainer>
      <CiFileOff size={100} />
      <div>열려있는 파일이 없습니다.</div>
    </EmptyContainer>
  );
};

export default Empty;

const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #2f3336;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }

  div {
    margin-top: 30px;
    color: white;
  }
`;
