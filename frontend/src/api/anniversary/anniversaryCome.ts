import request from '../base';

export const handleAnniversaryComing = (
  coupleId: number | null,
  size: number
) => {
  return request({
    url: `/api/couples/${coupleId}/anniversary/coming?size=${size}`,
  });
};
