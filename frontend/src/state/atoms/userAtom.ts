import { atom } from 'recoil';
import { UserProps } from '../../types/atom/userStateType';

export const userState = atom<UserProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    name: '',
    nickname: '',
    phone: '',
    birth: '',
    gender: null,
    memberId: null,
  },
});
