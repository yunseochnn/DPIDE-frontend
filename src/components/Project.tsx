import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { CiMenuBurger } from 'react-icons/ci';
import { MdEdit } from 'react-icons/md';
import { ProjectType } from '../types';
import { useNavigate } from 'react-router-dom';
import EditProjectModal from './Modal/EditProjectModal';

interface ProjectProps {
  projects: ProjectType[] | undefined;
  token: string;
  refreshProjects: () => void;
  selectedButton: string | null;
}

const Project = ({ projects, token, refreshProjects, selectedButton }: ProjectProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const toggleDropdown = (projectId: number) => {
    setActiveDropdown(activeDropdown === projectId ? null : projectId);
  };

  const openEditModal = (project: ProjectType) => {
    setSelectedProject(project);
    setModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = async (projectId: number) => {
    try {
      const response = await axios.delete(`${baseURL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refreshProjects();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage('프로젝트를 찾을 수 없습니다.');
      } else {
        setErrorMessage('프로젝트 삭제에 실패했습니다.');
      }
      console.error(error);
    } finally {
      setActiveDropdown(null);
    }
  };

  const handleLeaveProject = async (projectId: number) => {
    try {
      const response = await axios.post(
        `${baseURL}/projects/${projectId}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        refreshProjects();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setErrorMessage('프로젝트를 찾을 수 없습니다.');
      } else {
        setErrorMessage('프로젝트 나가기에 실패했습니다.');
      }
      console.error(error);
    } finally {
      setActiveDropdown(null);
    }
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  if (!projects || projects.length === 0) {
    return;
  }

  return (
    <ProjectContainer>
      {projects.map((project: ProjectType) => (
        <ProjectBox key={project.id}>
          <MenuIcon onClick={() => toggleDropdown(project.id)} />
          {activeDropdown === project.id && (
            <DropdownMenu ref={dropdownRef} $isMyProjects={selectedButton === 'myProjects'}>
              {selectedButton === 'myProjects' ? (
                <>
                  <DropdownItem onClick={() => openEditModal(project)}>수정</DropdownItem>
                  <DropdownItem onClick={() => handleDelete(project.id)}>삭제</DropdownItem>
                </>
              ) : (
                <DropdownItem onClick={() => handleLeaveProject(project.id)}>프로젝트 나가기</DropdownItem>
              )}
            </DropdownMenu>
          )}
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectLanguage>{project.language}</ProjectLanguage>
          <ProjectDescription>{project.description}</ProjectDescription>
          <EditButton
            onClick={() => {
              if (selectedButton === 'myProjects') {
                navigate(`/ide/${project.id}?extension=${project.language}`);
              } else {
                navigate(`/ide/invite/${project.id}?extension=${project.language}`);
              }
            }}
          >
            Edit <MdEdit />
          </EditButton>
        </ProjectBox>
      ))}

      {isModalOpen && selectedProject && (
        <EditProjectModal
          projectId={selectedProject.id}
          currentName={selectedProject.name}
          currentDescription={selectedProject.description}
          token={token}
          onClose={closeEditModal}
          refreshProjects={refreshProjects}
        />
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </ProjectContainer>
  );
};

export default Project;

const ProjectLanguage = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  font-weight: bold;
  color: #868899;
  margin-bottom: 10px;
`;

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
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 800;
  color: #333;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #868899;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
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
  margin-top: 73px;
  gap: 8px;
`;

const DropdownMenu = styled.div<{ $isMyProjects: boolean }>`
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: ${({ $isMyProjects }) => ($isMyProjects ? '60px' : '140px')};
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
