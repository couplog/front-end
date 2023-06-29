import request from '../base';

export const handlePartnerInfo = () => {
  return request({
    url: `/api/members/partner`,
  });
};
