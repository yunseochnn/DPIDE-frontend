import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java'; // 자바스크립트 모드
import 'ace-builds/src-noconflict/theme-monokai'; // Monokai 테마

const CodeEditor = () => {
  const [code, setCode] = useState('');
  console.log(code);
  return (
    <AceEditor
      mode="java"
      theme="monokai"
      style={{ width: '100%', height: '100%' }}
      value={code}
      onChange={setCode}
      setOptions={{
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
