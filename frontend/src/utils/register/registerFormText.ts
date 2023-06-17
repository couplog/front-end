import {
  validateCode,
  validateNameWrapper,
  validatePassword,
  validatePhoneNumber,
} from './registerValidation';

export const formFields = [
  {
    key: 'name',
    title: '이름',
    placeholder: '2-10자 한글',
    validate: validateNameWrapper('이름'),
  },
  {
    key: 'nickname',
    title: '닉네임',
    placeholder: '2-10자 한글',
    validate: validateNameWrapper('닉네임'),
  },
  {
    key: 'password',
    title: '비밀번호',
    placeholder: '5-20자 영문, 숫자 조합',
    validate: validatePassword,
  },
];

export const phoneFields = [
  {
    key: 'phoneNumber',
    title: '휴대폰 인증',
    placeholder: '‘-’를 제외한 휴대폰 11자리',
    validate: validatePhoneNumber,
  },
  {
    key: 'code',
    title: '인증번호',
    placeholder: '인증번호 6자리',
    validate: validateCode,
  },
];
