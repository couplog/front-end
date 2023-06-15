export interface UserProps {
  memberId: number | null;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
  gender: 'male' | 'female' | null;
}
