import { baseUrl, path, generatorQueryString } from "./apiBasic";
import {IparamsSortWinners, IparamsWinner, IWinner} from "./../interface/interface"

export async function getWinners (params?: IparamsSortWinners){
  const response = await fetch(`${baseUrl}${path.winners}${params ? generatorQueryString(params):''}`);
  const data = await response.json();
  return data;
  }
export async function getWinner (id: number){
  const response = await fetch(`${baseUrl}${path.winners}/${id}`);
  const data = await response.json();
  return data;
}
export async function getCountWinners(){
  const countCars = await getWinners(); 
  return countCars.length;
}
export async function createWinner(body: IWinner) {
  const response = await fetch(`${baseUrl}${path.winners}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function updateWinner(id: number,body: IparamsWinner) {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const employee = await response.json();
  return employee;
}
export async function deleteWinner(id: number) {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: "DELETE",
  });
  const employee = await response.json();
  return employee;
}