import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java'; // 자바스크립트 모드
import 'ace-builds/src-noconflict/theme-tomorrow_night'; // Monokai 테마
import { useRecoilState } from 'recoil';
import CodeState from '../../../recoil/Code/atoms';

const CodeEditor = () => {
  const [code, setCode] = useRecoilState(CodeState);
  const handleCodeChange = (newCode: string) => {
    setCode({ ...code, content: newCode });
  };
  console.log(code.content);
  return (
    <AceEditor
      mode="java"
      theme="tomorrow_night"
      style={{ width: '100%', height: '100%' }}
      value={code.content}
      onChange={handleCodeChange}
      readOnly={true}
    />
  );
};

export default CodeEditor;
