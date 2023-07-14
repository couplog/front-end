import request from '../base';

export const handleOurAnniversary = (coupleId: number | null) => {
  return request({
    url: `/api/couples/${coupleId}/anniversary?onlyRepeatStarted=true`,
  });
};
