import { UserPlanDetailProps } from '../../types/atom/userPlanType';
import request from '../base';

// 일정 수정
export const editPlan = (
  planData: UserPlanDetailProps,
  memberId: number | null,
  scheduleId: number | null | undefined,
  updateRepeat: boolean
) => {
  return request({
    method: 'PUT',
    url: `/api/members/${memberId}/schedules/${scheduleId}?updateRepeat=${updateRepeat}`,
    data: planData,
  });
};

// 데이트 수정
export const editDate = (
  planData: UserPlanDetailProps,
  coupleId: number | null,
  datingId: number | null | undefined
) => {
  return request({
    method: 'PUT',
    url: `/api/couples/${coupleId}/dating/${datingId}`,
    data: planData,
  });
};
