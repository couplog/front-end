import { atom } from 'recoil';

export const modeState = atom<string>({
  key: `userAtom:${Math.random()}`,
  default: '',
});
