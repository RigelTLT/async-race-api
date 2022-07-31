import {clickDeleteCar, clickCreateCar} from "./../events/eventsGarage";

export function eventAddCar(){
  const event = document.querySelector('.button-car__create') as HTMLInputElement;
  event.addEventListener('click', clickCreateCar);
}

export function eventDeleteCar(){
  const event = document.querySelectorAll('.button-delete');
  event.forEach((el)=>{
el.addEventListener('click', clickDeleteCar);
  })
}
/*export function eventEditCar(){
  const event = document.querySelectorAll('.button-edit');
  event.forEach((el)=>{
el.addEventListener('click', clickDeleteCar);
  })
}*/