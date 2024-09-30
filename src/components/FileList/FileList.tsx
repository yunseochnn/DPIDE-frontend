import { FaFile } from 'react-icons/fa';
import { IFile } from '../../recoil/File/type';
import { Content, FileClose, FileIcon, FileListContainer, FileName } from './FileList.style';
import { IoCloseSharp } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import FileState from '../../recoil/File/atoms';

interface Props {
  file: IFile;
}
const FileList = ({ file }: Props) => {
  const [File, setFile] = useRecoilState(FileState);
  const onCloseClickHandler = () => {
    //저장하지 않으거면 저장할건지 물어보고 저장하는 로직
    const updateFile = File.filter(f => f.id !== file.id);
    setFile(updateFile);
  };
  return (
    <FileListContainer>
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
