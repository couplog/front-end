import { PlanPropsType } from '../../types/calendar/calendarType';
import request from '../base';

// 개인 일정 날짜 조회
export const handleGetPlan = async (
  { year, month }: PlanPropsType,
  memberId: number | null
) => {
  return request({
    url: `/api/members/${memberId}/schedules/dates?year=${year}&month=${month}`,
  });
};
