import { atom } from 'recoil';

export const isNotifyOpenState = atom<boolean>({
  key: 'isNotifyOpenState',
  default: false,
});

export const isProfileMenuOpenState = atom<boolean>({
  key: 'isProfileMenuOpenState',
  default: false,
});
