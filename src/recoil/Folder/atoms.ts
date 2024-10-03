import { atom } from 'recoil';
import { IFolder } from './types';

const FolderState = atom<IFolder[]>({
  key: 'FolderState',
  default: [],
});

export default FolderState;
