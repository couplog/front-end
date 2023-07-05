import { atom } from 'recoil';
import { ScheduleDetailType } from '../../types/atom/scheduleDetailType';

export const scheduleDetailState = atom<ScheduleDetailType>({
  key: `userAtom:${Math.random()}`,
  default: {
    scheduleId: null,
    startDateTime: '',
    endDateTime: '',
    title: '',
    content: '',
    location: '',
    RepeatRule: '',
  },
});
