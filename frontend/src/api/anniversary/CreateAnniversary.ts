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

// 일정 수정
export const handleEditAnniversary = (
  anniversaryData: AnniversaryProps,
  coupleId: number | null,
  anniversaryId: number | null
) => {
  return request({
    method: 'PUT',
    url: `/api/couples/${coupleId}/anniversary/${anniversaryId}`,
    data: anniversaryData,
  });
};
