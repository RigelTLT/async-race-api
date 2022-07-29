import { baseUrl, path } from "./uiBasic";
interface IparamsCar{
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
