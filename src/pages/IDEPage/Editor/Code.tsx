import { PiFloppyDisk } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa6';
import { CodeButton, CodeButtons, CodeTop, CodeWrapper, Edit, Files } from './Code.style';
import CodeEditor from './CodeEditor';
import FileList from '../../../components/FileList/FileList';
import { useRecoilState, useRecoilValue } from 'recoil';
import FileState from '../../../recoil/File/atoms';
import FileSaveRequest from '../../../apis/IDE/File/FileSaveRequest';
import { useParams } from 'react-router-dom';
import CodeState from '../../../recoil/Code/atoms';
import { useCookies } from 'react-cookie';

const Code = () => {
  const [File, setFile] = useRecoilState(FileState);
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const code = useRecoilValue(CodeState);
  const codeId = Number(code);
  const id = Number(projectId);

  const onSaveClickHandler = async () => {
    try {
      const response = await FileSaveRequest(id, codeId, code.content, Authorization);

      if (response.ok) {
        console.log('파일저장 성공');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPlayClickHandler = () => {};
  return (
    <CodeWrapper>
      <CodeTop>
        <Files>
          {File.map(file => (
            <FileList file={file} key={file.id} />
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

      <Edit>
        <CodeEditor />
      </Edit>
    </CodeWrapper>
  );
};

export default Code;
