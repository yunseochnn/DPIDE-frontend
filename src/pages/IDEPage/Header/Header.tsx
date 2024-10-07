import { IoClose } from 'react-icons/io5';
import { IdeTop, IdeTop_Close, IdeTop_Logo } from './header.style';
import { useNavigate, useParams } from 'react-router-dom';
import FileSaveRequest from '../../../apis/IDE/File/FileSaveRequest';
import { useCookies } from 'react-cookie';
import { IFile } from '../../../recoil/File/type';
import { confirmAlert } from 'react-confirm-alert';
import { useRecoilState } from 'recoil';
import FileState from '../../../recoil/File/atoms';
import logo from '../../../../public/images/logo2.png';

const Header = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const id = Number(projectId);
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const [Files, setFiles] = useRecoilState(FileState);

  const FileSaveResponse = async (file: IFile) => {
    if (file.modifyContent === file.content) return;
    const fileId = Number(file.id);
    try {
      const response = await FileSaveRequest(id, fileId, file.modifyContent, Authorization);

      if (response.ok) {
        return true;
      } else {
        console.log('파일 저장 실패');
        return false;
      }
    } catch (error) {
      console.log('파일 저장 중 오류:', error);
      return false;
    }
  };

  const onCloseClickHandler = async () => {
    if (Files.length === 0) {
      navigate('/main');
      return;
    }

    confirmAlert({
      message: '열려있는 파일들을 저장하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: async () => {
            try {
              const save = await Promise.all(Files.map(file => FileSaveResponse(file)));
              console.log('모든 파일 저장 완료');
              if (save) {
                setFiles([]);
                navigate('/main');
              }
            } catch (error) {
              console.error('파일 저장 중 오류 발생:', error);
            }
          },
        },
        {
          label: '아니오',
          onClick: () => {
            setFiles([]);
            navigate('/main');
          },
        },
      ],
    });
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
