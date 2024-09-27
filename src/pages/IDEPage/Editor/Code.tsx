import { PiFloppyDisk } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa6';
import { CodeButton, CodeButtons, CodeTop, CodeWrapper, Edit, Files } from './Code.style';
import CodeEditor from './CodeEditor';

const Code = () => {
  return (
    <CodeWrapper>
      <CodeTop>
        <Files></Files>
        <CodeButtons>
          <CodeButton>
            <PiFloppyDisk size="25" color="white" />
          </CodeButton>
          <CodeButton>
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
