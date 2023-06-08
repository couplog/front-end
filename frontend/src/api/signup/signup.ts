import { userProps } from '../../types/userStateType';
import request from '../base';

export const handleLogin = (userInfo: userProps) => {
  // console.log('userInfo: ', userInfo); 추후 삭제 예정

  return request({
    method: 'POST',
    url: '/api/auth/signup',
    data: userInfo,
  });
};
