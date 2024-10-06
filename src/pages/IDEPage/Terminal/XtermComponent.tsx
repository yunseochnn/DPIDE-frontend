import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import Input from '../../../recoil/Input/atom';
import Output from '../../../recoil/Output/atom';

const XtermComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [input, setInput] = useRecoilState(Input);
  const [output, setOutput] = useRecoilState(Output);

  let inputBuffer = ''; // 입력된 문자열을 저장할 버퍼

  useEffect(() => {
    if (terminalRef.current) {
      // 터미널과 애드온 인스턴스 생성
      const xterm = new Terminal();
      const fitAddon = new FitAddon();
      xterm.loadAddon(fitAddon);

      // 터미널을 DOM 요소에 연결
      xterm.open(terminalRef.current);
      fitAddon.fit();

      // 기본 메시지 출력
      xterm.writeln('Welcome to DPIDE!!');

      // 사용자 입력 처리
      xterm.onData(data => {
        if (data === '\r') {
          // 엔터 키 입력 처리
          xterm.write('\r\n'); // 줄바꿈만 수행
          if (inputBuffer.trim() === 'clear') {
            // 입력이 'clear'일 경우 터미널 초기화
            xterm.clear(); // 터미널 내용 초기화
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputBuffer = '';
          } else if (inputBuffer.trim()) {
            // 입력이 있을 때만 상태 업데이트
            setInput(prevInput => prevInput + '\n' + inputBuffer); // Recoil 상태로 inputBuffer 업데이트
            // eslint-disable-next-line react-hooks/exhaustive-deps
            inputBuffer = '';
            console.log(input);
          }
        } else if (data.charCodeAt(0) === 127) {
          // 백스페이스 처리
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            xterm.write('\b \b'); // 터미널에서 백스페이스 표현
          }
        } else {
          inputBuffer += data; // 입력된 데이터를 버퍼에 추가
          xterm.write(data); // 터미널에 입력된 데이터 출력
        }
      });

      // 참조에 인스턴스 저장
      xtermRef.current = xterm;
      fitAddonRef.current = fitAddon;

      return () => {
        // 컴포넌트 언마운트 시 인스턴스 정리
        xterm.dispose();
      };
    }
  }, [setInput]);

  // output이 있으면 터미널에 출력하고 상태 초기화
  useEffect(() => {
    if (output && xtermRef.current) {
      const formattedOutput = output.replace(/\n/g, '\r\n');
      xtermRef.current.write(formattedOutput);
      setOutput(null); // 출력 후 상태 초기화
      setInput('');
    }
  }, [output, setInput, setOutput]);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default XtermComponent;
