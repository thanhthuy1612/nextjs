import { GetStaticProps } from 'next';
import { get } from './base';
import { url } from './url';

const path = url.account;

export const getAll: GetStaticProps = async () => {
  const res = await get(path);
  return res;
};
