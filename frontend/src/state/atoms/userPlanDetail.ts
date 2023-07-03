import { atom } from 'recoil';
import { UserPlanDetailProps } from '../../types/atom/userPlanType';

export const planState = atom<UserPlanDetailProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    title: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    content: '',
    repeatRule: '',
    repeatEndTime: '',
  },
});

// 일정 등록 취소시 state값을 초기화 시켜주기 위한 atom
export const initialState = atom<UserPlanDetailProps>({
  key: `userAtom:${Math.random()}`,
  default: {
    title: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    content: '',
    repeatRule: '',
    repeatEndTime: '',
  },
});
