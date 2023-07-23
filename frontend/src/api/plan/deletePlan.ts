import request from '../base';

// 개인 일정 삭제
export const handleDeleteMyPlan = (
  memberId: number | null,
  scheduleId: number | null,
  deleteRepeat: boolean
) => {
  return request({
    method: 'DELETE',
    url: `/api/members/${memberId}/schedules/${scheduleId}?deleteRepeat=${deleteRepeat}`,
  });
};

// 데이트 일정 삭제
export const handleDeleteDatePlan = (
  coupleId: number | null,
  datingId: number | null
) => {
  return request({
    method: 'DELETE',
    url: `/api/couples/${coupleId}/dating/${datingId}`,
  });
};
