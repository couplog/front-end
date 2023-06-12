export interface userProps {
  memberID: number;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
  gender: 'male' | 'female' | null;
  password: string;
  // 상대방과의 인증 코드 추가?
}
