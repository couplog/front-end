import { atom } from 'recoil';
import { EditScheduleProps } from '../../types/atom/editScheduleType';

export const editModeState = atom<EditScheduleProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    mode: '',
    detail: {},
  },
});
