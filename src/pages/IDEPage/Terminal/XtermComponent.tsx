import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XtermComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

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
      xterm.writeln('Welcome to xterm.js in React with TypeScript!');

      let inputBuffer = ''; // 입력된 문자열을 저장할 버퍼

      // 사용자 입력 처리
      xterm.onData(data => {
        if (data === '\r') {
          // 엔터 키 입력 처리
          xterm.write('\r\n'); // 다음 줄로 이동
          console.log(inputBuffer); // 웹 콘솔에 입력된 값 출력
          inputBuffer = ''; // 버퍼 초기화
        } else if (data.charCodeAt(0) === 127) {
          // 백스페이스 처리
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            xterm.write('\b \b'); // 터미널에서 백스페이스 표현
          }
        } else {
          inputBuffer += data; // 버퍼에 입력된 데이터 추가
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
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default XtermComponent;
