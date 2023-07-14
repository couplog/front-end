import request from '../base';

// 일정 삭제
export const handleDeletePlan = async (
  memberId: number | null,
  scheduleId: number | null,
  deleteRepeat: boolean
) => {
  return request({
    method: 'DELETE',
    url: `/api/members/${memberId}/schedules/${scheduleId}?deleteRepeat=${deleteRepeat}`,
  });
};
