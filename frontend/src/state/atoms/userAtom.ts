import { atom } from 'recoil';
import { userProps } from '../../types/userStateType';

export const userState = atom<userProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    // 유저 정보 이어서 추가 ex) 이름 ?
    phone: '',
  },
});
