// 휴대폰 인증
export interface PhoneVerifyData {
  phoneNumber: string;
  code: string;
}

// 회원정보
export interface SignupFormData {
  name: string;
  nickname: string;
  password: string;
}

// 회원가입 API type
export interface UserSignupProps {
  name: string;
  nickname: string;
  password: string;
  phone: string;
  birth: string;
  gender: 'male' | 'female' | null;
}
