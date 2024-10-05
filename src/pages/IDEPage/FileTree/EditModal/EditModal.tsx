import { IoClose } from 'react-icons/io5';
import React, { SetStateAction, useCallback, useEffect } from 'react';
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
import { useForm } from 'react-hook-form'; // react-hook-form 추가
import FolderRequest from '../../../../apis/IDE/File/FolderReqeust';
import { useRecoilState } from 'recoil';
import FolderState from '../../../../recoil/Folder/atoms';

interface Prop {
  edit: string;
  setEdit: React.Dispatch<SetStateAction<string>>;
  selectedNode: NodeApi<IFolder> | null;
}

interface FormValues {
  name: string;
}

const Modal = React.memo(({ edit, setEdit, selectedNode }: Prop) => {
  const [cookies] = useCookies(['Authorization']);
  const [Folder, setFolder] = useRecoilState(FolderState);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const extension = edit === '폴더' ? 'folder' : params.get('extension') === 'Java' ? 'java' : 'py';
  const id = Number(projectId);
  const parentId = Number(selectedNode ? selectedNode.data.id : '-1');
  const path = selectedNode ? selectedNode.data.path : '/';

  console.log(edit);
  console.log(extension);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    console.log(Folder);
  }, [Folder]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      const { name } = data;

      try {
        const response = await CreatFileRequest(id, name, extension, path, parentId, Authorization);

        if (!response) {
          alert('네트워크 오류');
          return;
        }

        const { status } = response;

        if (status === 200) {
          setEdit('');
          const response = await FolderRequest(id, Authorization);
          const { files } = response.data;
          setFolder(files);
          toast.success('파일 생성이 완료되었습니다.', {
            pauseOnHover: false,
            autoClose: 2000,
          });
          reset(); // 폼 리셋
          console.log(Folder);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [id, extension, path, parentId, Authorization, setEdit, setFolder, reset, Folder],
  );

  return (
    <EditModalContainer>
      <EditModalPopup>
        <EditModalTop>
          <IoClose size="20" onClick={() => setEdit('')} style={{ cursor: 'pointer' }} />
        </EditModalTop>

        <EditModalContent>
          <EditModalTitle>{`${edit} 생성`}</EditModalTitle>
          <EditModalForm onSubmit={handleSubmit(onSubmit)}>
            <EditModalInput>
              <EditModalInputBox>
                <input
                  placeholder={`${edit} 이름을 작성해주세요.`}
                  type="text"
                  {...register('name', { required: '문자를 입력해주세요.' })}
                />
              </EditModalInputBox>
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </EditModalInput>

            <EditModalButton type="submit">생성</EditModalButton>
          </EditModalForm>
        </EditModalContent>
      </EditModalPopup>
    </EditModalContainer>
  );
});

export default Modal;
