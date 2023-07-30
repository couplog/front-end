import request from '../base';

export const handlePassword = (
  memberId: number | null,
  password: string,
  method: string
) => {
  return request({
    method: method,
    url: `/api/members/${memberId}/password`,
    data: password,
  });
};
