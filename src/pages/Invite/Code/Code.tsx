import { CodeTop, CodeWrapper, Edit, Files } from './Code.style';
import CodeEditor from './CodeEditor';
import FileList from '../../../components/FileList/FileList';
import { useRecoilState } from 'recoil';
import FileState from '../../../recoil/File/atoms';

const Code = () => {
  const [File, setFile] = useRecoilState(FileState);

  return (
    <CodeWrapper>
      <CodeTop>
        <Files>
          {File.map(file => (
            <FileList file={file} key={file.id} />
          ))}
        </Files>
      </CodeTop>

      <Edit>
        <CodeEditor />
      </Edit>
    </CodeWrapper>
  );
};

export default Code;
