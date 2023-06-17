// 유저 개인
export interface UserProps {
  memberId: number | null;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
  gender: 'male' | 'female' | null;
  profileImageUrl: string;
}

// 커플
export interface CoupleProps {
  coupleId: number | null;
  firstDate: string;
  partnerId: number | null;
  partnerImageUrl: string;
}
