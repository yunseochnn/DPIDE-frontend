import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import SuccessModal from './SuccessModal.tsx';
import { isSuccessModalOpenState } from '../../recoil/Main/atoms.ts';
import { useRecoilState } from 'recoil';

interface ModalProps {
  closeModal: () => void;
}

const CreateProject: React.FC<ModalProps> = ({ closeModal }) => {
  const [isSuccessModalOpen, setSuccessModalOpen] = useRecoilState(isSuccessModalOpenState);

  const handleCreateProject = () => {
    setSuccessModalOpen(true);
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <CloseIcon onClick={closeModal} />
          <Title>프로젝트 생성하기</Title>
          <ContentWrapper>
            <Label>프로젝트 이름</Label>
            <Input type="text" placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함한 이름" />
            <Label>언어 선택</Label>
            <Select>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </Select>
            <Label>프로젝트 설명</Label>
            <TextArea placeholder="프로젝트 설명을 작성해주세요" />
            <CreateButton onClick={handleCreateProject}>생성하기</CreateButton>
          </ContentWrapper>
        </ModalContent>
      </ModalOverlay>
      {isSuccessModalOpen && <SuccessModal closeModal={() => setSuccessModalOpen(false)} />} {/* 성공 모달 표시 */}
    </>
  );
};

export default CreateProject;

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
