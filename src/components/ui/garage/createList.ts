import { getCars, getCountCars } from '../../api/apiBasic';
import {ICarBase} from '../../interface/interface';
import { eventDeleteCar, eventUpdateCar, eventCheckUpdateCar } from '../../events/addEventsGarage';

export function createControlCarForm(id: number): void {
  const elemetListGarage = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const carControl = document.createElement('div');
  carControl.className = 'control-car';
  elemetListGarage.append(carControl);
  const startButtonCar = document.createElement('button');
  startButtonCar.className = 'button-race button-start-race';
  startButtonCar.innerHTML = 'Start Car';
  startButtonCar.setAttribute('data-id', `${id}`);
  carControl.append(startButtonCar);
  const resetButtonCar = document.createElement('button');
  resetButtonCar.className = 'button-race button-reset';
  resetButtonCar.innerHTML = 'Reset Car';
  resetButtonCar.disabled = true;
  resetButtonCar.setAttribute('data-id', `${id}`);
  carControl.append(resetButtonCar);
  const editButtonCar = document.createElement('button');
  editButtonCar.className = 'button-car button-edit';
  editButtonCar.innerHTML = 'Edit Car';
  editButtonCar.setAttribute('data-id', `${id}`);
  carControl.append(editButtonCar);
  const deleteButtonCar = document.createElement('button');
  deleteButtonCar.className = 'button-car button-delete';
  deleteButtonCar.innerHTML = 'Delete Car';
  deleteButtonCar.setAttribute('data-id', `${id}`);
  carControl.append(deleteButtonCar);
  eventDeleteCar();
  eventCheckUpdateCar();
  eventUpdateCar();
}
export async function createTraceCar(element: ICarBase): Promise<void> {
  const elemetListGarage = document.querySelector(`.garage-list__element[data-id="${element.id}"]`) as HTMLElement;
  const nameCar = document.createElement('h3');
  nameCar.className = 'name-car';
  nameCar.innerHTML = element.name;
  elemetListGarage.append(nameCar);
  const carTrace = document.createElement('div');
  carTrace.className = 'trace-car'
  elemetListGarage.append(carTrace);
  const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
	car = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svgElem.classList.add("svg-car");
  car.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/svg/car.svg#Capa_1');
  car.style.fill = `${element.color}`;
  car.setAttribute('data-id', `${element.id}`);
svgElem.append(car);
carTrace.append(svgElem);
const flag = document.createElement('img');
flag.className = 'flag';
flag.src = 'assets/img/flag.png';
carTrace.append(flag);
}

async function listGarage(page?: number): Promise<void> {
  const body = {
    _page: `${page? page:'1'}`,
    _limit: '7'
  }
  const countCars = await getCars(body);
  const firstElement =countCars[0].id as number;
  const lastElement =countCars[countCars.length-1].id as number;
  const containerListGarage = document.querySelector('.container-garage-list') as HTMLElement;
  const listGarage = document.createElement('ul');
  listGarage.className = 'garage-list';
  containerListGarage.append(listGarage);
  countCars.map((element:{name: string, color: string, id: number}) => {
    if(element){
      const elemetListGarage = document.createElement('li');
    elemetListGarage.className = 'garage-list__element';
    elemetListGarage.setAttribute('data-id', `${element.id}`);
    listGarage.append(elemetListGarage);
    createControlCarForm(element.id);
    createTraceCar(element); 
    }
  });
}
async function TitleGarage(): Promise<void> {
  const countCars = await getCountCars();
  const garage = document.querySelector('.garage') as HTMLElement;
  const containerListGarage = document.createElement('div');
  containerListGarage.className = 'container-garage-list';
  garage.append(containerListGarage);
  const titleGarage = document.createElement('h1');
  titleGarage.className = 'title';
  titleGarage.innerHTML = `${countCars} cars in the garage`;
  containerListGarage.append(titleGarage);
  const pageTitleGarage = document.createElement('span');
  pageTitleGarage.className = 'garage-list__page';
  pageTitleGarage.innerHTML = `Page #`;
  containerListGarage.append(pageTitleGarage);
  const pageGarage = document.createElement('span');
  pageGarage.className = 'garage-list__page number-page';
  pageGarage.innerHTML = `1`;
  containerListGarage.append(pageGarage);
  const ListPage = document.createElement('div');
  ListPage.className = 'container-list__page';
  containerListGarage.append(ListPage);
  const prevListPage = document.createElement('button');
  prevListPage.className = 'button-list prev';
  prevListPage.innerHTML = 'Prev';
  prevListPage.value = 'Prev';
  prevListPage.disabled = true;
  ListPage.append(prevListPage);
  const nextListPage = document.createElement('button');
  nextListPage.className = 'button-list next';
  nextListPage.innerHTML = 'Next';
  nextListPage.value = 'Next';
  if(countCars < 7){
  nextListPage.disabled = true;
  }
  ListPage.append(nextListPage);
  listGarage();   
}

export function createhList():void {
  const garageList = document.querySelector('.container-garage-list') as HTMLElement;
  if(garageList){
    garageList.remove();
  }
  TitleGarage();
}

