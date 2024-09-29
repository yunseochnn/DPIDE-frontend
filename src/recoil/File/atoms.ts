import { atom } from 'recoil';
import { IFile } from './type';

const FileState = atom<IFile[]>({
  key: 'FileState',
  default: [{ id: '1', name: 'index.js', content: 'hello word', modifyContent: 'hello word' }],
});

export default FileState;
