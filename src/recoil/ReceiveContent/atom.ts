import { atom } from 'recoil';

interface IReceive {
  sender: string;
  content: string;
}

const ReceiveContent = atom<IReceive>({
  key: 'ReceiveContent',
  default: {
    sender: '',
    content: '',
  },
});

export default ReceiveContent;
