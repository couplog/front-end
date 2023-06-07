import { userProps } from '../../types/userStateType';
import request from '../base';

export const handleLogin = (userInfo: userProps) => {
  console.log('userInfo: ', userInfo);
  return request({
    method: 'POST',
    url: '/api/auth/signup',
    data: userInfo,
  });
};
