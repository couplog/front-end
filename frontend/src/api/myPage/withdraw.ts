import request from '../base';

export const userWithdraw = (memberId: number | null) => {
  return request({
    method: 'DELETE',
    url: `/api/members/${memberId}/withdrawal`,
  });
};
