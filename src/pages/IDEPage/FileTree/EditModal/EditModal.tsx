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
  ErrorMessage,
} from './EditModal.style';
import { useParams } from 'react-router-dom';
import CreatFileRequest from '../../../../apis/IDE/File/CreatFileRequest';
import { NodeApi } from 'react-arborist';
import { IFolder } from '../../../../recoil/Folder/types';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

interface Prop {
  edit: string;
  setEdit: React.Dispatch<SetStateAction<string>>;
  selectedNode: NodeApi<IFolder> | null;
}

const Modal = ({ edit, setEdit, selectedNode }: Prop) => {
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const [name, setName] = useState('');
  const { projectId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const extension = edit === '폴더' ? 'Folder' : params.get('extension')?.toLowerCase();
  const id = Number(projectId);
  const parentId = Number(selectedNode ? selectedNode.data.id : '-1');
  const path = selectedNode ? selectedNode.data.path : '/';
  const [errorMessage, setErrorMessage] = useState('');
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = async () => {
    const et = name.split('.');
    if (name.length === 0) {
      setErrorMessage('문자를 입력해주세요.');
      return;
    }
    if (et[et.length - 1] !== extension) {
      setErrorMessage(`${extension}파일명으로 작성해주세요`);
      return;
    }
    try {
      const response = await CreatFileRequest(id, name, extension, path, parentId, Authorization);

      if (!response) {
        alert('네트워크 오류');
        return;
      }

      const { status } = response;

      if (status === 201) {
        setEdit('');
        toast.success('파일 생성이 완료되었습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
              {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </EditModalInput>

            <EditModalButton type="submit" onClick={onSubmit}>
              생성
            </EditModalButton>
          </EditModalForm>
        </EditModalContent>
      </EditModalPopup>
    </EditModalContainer>
  );
};

export default Modal;
