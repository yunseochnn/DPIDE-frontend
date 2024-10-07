import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PlusIcon = styled(FaPlus)`
  color: #fff;
  margin-top: 2px;
`;
export const NewProjectButton = styled.button`
  font-weight: 500;
  width: 160px;
  height: 55px;
  font-size: 20px;
  line-height: 1.8;
  background-color: ${({ theme }) => theme.colors.green1};
  align-self: flex-end;
  color: white;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  margin: 50px auto 0;

  @media (max-width: 1280px) {
    padding: 0 40px;
  }

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 10px;
`;

interface ProjectButtonProps {
  isSelected: boolean;
}

export const ProjectButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isSelected',
})<ProjectButtonProps>`
  font-size: 20px;
  font-weight: 400;
  background-color: #ffffff;
  color: #000000;
  padding: 15px 30px;
  border: 1px solid #e1e1e8;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  margin-right: 23px;
  box-shadow: ${({ isSelected }) => (isSelected ? '2px 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};

  &:hover {
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const EmptyStateIcon = styled.div`
  font-size: 50px;
  margin-bottom: 16px;
  color: #868899;
`;

export const EmptyStateText = styled.h2`
  font-size: 22px;
  font-weight: 300;
  color: #868899;
  margin-bottom: 12px;
`;
