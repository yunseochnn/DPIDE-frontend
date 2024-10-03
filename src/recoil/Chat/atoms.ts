import { atom } from 'recoil';
import profile from '../../assets/images/default-profile-image.png';

interface RecoilMessage {
  text: string;
  sender: string;
  profile: string;
  createdAt: string;
}

export const messagesState = atom<RecoilMessage[]>({
  key: 'messagesState',
  default: [
    {
      text: 'Hello! This is my message.',
      sender: 'john_doe',
      profile: profile,
      createdAt: new Date().toISOString(),
    },
    {
      text: 'This is a message from User2.',
      sender: 'User2',
      profile: profile,
      createdAt: new Date().toISOString(),
    },
  ],
});

export const inputState = atom({
  key: 'inputState',
  default: '',
});
