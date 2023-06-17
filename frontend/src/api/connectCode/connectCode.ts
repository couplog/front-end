import { ConnectCodeType } from '../../types/connectCodeType';
import request from '../base';

export const handleGettingCode = (memberId: number) => {
  return request({
    method: 'GET',
    url: `/api/members/${memberId}/connect`,
  });
};

export const handlePostingCode = (
  memberId: number,
  payload: ConnectCodeType
) => {
  return request({
    method: 'POST',
    url: `/api/members/${memberId}/connect`,
    data: payload,
  });
};
