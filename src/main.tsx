import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter>
      <RecoilRoot>
        <ToastContainer />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </CookiesProvider>,
);
