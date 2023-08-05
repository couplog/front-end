import request from '../base';

export const handleCoupleInfo = () => {
  return request({
    url: '/api/couples/me',
  });
};
