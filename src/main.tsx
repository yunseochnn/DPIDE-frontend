import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { TerminalContextProvider } from 'react-terminal';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RecoilRoot>
      <TerminalContextProvider>
        <App />
      </TerminalContextProvider>
    </RecoilRoot>
  </BrowserRouter>,
);
