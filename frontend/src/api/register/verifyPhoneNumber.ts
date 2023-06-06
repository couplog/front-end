import request from '../base';

// 휴대폰 번호 인증
export const handleVerify = async (phone: string) => {
  return request({
    method: 'POST',
    url: '/api/auth/phone',
    data: { phone },
  });
};

// 인증 번호 검증
export const handleCheckedCode = async (phone: string, code: string) => {
  return request({
    method: 'POST',
    url: '/api/auth/phone/code',
    data: { phone, code },
  });
};
