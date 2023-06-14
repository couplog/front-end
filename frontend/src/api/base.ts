import axios from 'axios';
// @ts-ignore
import { API_URL } from 'react-native-dotenv';

const request = axios.create({
  baseURL: API_URL,
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
