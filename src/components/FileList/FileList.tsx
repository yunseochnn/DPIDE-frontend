import { FaFile } from 'react-icons/fa';
import { IFile } from '../../recoil/File/type';
import { Content, FileClose, FileIcon, FileListContainer, FileName } from './FileList.style';
import { IoCloseSharp } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import FileState from '../../recoil/File/atoms';
import CodeState from '../../recoil/Code/atoms';

interface Props {
  file: IFile;
}
const FileList = ({ file }: Props) => {
  const [File, setFile] = useRecoilState(FileState);
  const [code, setCode] = useRecoilState(CodeState);

  const onCloseClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation(); // 파일 닫기 버튼 클릭 시 클릭 이벤트 버블링 방지
    //저장하지 않으거면 저장할건지 물어보고 저장하는 로직
    const updateFile = File.filter(f => f.id !== file.id);
    setFile(updateFile);
    if (File.length !== 0) {
      setCode({ id: File[File.length - 1].id, content: File[File.length - 1].modifyContent });
    } else {
      setCode({ id: '', content: '' });
    }
  };
  const isSelect = file.id === code.id;
  const onClick = () => {
    if (File.length > 0) {
      const newFile = File.map(file => {
        if (file.id === code.id) {
          return { ...file, modifyContent: code.content };
        }
        return file;
      });
      setFile(newFile);
    }
    setCode({ id: file.id, content: file.modifyContent });
  };

  return (
    <FileListContainer className={isSelect ? 'select' : ''} onClick={onClick}>
      <Content>
        <FileIcon>
          <FaFile />
        </FileIcon>
        <FileName>{file.name}</FileName>
      </Content>

      <FileClose onClick={onCloseClickHandler}>
        <IoCloseSharp />
      </FileClose>
    </FileListContainer>
  );
};

export default FileList;
