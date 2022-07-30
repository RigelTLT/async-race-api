import { IparamsCar, createCar, updateCar, deleteCar } from './../ui/uiGarage';
import { refreshList } from './refresh';

export async function clickCreateCar(){
  const nameCar = document.querySelector('.name-car__create') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__create') as HTMLInputElement;
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  await createCar(body);
  refreshList();
}
