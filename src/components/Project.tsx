import styled from 'styled-components';
import { CiMenuBurger } from 'react-icons/ci';
import { MdEdit } from 'react-icons/md';

const Project = () => {
  return (
    <ProjectContainer>
      <ProjectBox>
        <MenuIcon />
        <ProjectTitle>Note-app</ProjectTitle>
        <ProjectDescription>이것은 프로젝트 설명입니다.</ProjectDescription>
        <EditButton>
          Edit
          <MdEdit />
        </EditButton>
      </ProjectBox>
    </ProjectContainer>
  );
};

export default Project;

const ProjectContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 28px;
`;

const ProjectBox = styled.div`
  position: relative;
  width: 300px;
  height: 230px;
  background-color: #ffffff;
  border: 1px solid #e1e1e8;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const MenuIcon = styled(CiMenuBurger)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: #333;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 13px;
  font-size: 20px;
  font-weight: 800;
  color: #333;
`;

const ProjectDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #868899;
  flex-grow: 1;
`;

const EditButton = styled.button`
  width: 257px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.green2};
  color: #000000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
