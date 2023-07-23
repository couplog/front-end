import { atom } from 'recoil';
import { EditAnniversaryProps } from '../../types/atom/edtiAnniversaryType';

export const editAnniversaryState = atom<EditAnniversaryProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    id: null,
    title: '',
    date: '',
    content: '',
  },
});
