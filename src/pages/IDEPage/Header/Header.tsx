import { IoClose } from 'react-icons/io5';
import { IdeTop, IdeTop_Close, IdeTop_Logo } from './header.style';
import { useNavigate, useParams } from 'react-router-dom';
import FileSaveRequest from '../../../apis/IDE/File/FileSaveRequest';
import { useCookies } from 'react-cookie';
import { IFile } from '../../../recoil/File/type';
import { confirmAlert } from 'react-confirm-alert';
import { useRecoilState } from 'recoil';
import FileState from '../../../recoil/File/atoms';

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
        console.log('파일 저장 성공');
      } else {
        console.log('파일 저장 실패');
      }
    } catch (error) {
      console.log('파일 저장 중 오류:', error);
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
              // 모든 파일이 저장될 때까지 기다림
              await Promise.all(Files.map(file => FileSaveResponse(file)));
              console.log('모든 파일 저장 완료');
              setFiles([]); // 모든 파일 저장 후 setFiles([]) 호출
              navigate('/main'); // 파일 저장 후 페이지 이동
            } catch (error) {
              console.error('파일 저장 중 오류 발생:', error);
            }
          },
        },
        {
          label: '아니오',
          onClick: () => {
            setFiles([]); // 저장하지 않고 바로 닫기
            navigate('/main');
          },
        },
      ],
    });
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
