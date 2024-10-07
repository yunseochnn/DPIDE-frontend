import { useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useClickOutside from '../../hooks/useClickOutside';

interface EditProjectModalProps {
  projectId: number;
  currentName: string;
  currentDescription: string;
  token: string;
  onClose: () => void;
  refreshProjects: () => void;
}

const EditProjectModal = ({
  projectId,
  currentName,
  currentDescription,
  token,
  onClose,
  refreshProjects,
}: EditProjectModalProps) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose); // 드롭다운 외부 클릭 감지 훅 사용

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/projects/${projectId}`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } },
      );
      if (response.status === 200) {
        refreshProjects();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage('프로젝트를 찾을 수 없습니다.');
      } else {
        setErrorMessage('프로젝트 수정에 실패했습니다.');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <Title>프로젝트 수정</Title>
        <Label>프로젝트 이름</Label>
        <StyledInput type="text" value={name} onChange={e => setName(e.target.value)} />
        <Label>프로젝트 설명</Label>
        <StyledTextarea value={description} onChange={e => setDescription(e.target.value)} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ButtonContainer>
          <StyledButton primary onClick={handleSave}>
            저장
          </StyledButton>
          <StyledButton onClick={onClose}>취소</StyledButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProjectModal;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  height: 150px;
  box-sizing: border-box;
  margin-bottom: 20px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ primary }) => (primary ? '#fff' : '#333')};
  background-color: ${({ primary, theme }) => (primary ? theme.colors.green1 : '#e0e0e0')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin-right: ${({ primary }) => (primary ? '10px' : '0')};
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;
