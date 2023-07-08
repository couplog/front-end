import { AnniversaryProps } from '../../types/anniversary/types';
import request from '../base';

// 일정 생성
export const handleCreateAnniversary = (
  anniversaryData: AnniversaryProps,
  coupleId: number | null
) => {
  return request({
    method: 'POST',
    url: `/api/couples/${coupleId}/anniversary`,
    data: anniversaryData,
  });
};
