import { IoClose } from 'react-icons/io5';
import { IdeTop, IdeTop_Close, IdeTop_Logo } from './Header.style';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import ReceiveContent from '../../../recoil/ReceiveContent/atom';
import logo from '../../../../public/images/logo2.png';

const Header = () => {
  const navigate = useNavigate();
  const setReceive = useSetRecoilState(ReceiveContent);

  const onCloseClickHandler = () => {
    setReceive({ sender: '', content: '' });
    navigate('/main');
  };
  return (
    <IdeTop>
      <IdeTop_Logo>
        <img src={logo} />
        <span>D P I D E</span>
      </IdeTop_Logo>
      <IdeTop_Close onClick={onCloseClickHandler}>
        <IoClose size="30" color="white" />
      </IdeTop_Close>
    </IdeTop>
  );
};

export default Header;
