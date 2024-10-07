import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import { useRecoilValue } from 'recoil';
import ReceiveContent from '../../../recoil/ReceiveContent/atom';

const CodeEditor = () => {
  const receiveCode = useRecoilValue(ReceiveContent);
  const params = new URLSearchParams(window.location.search);
  const extension = params.get('extension') === 'Java' ? 'java' : 'python';
  return (
    <AceEditor
      mode={extension}
      theme="tomorrow_night"
      style={{ width: '100%', height: '100%' }}
      value={receiveCode.content}
      readOnly={true}
    />
  );
};

export default CodeEditor;
