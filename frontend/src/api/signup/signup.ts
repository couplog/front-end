import { UserSignupProps } from '../../types/register/signupFormType';
import request from '../base';

export const handleSignup = (userInfo: UserSignupProps) => {
  return request({
    method: 'POST',
    url: '/api/auth/signup',
    data: userInfo,
  });
};
