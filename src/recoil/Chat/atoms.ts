import { atom } from 'recoil';
import profile from '../../assets/images/default-profile-image.png';
export const messagesState = atom({
  key: 'messagesState',
  default: [
    { text: '11111', sender: 'User1', profile: profile },
    { text: '222', sender: 'User2', profile: profile },
  ],
});

export const inputState = atom({
  key: 'inputState',
  default: '',
});
