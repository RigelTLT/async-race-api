import {Iparams} from "./../interface/interface"

export const baseUrl = 'http://127.0.0.1:3000';
export const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners'
}

const generatorQueryString =(params: Iparams )=> Object.keys(params).length ? `?${Object.entries(params).map (el => `${el[0]}=${el[1]}`).join('&')}` : '';


export async function getCars (params?: Iparams){
const response = await fetch(`${baseUrl}${path.garage}${params ? generatorQueryString(params):''}`);
const data = await response.json();
return data;
}
export async function getCountCars(){
  const countCars = await getCars(); 
  return countCars.length;
}
