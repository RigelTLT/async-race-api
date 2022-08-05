import {clickDeleteCar, clickCreateCar, chekerUpdate, unlockUpdateCar, openPageCar, changePageNumber, generateCars, startCar, resetCar, raceCars, resetRace } from "./eventsGarage";

export function eventAddCar(){
  const event = document.querySelector('.button-car__create') as HTMLInputElement;
  event.addEventListener('click', clickCreateCar);
}
export function eventGenerateCar(){
  const event = document.querySelector('.button-car__generate') as HTMLInputElement;
  event.addEventListener('click', generateCars);
}
export function eventCheckUpdateCar(){
  const event = document.querySelectorAll('.button-edit');
  event.forEach((el)=>{
el.addEventListener('click', chekerUpdate);
  })
}
export function eventUpdateCar(){
  const event = document.querySelector('.button-car__update') as HTMLInputElement;
  event.addEventListener('click', unlockUpdateCar);
}
export function eventDeleteCar(){
  const event = document.querySelectorAll('.button-delete');
  event.forEach((el)=>{
el.addEventListener('click', clickDeleteCar);
  })
}
export function eventOpenPageCar(){
  const event = document.querySelector('.to-garage') as HTMLInputElement;
  event.addEventListener('click', openPageCar);
}
export function eventChangePage(){
  const event = document.querySelectorAll('.button-list-garage');
  event.forEach((el)=>{
el.addEventListener('click', changePageNumber);
  })
}
export function eventStartCar(id: number){
  const event = document.querySelector(`.button-start-race[data-id="${id}"]`) as HTMLInputElement;
  event.addEventListener('click', ()=>{
  startCar(id)});
}
export function eventResetCar(id: number){
  const event = document.querySelector(`.button-reset[data-id="${id}"]`) as HTMLInputElement;
  event.addEventListener('click', ()=>{
    resetCar(id)});
}
export function eventRaceCars(){
  const event = document.querySelector(`.start-race__all`) as HTMLInputElement;
  event.addEventListener('click', raceCars);
}
export function eventResetCars(){
  const event = document.querySelector(`.reset-race__all`) as HTMLInputElement;
  event.addEventListener('click', resetRace);
}