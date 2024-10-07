import { useCallback, useEffect, useState } from 'react';
import CreateProject from '../../components/Modal/CreateProject.tsx';
import MainHeader from '../../components/Header/MainHeader.tsx';
import Project from '../../components/Project.tsx';
import { CiFileOff } from 'react-icons/ci';
import {
  MainContainer,
  NewProjectButton,
  ContentWrapper,
  Sidebar,
  ProjectButton,
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateText,
  PlusIcon,
} from './Main.style.ts';
import axios from 'axios';
import { ProjectType } from '../../types';
import { useCookies } from 'react-cookie';
import RefreshToken from '../../apis/RefrshToken.ts';
import SuccessModal from '../../components/Modal/SuccessModal.tsx';

const Main = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<'myProjects' | 'sharedProjects'>('myProjects'); // 선택된 버튼 상태 관리
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  const [cookies, setCookie] = useCookies(['Authorization', 'Refresh-Token']);

  const token = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchProjects = useCallback(
    async (url: string) => {
      let isRetry = false;

      try {
        const response = await axios.get(`${baseURL}${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sortedProjects = response.data.projects.sort(
          (a: { createdAt: string; updatedAt: string }, b: { createdAt: string; updatedAt: string }) => {
            const aDate = new Date(a.updatedAt > a.createdAt ? a.updatedAt : a.createdAt);
            const bDate = new Date(b.updatedAt > b.createdAt ? b.updatedAt : b.createdAt);
            return bDate.getTime() - aDate.getTime();
          },
        );

        setProjects(sortedProjects);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 400 && !isRetry) {
            try {
              await RefreshToken(refreshToken, (name: string, value: string, options) =>
                setCookie(name as 'Authorization' | 'Refresh-Token', value, options),
              );
              isRetry = true;
              const retryResponse = await axios.get(`${baseURL}${url}`, {
                headers: { Authorization: `Bearer ${cookies['Authorization']}` },
              });
              setProjects(retryResponse.data.projects);
            } catch (retryError) {
              console.error('토큰 갱신 후 재요청 실패:', retryError);
            }
          } else {
            console.error('프로젝트 가져오기 오류:', error);
          }
        } else {
          console.error('알 수 없는 오류:', error);
        }
      }
    },
    [baseURL, cookies, refreshToken, setCookie, token],
  );

  const refreshProjects = useCallback(() => {
    const url = selectedButton === 'myProjects' ? `/projects` : `/projects/invited`;
    fetchProjects(url);
  }, [fetchProjects, selectedButton]);

  useEffect(() => {
    refreshProjects();
  }, [selectedButton, token, fetchProjects, refreshProjects]);

  const openModal = () => setModalOpen(true);

  const closeProjectModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openSuccessModal = useCallback((newProjectId: string) => {
    setProjectId(newProjectId);
    setSuccessModalOpen(true);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const handleButtonClick = (buttonType: 'myProjects' | 'sharedProjects') => {
    setSelectedButton(buttonType);
  };

  return (
    <>
      <MainHeader />
      <MainContainer>
        <ContentWrapper>
          <NewProjectButton onClick={openModal}>
            <PlusIcon /> 새 프로젝트
          </NewProjectButton>

          <Sidebar>
            <ProjectButton isSelected={selectedButton === 'myProjects'} onClick={() => handleButtonClick('myProjects')}>
              내 프로젝트
            </ProjectButton>
            <ProjectButton
              isSelected={selectedButton === 'sharedProjects'}
              onClick={() => handleButtonClick('sharedProjects')}
            >
              공유 받은 프로젝트
            </ProjectButton>
          </Sidebar>

          {projects && projects.length > 0 ? (
            <Project
              projects={projects}
              token={token}
              refreshProjects={refreshProjects}
              selectedButton={selectedButton}
            />
          ) : (
            <EmptyStateContainer>
              <EmptyStateIcon>
                <CiFileOff />
              </EmptyStateIcon>
              <EmptyStateText>프로젝트가 없습니다.</EmptyStateText>
            </EmptyStateContainer>
          )}
        </ContentWrapper>
      </MainContainer>

      {isModalOpen && (
        <CreateProject
          closeProjectModal={closeProjectModal}
          refreshProjects={refreshProjects}
          token={token}
          openSuccessModal={openSuccessModal}
        />
      )}

      {isSuccessModalOpen && projectId && (
        <SuccessModal closeModal={closeSuccessModal} projectId={projectId} language="Java" />
      )}
    </>
  );
};

export default Main;
