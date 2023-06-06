// # RegisterPhoneNum

// 휴대폰 번호 11자리 정규식
export const validatePhoneNumber = (value: string) => {
  if (value.length === 0) {
    return '';
  }
  if (!/^\d{11}$/.test(value)) {
    return '올바르지 않은 전화번호 형식입니다. 11자 숫자';
  }
  return true;
};

// 코드 6자리 숫자 정규식
export const validateCode = (value: string) => {
  if (value.length === 0) {
    return '';
  }
  if (!/^\d{6}$/.test(value)) {
    return '올바르지 않은 인증번호 형식입니다. 6자 숫자';
  }
  return true;
};

// # ResgisterUserInfo

// 이름, 닉네임 정규식
const validateName = (value: string, fieldName: string) => {
  if (value.length === 0) {
    return '';
  }
  if (value.length < 2 || value.length > 10 || !/^[가-힣]+$/.test(value)) {
    return `잘못된 ${fieldName} 형식입니다. 2-10자 한글`;
  }
  return true;
};

export const validateNameWrapper = (fieldName: string) => (value: string) => {
  const validation = validateName(value, fieldName);
  return typeof validation === 'string' ? validation : undefined;
};

// 패스워드 정규식
export const validatePassword = (value: string) => {
  if (value.length === 0) {
    return '';
  }
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,20}$/.test(value)) {
    return '잘못된 비밀번호 형식입니다. 5-20자 영문, 숫자 조합';
  }
  return true;
};
