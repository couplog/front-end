import { atom } from 'recoil';
import { userState } from '../../types/userStateType';

export const userPhone = atom<userState | ''>({
  key: 'userPhone',
  default: '',
});
