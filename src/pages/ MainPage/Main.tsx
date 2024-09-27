import CreateProject from '../../components/Modal/CreateProject';
import MainHeader from '../../components/Header/MainHeader';
import { FaPlus } from 'react-icons/fa6';
import Project from '../../components/Project';
import { useRecoilState } from 'recoil';
import { isModalOpenState, selectedButtonState } from '../../recoil/Main/atoms.ts';
import { MainContainer, NewProjectButton, ContentWrapper, Sidebar, ProjectButton } from './Main.style';
const Main = () => {
  const [isModalOpen, setModalOpen] = useRecoilState(isModalOpenState);
  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtonClick = (buttonType: 'myProjects' | 'sharedProjects') => {
    setSelectedButton(buttonType);
  };

  return (
    <div>
      <MainHeader />
      <MainContainer>
        <ContentWrapper>
          <NewProjectButton onClick={openModal}>
            <FaPlus />새 프로젝트
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
          <Project />
        </ContentWrapper>
      </MainContainer>
      {isModalOpen && <CreateProject closeModal={closeModal} />}
    </div>
  );
};

export default Main;
