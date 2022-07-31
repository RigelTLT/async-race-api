import { createCar, updateCar, deleteCar } from './../api/apiGarage';
import { refreshList } from './refreshList';
import { IparamsCar } from './../interface/interface'

export async function clickCreateCar(){
  const nameCar = document.querySelector('.name-car__create') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__create') as HTMLInputElement;
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  const result = await createCar(body);
  if(result){
    refreshList('Create', result.id, result);
  }
}

export async function clickDeleteCar(event: Event): Promise<void>{
  const id = (event.target as HTMLElement).getAttribute('data-id');
  const numberId = Number(id);
  //await deleteCar(numberId);
  refreshList('Delete', numberId);
}