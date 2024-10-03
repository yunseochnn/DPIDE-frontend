import axios from 'axios';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import SuccessModal from './SuccessModal.tsx';
import { isSuccessModalOpenState } from '../../recoil/Main/atoms.ts';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  closeModal: () => void;
  refreshProjects: () => void;
  token: string;
  userId: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

const CreateProject: React.FC<ModalProps> = ({ closeModal, refreshProjects, token, userId }) => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useRecoilState(isSuccessModalOpenState);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [language, setLanguage] = useState('Java');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    if (!projectName || !language) {
      setErrorMessage('프로젝트 이름과 언어는 필수입니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/projects`,
        {
          name: projectName,
          description: projectDescription,
          language: language,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        const { id, createdAt, updatedAt } = response.data;
        setSuccessModalOpen(true);
        refreshProjects();
        closeModal();
        console.log(`프로젝트 생성됨: ID: ${id}, 생성일: ${createdAt}, 수정일: ${updatedAt}`);
        navigate(`/ide/${id}?extension=${language}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        if (error.response?.status === 400) {
          setErrorMessage('프로젝트 이름은 필수입니다.');
        } else if (error.response?.status === 401 || error.response?.status === 403) {
          setErrorMessage('인증 오류: 토큰이 유효하지 않거나 권한이 없습니다.');
        } else {
          setErrorMessage('프로젝트 생성에 실패했습니다.');
        }
      } else {
        console.error('서버 오류:', error);
        setErrorMessage('서버 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <CloseIcon onClick={closeModal} />
          <Title>프로젝트 생성하기</Title>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <ContentWrapper>
            <Label>프로젝트 이름</Label>
            <Input
              type="text"
              placeholder="프로젝트 이름"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            />
            <Label>언어 선택</Label>
            <SelectWrapper>
              <Select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </Select>
              <ArrowIcon />
            </SelectWrapper>
            <Label>프로젝트 설명(선택)</Label>
            <TextArea
              placeholder="프로젝트 설명을 작성해주세요"
              value={projectDescription}
              onChange={e => setProjectDescription(e.target.value)}
            />
            <CreateButton onClick={handleCreateProject}>생성하기</CreateButton>
          </ContentWrapper>
        </ModalContent>
      </ModalOverlay>
      {isSuccessModalOpen && <SuccessModal closeModal={() => setSuccessModalOpen(false)} />}
    </>
  );
};

export default CreateProject;

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 35px;
  border-radius: 10px;
  width: 546px;
  max-width: 80%;
`;

const CloseIcon = styled(IoMdClose)`
  position: absolute;
  top: 19px;
  right: 19px;
  font-size: 30px;
  cursor: pointer;
  color: #868899;
`;

const Title = styled.h2`
  margin-top: 25px;
  text-align: center;
  font-size: 28px;
  color: #000000;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  color: #000000;
  margin-top: 40px;
  margin-bottom: 13px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #e1e1e8;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #e1e1e8;
  width: 100%;
  box-sizing: border-box;
  appearance: none;
`;

const TextArea = styled.textarea`
  padding: 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #d7d2d2;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  height: 200px;
`;

const CreateButton = styled.button`
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.green1};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 25px;
`;
const SelectWrapper = styled.div`
  position: relative;
`;
const ArrowIcon = styled(IoIosArrowDown)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
