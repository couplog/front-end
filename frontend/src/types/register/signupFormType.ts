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

export interface UserSignupProps extends SignupFormData {
  phone: string;
  birthDay: string;
  gender: 'male' | 'female' | null;
}
