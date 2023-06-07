// 임시 백엔드 주소
// 추후 .env 처리

import axios from 'axios';

const API = 'http://43.201.45.157';

const request = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

request.interceptors.request.use(
  (config) => {
    return config;
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
