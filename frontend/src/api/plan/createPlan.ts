import { UserPlanDetailProps } from '../../types/atom/userPlanType';
import request from '../base';

// 일정 생성
export const handleCreatePlan = (
  planData: UserPlanDetailProps,
  memberId: number | null
) => {
  return request({
    method: 'POST',
    url: `/api/members/${memberId}/schedules`,
    data: planData,
  });
};
