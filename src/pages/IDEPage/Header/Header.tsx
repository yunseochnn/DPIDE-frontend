import { IoClose } from 'react-icons/io5';
import { IdeTop, IdeTop_Close, IdeTop_Logo } from './header.style';

const Header = () => {
  return (
    <IdeTop>
      <IdeTop_Logo>
        <img src="/src/assets/images/logo2.png" />
        <span>D P I D E</span>
      </IdeTop_Logo>
      <IdeTop_Close>
        <IoClose size="30" color="white" />
      </IdeTop_Close>
    </IdeTop>
  );
};

export default Header;
