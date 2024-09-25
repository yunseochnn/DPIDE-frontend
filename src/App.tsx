import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/ MainPage/Main';
import Ide from './pages/IDEPage/Ide';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import MyPage from './pages/MyPagePage/MyPage';
import StartPage from './pages/StartPage/StartPage';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/ide/:projectId" element={<Ide />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/" element={<StartPage />} />
    </Routes>
  );
}

export default App;
