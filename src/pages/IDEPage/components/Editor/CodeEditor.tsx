import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <Editor
      theme="vs-dark"
      language="java"
      options={{
        fontSize: 15,
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};

export default CodeEditor;
