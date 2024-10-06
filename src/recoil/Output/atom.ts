import { atom } from 'recoil';

const Output = atom<string | null>({
  key: 'Output',
  default: null,
});

export default Output;
