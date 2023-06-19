import request from '../base';

export const handlePartnerProfile = (id: number | null) => {
  return request({
    url: `/api/members/${id}/profile/image`,
  });
};
