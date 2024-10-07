import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import { useRecoilState } from 'recoil';
import CodeState from '../../../recoil/Code/atoms';

const CodeEditor = () => {
  const [code, setCode] = useRecoilState(CodeState);
  const params = new URLSearchParams(window.location.search);
  const extension = params.get('extension') === 'Java' ? 'java' : 'python';
  const handleCodeChange = (newCode: string) => {
    setCode({ ...code, content: newCode });
  };
  return (
    <AceEditor
      mode={extension}
      theme="tomorrow_night"
      style={{ width: '100%', height: '100%' }}
      value={code.content}
      onChange={handleCodeChange}
      setOptions={{
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
