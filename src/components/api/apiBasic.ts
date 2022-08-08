import { Iparams } from './../interface/interface';

export const baseUrl = 'http://127.0.0.1:3000';
export const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

export const generatorQueryString = (params: Iparams )=> Object.keys(params).length ? `?${Object.entries(params).map(el => `${el[0]}=${el[1]}`).join('&')}` : '';



