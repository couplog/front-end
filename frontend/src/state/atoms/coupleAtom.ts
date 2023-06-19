import { atom } from 'recoil';
import { CoupleProps } from '../../types/atom/userStateType';

// 커플 정보는 추후 백엔드 로직에 따라서 추가되거나 삭제
export const coupleState = atom<CoupleProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    coupleId: null,
    firstDate: '',
    partnerId: null,
    partnerImageUrl: '',
  },
});
