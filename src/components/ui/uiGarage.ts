import { baseUrl, path } from "./uiBasic";
export interface IparamsCar{
  name: string;
  color: string;
}
export async function createCar(body: IparamsCar) {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function updateCar(id: number,body: IparamsCar) {
  const response = await fetch(`${baseUrl}${path.garage}/:${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function deleteCar(id: number) {
  const response = await fetch(`${baseUrl}${path.garage}/:${id}`, {
    method: "DELETE",
  });
  const employee = await response.json();
  return employee;
}
