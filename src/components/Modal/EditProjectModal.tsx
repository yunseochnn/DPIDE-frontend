import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
      <ModalContent>
        <h2>프로젝트 수정</h2>
        <label>프로젝트 이름</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label>프로젝트 설명</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ButtonContainer>
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>취소</button>
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
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;
