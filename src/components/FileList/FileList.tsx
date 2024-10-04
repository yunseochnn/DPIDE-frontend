import { FaFile } from 'react-icons/fa';
import { IFile } from '../../recoil/File/type';
import { Content, FileClose, FileIcon, FileListContainer, FileName } from './FileList.style';
import { IoCloseSharp } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import FileState from '../../recoil/File/atoms';
import CodeState from '../../recoil/Code/atoms';
import { confirmAlert } from 'react-confirm-alert';
import FileSaveRequest from '../../apis/IDE/File/FileSaveRequest';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface Props {
  file: IFile;
}
const FileList = ({ file }: Props) => {
  const [File, setFile] = useRecoilState(FileState);
  const [code, setCode] = useRecoilState(CodeState);
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const projectId = useParams();
  const id = Number(projectId);
  const fileId = Number(file.id);

  const FileSaveResponse = async () => {
    try {
      const response = await FileSaveRequest(id, fileId, file.modifyContent, Authorization);

      if (response.ok) {
        console.log('파일저장 성공');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation(); // 파일 닫기 버튼 클릭 시 클릭 이벤트 버블링 방지
    //저장하지 않을거면 저장할건지 물어보고 저장하는 로직
    if (file.id === code.id) {
      if (file.modifyContent !== code.content) {
        confirmAlert({
          message: '파일을 저장하시겠습니까?',
          buttons: [
            {
              label: '네',
              onClick: async () => {
                await FileSaveResponse();
              },
            },
            {
              label: '아니오',
              onClick: () => {},
            },
          ],
        });
      }
    } else {
      if (file.modifyContent !== file.content) {
        if (file.modifyContent !== code.content) {
          confirmAlert({
            message: '파일을 저장하시겠습니까?',
            buttons: [
              {
                label: '네',
                onClick: async () => {
                  await FileSaveResponse();
                },
              },
              {
                label: '아니오',
                onClick: () => {},
              },
            ],
          });
        }
      }
    }

    const updateFile = File.filter(f => f.id !== file.id);
    setFile(updateFile);
    if (updateFile.length !== 0) {
      setCode({ id: updateFile[updateFile.length - 1].id, content: updateFile[updateFile.length - 1].modifyContent });
    } else {
      setCode({ id: '', content: '' });
    }
  };

  const isSelect = file.id === code.id;

  const onClick = () => {
    if (File.length > 0) {
      const newFile = File.map(file => {
        if (file.id === code.id) {
          return { ...file, modifyContent: code.content };
        }
        return file;
      });
      setFile(newFile);
    }
    setCode({ id: file.id, content: file.modifyContent });
  };

  return (
    <FileListContainer className={isSelect ? 'select' : ''} onClick={onClick}>
      <Content>
        <FileIcon>
          <FaFile />
        </FileIcon>
        <FileName>{file.name}</FileName>
      </Content>

      <FileClose onClick={onCloseClickHandler}>
        <IoCloseSharp />
      </FileClose>
    </FileListContainer>
  );
};

export default FileList;
