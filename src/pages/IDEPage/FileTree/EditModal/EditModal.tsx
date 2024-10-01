import { IoClose } from 'react-icons/io5';
import { ChangeEvent, SetStateAction, useState } from 'react';
import {
  EditModalButton,
  EditModalContainer,
  EditModalContent,
  EditModalForm,
  EditModalInput,
  EditModalInputBox,
  EditModalPopup,
  EditModalTitle,
  EditModalTop,
} from './EditModal.style';

interface Prop {
  edit: string;
  setEdit: React.Dispatch<SetStateAction<string>>;
}

const Modal = ({ edit, setEdit }: Prop) => {
  const [name, setName] = useState('');
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <EditModalContainer>
      <EditModalPopup>
        <EditModalTop>
          <IoClose size="20" onClick={() => setEdit('')} style={{ cursor: 'pointer' }} />
        </EditModalTop>

        <EditModalContent>
          <EditModalTitle>{`${edit} 생성`}</EditModalTitle>
          <EditModalForm>
            <EditModalInput>
              <EditModalInputBox>
                <input
                  placeholder={`${edit} 이름을 작성해주세요.`}
                  type="text"
                  value={name}
                  onChange={onChangeHandler}
                />
              </EditModalInputBox>
            </EditModalInput>

            <EditModalButton type="submit">생성</EditModalButton>
          </EditModalForm>
        </EditModalContent>
      </EditModalPopup>
    </EditModalContainer>
  );
};

export default Modal;
