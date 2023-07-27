import request from '../base';

export const coupleDisconnect = (memberId: number | null) => {
  return request({
    method: 'POST',
    url: `/api/members/${memberId}/disconnect`,
  });
};
