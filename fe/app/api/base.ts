import axios from 'axios';
import {  baseURL } from './url';

const request = axios.create({ baseURL: baseURL });

// request.interceptors.request.use(
//     function (config) {
//         const accessToken = localStorage.getItem('token');
//         if (accessToken) {
//             config.headers['x-access-token'] = accessToken;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

export const get = async (path: string, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const update = async (path: string, options = {}) => {
  const response = await request.put(path, options);
  return response;
};

export const post = async (path: string, options = {}) => {
  const response = await request.post(path, options);
  return response;
};

export const del = async (path: string, options = {}) => {
  const response = await request.delete(path, options);
  return response;
};

export default request;
