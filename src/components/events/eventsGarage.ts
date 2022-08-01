import { createCar, updateCar, deleteCar } from './../api/apiGarage';
import { addCarsList, deleteCarsList, updateCarsList } from './refreshList';
import { IparamsCar } from './../interface/interface'
import { getCars} from './../api/apiBasic';

function componentToHex(c:number) {
  const hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

function rgbToHex(rgb:string) {
  const string = rgb.replace(/[^0-9, ]/g,"");
  const arrRgb = string.split(', ');
  return `#${componentToHex(Number(arrRgb[0]))}${componentToHex(Number(arrRgb[1]))}${componentToHex(Number(arrRgb[2]))}`;
}

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

export function chekerUpdate(event: Event){
  const id = (event.target as HTMLElement).getAttribute('data-id');
  const updateButtomCar = document.querySelectorAll(`.button-edit`);
  for(let i=0; i< updateButtomCar.length; i++){
    if(updateButtomCar[i].classList.contains('update-car')){
      updateButtomCar[i].classList.remove('update-car');
    }
  }
  (event.target as HTMLElement).classList.add('update-car');
  const updateCar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const valueNameCar = (updateCar.childNodes[1] as HTMLElement).innerHTML;
  const valueColorCar = ((updateCar.childNodes[2].firstChild as HTMLElement).firstChild as HTMLElement).style.fill;
  const nameCar = document.querySelector('.name-car__update') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__update') as HTMLInputElement;
  const button = document.querySelector('.button-car__update') as HTMLInputElement;
  nameCar.disabled = false;
  colorCar.disabled = false;
  button.disabled = false;
  nameCar.value = valueNameCar;
  colorCar.value = rgbToHex(valueColorCar);
}

export async function unlockUpdateCar(): Promise<void>{
  const idUpdate = (document.querySelector('.update-car') as HTMLElement).getAttribute('data-id');
  clickUpdateCar(Number(idUpdate));
}
export async function clickUpdateCar(id: number): Promise<void>{
  const nameCar = document.querySelector('.name-car__update') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__update') as HTMLInputElement;
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  const result = await updateCar(id, body);
  if(result){
    updateCarsList(id, result);
  }
}