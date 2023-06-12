// 임시 백엔드 주소
// 추후 .env 처리

import axios from 'axios';
import { getData } from '../utils/storage';

const API = 'http://15.165.57.110';

const request = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

request.interceptors.request.use(
  async (request) => {
    const token = await getData('token');

    if (token) {
      request.headers.authorization = token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default request;
