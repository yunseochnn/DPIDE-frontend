import { atom } from 'recoil';

interface RecoilMessage {
  text: string;
  sender: string;
  profile: string;
  createdAt: string;
}

export const messagesState = atom<RecoilMessage[]>({
  key: 'messagesState',
  default: [],
});

export const inputState = atom({
  key: 'inputState',
  default: '',
});

export const wideState = atom({
  key: 'wideState',
  default: false,
});
