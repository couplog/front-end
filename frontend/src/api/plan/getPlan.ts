import { PlanPropsType } from '../../types/calendar/calendarType';
import request from '../base';

// 일정 날짜 조회
export const handleGetPlan = (
  { year, month }: PlanPropsType,
  memberId: number | null
) => {
  return request({
    url: `/api/members/${memberId}/calender/date?year=${year}&month=${month}`,
  });
};

// 개인 일정 디테일 조회
export const handleGetPlanDetail = (
  { year, month, day }: PlanPropsType,
  memberId: number | null
) => {
  return request({
    url: `/api/members/${memberId}/schedules?year=${year}&month=${month}&day=${day}`,
  });
};

// 데이트 일정 날짜 조회
export const handleGetDatePlan = (coupleId: number | null) => {
  return request({
    url: `/api/couples/${coupleId}/dating/dates`,
  });
};

// 데이트 일정 디테일 조회
export const handleGetDatePlanDetail = (
  { year, month, day }: PlanPropsType,
  coupleId: number | null
) => {
  return request({
    url: `/api/couples/${coupleId}/dating?year=${year}&month=${month}&day=${day}`,
  });
};

// 기념일 목록 조회
export const handleGetAnniversaryList = (
  { year, month, day }: PlanPropsType,
  coupleId: number | null
) => {
  return request({
    url: `/api/couples/${coupleId}/anniversary?year=${year}&month=${month}&day=${day}`,
  });
};
