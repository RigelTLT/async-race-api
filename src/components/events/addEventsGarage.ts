import {clickDeleteCar, clickCreateCar, unlockUpdateCar} from "./../events/eventsGarage";

export function eventAddCar(){
  const event = document.querySelector('.button-car__create') as HTMLInputElement;
  event.addEventListener('click', clickCreateCar);
}
export function eventUpdateCar(){
  const event = document.querySelectorAll('.button-edit');
  event.forEach((el)=>{
el.addEventListener('click', unlockUpdateCar);
  })
}

export function eventDeleteCar(){
  const event = document.querySelectorAll('.button-delete');
  event.forEach((el)=>{
el.addEventListener('click', clickDeleteCar);
  })
}
