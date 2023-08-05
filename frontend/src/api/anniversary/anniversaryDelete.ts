import request from '../base';

export const handleAnniversaryDelete = (
  coupleId: number | null,
  anniversaryId: number
) => {
  return request({
    method: 'DELETE',
    url: `/api/couples/${coupleId}/anniversary/${anniversaryId}`,
  });
};
