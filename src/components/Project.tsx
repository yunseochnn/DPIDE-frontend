import styled from 'styled-components';
import { CiMenuBurger } from 'react-icons/ci';
import { MdEdit } from 'react-icons/md';
import { ProjectType } from '../types';

interface ProjectProps {
  projects: ProjectType[] | undefined;
}

const Project = ({ projects }: ProjectProps) => {
  if (!projects || projects.length === 0) {
    return <div>프로젝트가 없습니다.</div>;
  }

  return (
    <ProjectContainer>
      {projects.map((project: ProjectType) => (
        <ProjectBox key={project.id}>
          <MenuIcon onClick={() => console.log('Dropdown clicked')} />
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <EditButton onClick={() => console.log(`${project.name} 편집`)}>
            Edit <MdEdit />
          </EditButton>
        </ProjectBox>
      ))}
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
  width: 100%;
  max-width: 300px;
  height: auto;
  background-color: #ffffff;
  border: 1px solid #e1e1e8;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
  }
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
  width: 100%;
  max-width: 257px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.green2};
  color: #000000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
  gap: 8px;
`;
