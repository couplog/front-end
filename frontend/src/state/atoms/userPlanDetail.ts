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
