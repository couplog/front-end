import { atom } from 'recoil';

interface Props {
  mode: string;
  detail: object;
}

export const editModeState = atom<Props>({
  key: `userAtom:${Math.random()}`,
  default: {
    mode: '',
    detail: {},
  },
});
