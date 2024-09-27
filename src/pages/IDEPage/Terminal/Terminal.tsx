import { TerminalContent, TerminalTop, TerminalWrapper } from './Terminal.style';
import XtermComponent from './XtermComponent';

const Terminal = () => {
  return (
    <TerminalWrapper>
      <TerminalTop></TerminalTop>
      <TerminalContent>
        <XtermComponent />
      </TerminalContent>
    </TerminalWrapper>
  );
};

export default Terminal;
