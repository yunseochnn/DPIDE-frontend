import { atom } from 'recoil';
import { IFile } from './type';

const FileState = atom<IFile[]>({
  key: 'FileState',
  default: [],
});

export default FileState;
