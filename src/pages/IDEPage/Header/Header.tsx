import { IoClose } from 'react-icons/io5';
import { IdeTop, IdeTop_Close, IdeTop_Logo } from './header.style';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onCloseClickHandler = () => {
    navigate('/main');
  };
  return (
    <IdeTop>
      <IdeTop_Logo>
        <img src="/src/assets/images/logo2.png" />
        <span>D P I D E</span>
      </IdeTop_Logo>
      <IdeTop_Close onClick={onCloseClickHandler}>
        <IoClose size="30" color="white" />
      </IdeTop_Close>
    </IdeTop>
  );
};

export default Header;
