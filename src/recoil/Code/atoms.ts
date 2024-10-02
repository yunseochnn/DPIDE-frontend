import { atom } from 'recoil';
import { IFCode } from './type';

const CodeState = atom<IFCode>({
  key: 'CodeState',
  default: {
    id: '',
    content: '',
  },
});

export default CodeState;
