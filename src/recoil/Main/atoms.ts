import { atom } from 'recoil';

export const isModalOpenState = atom<boolean>({
  key: 'isModalOpenState',
  default: false,
});

export const selectedButtonState = atom<'myProjects' | 'sharedProjects' | null>({
  key: 'selectedButtonState',
  default: null,
});
export const isSuccessModalOpenState = atom<boolean>({
  key: 'isSuccessModalOpenState',
  default: false,
});
