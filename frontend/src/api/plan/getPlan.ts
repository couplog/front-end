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

// 개인 일정 디테일 조회
export const handleGetPlanDetail = async (
  { year, month, day }: PlanPropsType,
  memberId: number | null
) => {
  return request({
    url: `/api/members/${memberId}/schedules?year=${year}&month=${month}&day=${day}`,
  });
};
