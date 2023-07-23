import axios from 'axios';
// @ts-ignore
import { API_URL } from 'react-native-dotenv';
import { getData, removeData, storeData } from '../utils/storage';

const request = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// 토큰 재발급 응답 인터셉터 설정
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    console.log('status: ', status);

    // 401 에러 처리 (토큰 만료 등)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 중복 재시도를 방지하기 위해 요청 객체에 _retry 속성 추가

      try {
        // 토큰을 재발급 받습니다.
        const refreshToken = await getData('refreshToken');

        const res = await axios.post(
          `${API_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: refreshToken,
            },
          }
        );
        await removeData('token');

        const newToken = res.headers.authorization;

        // 재발급 받은 토큰을 저장합니다. (기존 토큰 삭제)
        await storeData('token', newToken);

        // 재발급한 토큰을 요청 헤더에 포함
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // 기존 요청을 다시 시도
        return request(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

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
