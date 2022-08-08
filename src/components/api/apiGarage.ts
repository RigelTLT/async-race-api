import { baseUrl, path, generatorQueryString } from './apiBasic';
import { IparamsCar, Iparams } from './../interface/interface';


export async function getCars(params?: Iparams) {
  const response = await fetch(`${baseUrl}${path.garage}${params ? generatorQueryString(params) : ''}`);
  const data = await response.json();
  return data;
}
export async function getCar(id: number) {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const data = await response.json();
  return data;
}
export async function getCountCars() {
  const countCars = await getCars(); 
  return countCars.length;
}
export async function createCar(body: IparamsCar) {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function updateCar(id: number, body: IparamsCar) {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function deleteCar(id: number) {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const employee = await response.json();
  return employee;
}
export async function startStopDriveCar(id: number, status: string) {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const employee = await response.json();
  return employee;
}

