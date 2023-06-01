import { atom } from 'recoil';
import { userProps } from '../../types/userStateType';

export const userState = atom<userProps>({
  key: 'userAtom',
  default: {
    phone: '',
  },
});
