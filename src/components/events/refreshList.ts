import {getCountCars} from './../api/apiBasic';
import {ICarBase} from './../interface/interface';
import {createControlCarForm, createTraceCar} from '../ui/garage/createList'

export async function refreshList(event: string, id: number, element?:ICarBase){
  if(event === 'Create' && element){
    addCarsList(id, element);
  }
  if(event === 'Delete'){
    deleteCarsList(id);
  }
}

async function addCarsList(id: number, element: ICarBase){
  const countCars = await getCountCars();
  const title = document.querySelector('.title') as HTMLInputElement;
    title.innerHTML = `${countCars} cars in the garage`;
  if(countCars > 7){
    const nextPage = document.querySelector('.next') as HTMLInputElement;
    if(nextPage.disabled === true){
      nextPage.disabled = false;
    }
  }
  const listPageCar = document.querySelectorAll('.garage-list__element');
  if(listPageCar.length < 7){
    const listGarage = document.querySelector('.garage-list') as HTMLElement;
    const elemetListGarage = document.createElement('li');
    elemetListGarage.className = 'garage-list__element';
    elemetListGarage.setAttribute('data-id', `${id}`);
    listGarage.append(elemetListGarage);
    createControlCarForm(id);
    createTraceCar(element); 
  }
}
async function deleteCarsList(id: number){
  const countCars = await getCountCars();
  const listPageCar = document.querySelectorAll('.garage-list__element');
  console.log(listPageCar);
}