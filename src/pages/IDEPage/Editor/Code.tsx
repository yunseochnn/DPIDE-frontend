import { PiFloppyDisk } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa6';
import { CodeButton, CodeButtons, CodeTop, CodeWrapper, Edit, Files } from './Code.style';
import CodeEditor from './CodeEditor';
import FileList from '../../../components/FileList/FileList';
import { useRecoilState } from 'recoil';
import FileState from '../../../recoil/File/atoms';

const Code = () => {
  const [File, setFile] = useRecoilState(FileState);
  const onSaveClickHandler = () => {};
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
