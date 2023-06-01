import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { userProps } from '../../types/userStateType';

export const userState = atom<userProps>({
  key: `userAtom/${uuidv4()}`,
  default: {
    // 유저 정보 이어서 추가 ex) 이름 ?
    phone: '',
  },
});
