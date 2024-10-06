import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface SuccessModalProps {
  closeModal: () => void;
  projectId: string;
  language: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ closeModal, projectId, language }) => {
  const navigate = useNavigate();

  const handleRunClick = () => {
    navigate(`/ide/${projectId}?extension=${language}`);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={closeModal} />
        <SuccessIcon />
        <Message>프로젝트가 생성되었습니다</Message>
        <RunButton onClick={handleRunClick}>실행하기</RunButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;

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
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
`;

const CloseIcon = styled(IoMdClose)`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 30px;
  cursor: pointer;
  color: #868899;
`;

const SuccessIcon = styled(FaCheckCircle)`
  color: ${({ theme }) => theme.colors.green1};
  font-size: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Message = styled.h2`
  margin-bottom: 40px;
  color: #333;
  font-size: 22px;
`;

const RunButton = styled.button`
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.green1};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 46px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 25px;
`;
