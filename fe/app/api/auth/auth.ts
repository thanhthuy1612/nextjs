import { get, post, postConnect } from '../base';
import { url } from '../url';

const path = url.auth;
export interface ILogin {
  username?: string;
  password?: string;
  email?: string;
}

export const login = async (user: ILogin) => {
  try {
    const res = await post(`${path}/login`, { ...user });
    // Perform localStorage action
    localStorage.setItem('token', res.data.data.accessToken);
    return { ...res.data };
  } catch (err) {
    console.log(err);
  }
};

export const register = async (user: ILogin) => {
  try {
    const res = await post(`${path}/register`, { ...user });
    // Perform localStorage action
    localStorage.setItem('token', res.data.data.accessToken);
    return { ...res.data };
  } catch (err) {
    console.log(err);
  }
};

export const connect = async (user: ILogin) => {
  try {
    const res = await postConnect(`${path}/connect`, { ...user });
    return { ...res.data };
  } catch (err) {
    console.log(err);
  }
};

export const google = async () => {
  try {
    const res = await get(`${path}/google/callback`);
    localStorage.setItem('token', res.data.data.accessToken);
    return { ...res };
  } catch (err) {
    console.log(err);
  }
};
