import { getCars, getCountCars, Iparams } from './../ui/uiBasic';
import { IparamsCar, createCar, updateCar, deleteCar } from './../ui/uiGarage';

async function clickCreateCar(){
  const nameCar = document.querySelector('.name-car__create') as HTMLInputElement;
  const colorCar = document.querySelector('.color-car__create') as HTMLInputElement;
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  await createCar(body);
}

export async function createCarForm(){
  const garage = document.querySelector('.garage') as HTMLElement;
  const createCarForm = document.createElement('div');
  createCarForm.className = 'container-garage container__create-car';
  garage.append(createCarForm);
  const createNameCar = document.createElement('input');
  createNameCar.className = 'name-car name-car__create';
  garage.append(createNameCar);
  const createColorCar = document.createElement('input');
  createColorCar.className = 'color-car color-car__create';
  createColorCar.type = 'color';
  garage.append(createColorCar);
  const createButtonCar = document.createElement('button');
  createButtonCar.className = 'button-car button-car__create';
  createButtonCar.innerHTML = 'Create';
  garage.append(createButtonCar);
  createButtonCar.addEventListener('click', clickCreateCar);
}

export async function updateCarForm(){
  const garage = document.querySelector('.garage') as HTMLElement;
  const updateCar = document.createElement('div');
  updateCar.className = 'container-garage container__update-car';
  garage.append(updateCar);
  const updateNameCar = document.createElement('input');
  updateNameCar.className = 'name-car name-car__update';
  updateNameCar.disabled = true;
  garage.append(updateNameCar);
  const updateColorCar = document.createElement('input');
  updateColorCar.className = 'color-car color-car__update';
  updateColorCar.disabled = true;
  updateColorCar.type = 'color';
  garage.append(updateColorCar);
  const updateButtonCar = document.createElement('button');
  updateButtonCar.className = 'button-car button-car__update';
  updateButtonCar.innerHTML = 'Update';
  updateButtonCar.disabled = true;
  garage.append(updateButtonCar);
}

export async function GenerateCarsForm(){
  const garage = document.querySelector('.garage') as HTMLElement;
  const generateCar = document.createElement('div');
  generateCar.className = 'container-garage container__generate-car';
  garage.append(generateCar);
  const generateButtonCar = document.createElement('button');
  generateButtonCar.className = 'button-car button-car__generate';
  generateButtonCar.innerHTML = 'Generate';
  garage.append(generateButtonCar);
}

export async function buttonRaceForm(){
  const garage = document.querySelector('.garage') as HTMLElement;
  const controls = document.createElement('div');
controls.className = 'container-garage container__controls';
garage.append(controls);
const startButtonRace = document.createElement('button');
startButtonRace.className = 'button-race';
startButtonRace.innerHTML = 'Start Race';
controls.append(startButtonRace);
const resetButtonRace = document.createElement('button');
resetButtonRace.className = 'button-race';
resetButtonRace.innerHTML = 'Reset Race';
controls.append(resetButtonRace);
}


function createControlCarForm(id: number): void {
  const elemetListGarage = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const carControl = document.createElement('div');
  carControl.className = 'control-car';
  elemetListGarage.append(carControl);
  const startButtonCar = document.createElement('button');
  startButtonCar.className = 'button-race';
  startButtonCar.innerHTML = 'Start Car';
  carControl.append(startButtonCar);
  const resetButtonCar = document.createElement('button');
  resetButtonCar.className = 'button-race';
  resetButtonCar.innerHTML = 'Reset Car';
  carControl.append(resetButtonCar);
  const editButtonCar = document.createElement('button');
  editButtonCar.className = 'button-car';
  editButtonCar.innerHTML = 'Edit Car';
  carControl.append(editButtonCar);
  const deleteButtonCar = document.createElement('button');
  deleteButtonCar.className = 'button-car';
  deleteButtonCar.innerHTML = 'Delete Car';
  carControl.append(deleteButtonCar);
}
async function createTraceCar(id: number): Promise<void> {
  const list = await getCars();
  const elemetListGarage = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const nameCar = document.createElement('h3');
  nameCar.className = 'name-car';
  nameCar.innerHTML = list[id].name;
  elemetListGarage.append(nameCar);
  const carTrace = document.createElement('div');
  carTrace.className = 'trace-car'
  elemetListGarage.append(carTrace);
  const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
	car = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svgElem.classList.add("svg-car");
  car.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/svg/car.svg#Capa_1');
  car.style.fill = `${list[id].color}`;
  car.setAttribute('data-id', `${id}`);
svgElem.append(car);
carTrace.append(svgElem);
const flag = document.createElement('img');
flag.className = 'flag';
flag.src = 'assets/img/flag.png';
carTrace.append(flag);
}

export async function listGarage(page?: number): Promise<void> {
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

  console.log(listGarage);
  for (let i = firstElement; i <= lastElement; i++) {
    console.log(i);
    const elemetListGarage = document.createElement('li');
    elemetListGarage.className = 'garage-list__element';
    elemetListGarage.setAttribute('data-id', `${i}`);
    listGarage.append(elemetListGarage);
    createControlCarForm(i);
    createTraceCar(i); 
  }
}
export async function TitleGarage(): Promise<void> {
  const countCars = await getCountCars();
  const garage = document.querySelector('.garage') as HTMLElement;
  const containerListGarage = document.createElement('div');
  containerListGarage.className = 'container-garage-list';
  garage.append(containerListGarage);
  const titleGarage = document.createElement('h1');
  titleGarage.className = 'title';
  titleGarage.innerHTML = `${countCars} cars in the garage`;
  containerListGarage.append(titleGarage);
  const pageGarage = document.createElement('h2');
  pageGarage.className = 'garage-list__page';
  pageGarage.innerHTML = `Page #1`;
  containerListGarage.append(pageGarage);
  const prevListPage = document.createElement('button');
  prevListPage.className = 'button-list';
  prevListPage.innerHTML = 'Prev';
  prevListPage.value = 'Prev';
  prevListPage.disabled = true;
  containerListGarage.append(prevListPage);
  const nextListPage = document.createElement('button');
  nextListPage.className = 'button-list';
  nextListPage.innerHTML = 'Next';
  nextListPage.value = 'Next';
  containerListGarage.append(nextListPage);
  listGarage();   
}
export function createPageGarage(){
  createCarForm();
  updateCarForm();
  GenerateCarsForm();
  buttonRaceForm();
  TitleGarage();

}