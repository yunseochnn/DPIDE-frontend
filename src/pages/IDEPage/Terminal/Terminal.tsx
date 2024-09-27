import { ReactTerminal } from 'react-terminal';
import { TerminalContent, TerminalTop, TerminalWrapper } from './Terminal.style';

const Terminal = () => {
  return (
    <TerminalWrapper>
      <TerminalTop></TerminalTop>
      <TerminalContent>
        <ReactTerminal
          showControlBar={false}
          themes={{
            'my-custom-theme': {
              themeBGColor: '#222426',
              themePromptColor: '#FFFFFF',
              themeColor: '#FFFFFF',
            },
          }}
          theme="my-custom-theme"
        />
      </TerminalContent>
    </TerminalWrapper>
  );
};

export default Terminal;
