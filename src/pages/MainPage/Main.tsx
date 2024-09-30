import { useCallback, useEffect, useState } from 'react';
import CreateProject from '../../components/Modal/CreateProject.tsx';
import MainHeader from '../../components/Header/MainHeader.tsx';
import { FaPlus } from 'react-icons/fa6';
import Project from '../../components/Project.tsx';
import { useRecoilState } from 'recoil';
import { isModalOpenState, selectedButtonState } from '../../recoil/Main/atoms.ts';
import { MainContainer, NewProjectButton, ContentWrapper, Sidebar, ProjectButton } from './Main.style.ts';
import axios from 'axios';
import { ProjectType } from '../../types';
import { useCookies } from 'react-cookie';
import RefreshToken from '../../apis/RefrshToken.ts';

const Main = () => {
  const [isModalOpen, setModalOpen] = useRecoilState(isModalOpenState);
  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);

  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [cookies, setCookie] = useCookies(['Authorization', 'Refresh-Token', 'userId']);

  const token = cookies['Authorization'];
  const refreshToken = cookies['Refresh-Token'];
  const userId = cookies['userId'];

  if (!userId) {
    console.error('userId가 쿠키에 없습니다.');
  }

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchProjects = useCallback(
    async (url: string) => {
      let isRetry = false;

      try {
        const response = await axios.get(`${baseURL}${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data.projects);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401 && !isRetry) {
            // 토큰 만료 에러
            try {
              // 토큰 재발급
              await RefreshToken(refreshToken, (name: string, value: string, options) =>
                setCookie(name as 'Authorization' | 'Refresh-Token' | 'userId', value, options),
              );
              isRetry = true;
              // 토큰 갱신 후 다시 요청
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

  useEffect(() => {
    if (selectedButton === 'myProjects' && userId) {
      fetchProjects(`/projects/${userId}`);
    } else if (selectedButton === 'sharedProjects' && userId) {
      fetchProjects(`/projects/${userId}/invited`);
    }
  }, [selectedButton, token, userId, fetchProjects]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtonClick = (buttonType: 'myProjects' | 'sharedProjects') => {
    setSelectedButton(buttonType);
  };

  return (
    <>
      <MainHeader />
      <MainContainer>
        <ContentWrapper>
          <NewProjectButton onClick={openModal}>
            <FaPlus /> 새 프로젝트
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

          {projects && projects.length > 0 ? <Project projects={projects} /> : <div>프로젝트가 없습니다.</div>}
        </ContentWrapper>
      </MainContainer>
      {isModalOpen && <CreateProject closeModal={closeModal} />}
    </>
  );
};

export default Main;
