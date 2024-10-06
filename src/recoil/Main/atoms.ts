import { atom } from 'recoil';

export const selectedButtonState = atom<'myProjects' | 'sharedProjects' | null>({
  key: 'selectedButtonState',
  default: 'myProjects',
});
