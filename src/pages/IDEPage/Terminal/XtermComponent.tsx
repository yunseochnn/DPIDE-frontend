import React, { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import Input from '../../../recoil/Input/atom';
import Output from '../../../recoil/Output/atom';

const XtermComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const setInput = useSetRecoilState(Input);
  const [output, setOutput] = useRecoilState(Output);

  let inputBuffer = '';

  useEffect(() => {
    if (terminalRef.current) {
      const xterm = new Terminal();
      const fitAddon = new FitAddon();
      xterm.loadAddon(fitAddon);

      xterm.open(terminalRef.current);
      fitAddon.fit();

      xterm.writeln('Welcome to DPIDE!!');

      xterm.onData(data => {
        if (data === '\r') {
          xterm.write('\r\n');
          if (inputBuffer.trim() === 'clear') {
            xterm.clear();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputBuffer = '';
          } else if (inputBuffer.trim()) {
            setInput(prevInput => prevInput + inputBuffer + '\n');
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputBuffer = '';
          }
        } else if (data.charCodeAt(0) === 127) {
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            xterm.write('\b \b');
          }
        } else {
          inputBuffer += data;
          xterm.write(data);
        }
      });

      xtermRef.current = xterm;
      fitAddonRef.current = fitAddon;

      return () => {
        xterm.dispose();
      };
    }
  }, [setInput]);

  useEffect(() => {
    if (output && xtermRef.current) {
      const formattedOutput = output.replace(/\n/g, '\r\n');
      xtermRef.current.write(formattedOutput);
      setOutput(null);
      setInput('');
    }
  }, [output, setInput, setOutput]);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default XtermComponent;
