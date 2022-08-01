import { createCar, updateCar, deleteCar } from './../api/apiGarage';
import { addCarsList, deleteCarsList } from './refreshList';
import { IparamsCar, ICarBase } from './../interface/interface'
import { getCars} from './../api/apiBasic';

export async function clickCreateCar(){
  const nameCar = document.querySelector('.name-car__create') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__create') as HTMLInputElement;
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  const result = await createCar(body);
  if(result){
    addCarsList(result.id, result);
  }
}

export async function clickDeleteCar(event: Event): Promise<void>{
  const id = (event.target as HTMLElement).getAttribute('data-id');
  const numberId = Number(id);
  const listCars = await getCars();
  let nextNumberListId =0;
  for(let i = 0; i < listCars.length;i++){
    if(listCars[i].id === numberId){
      nextNumberListId = i;
    }
  }
  await deleteCar(numberId);
  deleteCarsList(numberId, nextNumberListId);
}