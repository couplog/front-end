import { atom } from 'recoil';
import { userProps } from '../../types/userStateType';

export const userState = atom<userProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    // 유저 정보 이어서 추가 ex) 이름 ?
    name: '',
    nickname: '',
    phone: '',
    birth: '',
    gender: null,
    password: '', // 패스워드는 민감 정보이기 때문에 추후 다시 구현 예정
  },
});
