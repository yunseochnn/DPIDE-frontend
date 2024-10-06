import { PiFloppyDisk } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa6';
import { CodeButton, CodeButtons, CodeTop, CodeWrapper, Edit, Files } from './Code.style';
import CodeEditor from './CodeEditor';
import FileList from '../../../components/FileList/FileList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import FileState from '../../../recoil/File/atoms';
import FileSaveRequest from '../../../apis/IDE/File/FileSaveRequest';
import { useParams } from 'react-router-dom';
import CodeState from '../../../recoil/Code/atoms';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Empty from './Empty';
import PlayRequest from '../../../apis/IDE/File/PlayRequest';
import Output from '../../../recoil/Output/atom';
import axios from 'axios';
import Input from '../../../recoil/Input/atom';
import { NodeApi } from 'react-arborist';
import { IFolder } from '../../../recoil/Folder/types';
import { SetStateAction } from 'react';

interface Prop {
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
}

const Code = ({ setSelectedNode }: Prop) => {
  const [File, setFile] = useRecoilState(FileState);
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const code = useRecoilValue(CodeState);
  const codeId = Number(code.id);
  const id = Number(projectId);
  const is = File.length === 0 ? false : true;
  const setOutput = useSetRecoilState(Output);
  const input = useRecoilValue(Input);

  const onSaveClickHandler = async () => {
    try {
      const response = await FileSaveRequest(id, codeId, code.content, Authorization);

      if (response.ok) {
        const newFile = File.map(file => {
          if (file.id === code.id) {
            return { ...file, content: code.content, modifyContent: code.content };
          }
          return file;
        });
        setFile(newFile);
        toast.success('파일을 저장하였습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPlayClickHandler = async () => {
    console.log('파일 실행중');
    try {
      const response = await PlayRequest(id, codeId, Authorization, input);

      const { status, data } = response;
      console.log(data);
      if (status === 200) {
        setOutput(data);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            console.log('파일을 찾을 수 없습니다.');
          } else if (status === 500) {
            console.log('서버 오류');
          }
        }
      }
    } finally {
      console.log('파일 실행 완료');
    }
  };

  return (
    <CodeWrapper>
      <CodeTop>
        <Files>
          {File.map(file => (
            <FileList file={file} key={file.id} setSelectedNode={setSelectedNode} />
          ))}
        </Files>
        <CodeButtons>
          <CodeButton onClick={onSaveClickHandler}>
            <PiFloppyDisk size="25" color="white" />
          </CodeButton>
          <CodeButton onClick={onPlayClickHandler}>
            <FaPlay size="25" color="white" />
          </CodeButton>
        </CodeButtons>
      </CodeTop>

      <Edit>{is ? <CodeEditor /> : <Empty />}</Edit>
    </CodeWrapper>
  );
};

export default Code;
