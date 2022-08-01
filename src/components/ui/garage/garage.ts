import { eventAddCar } from '../../events/garage/addEventsGarage';
import { createhList } from './createList';

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
  eventAddCar();
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



export function createPageGarage(){
  createCarForm();
  updateCarForm();
  GenerateCarsForm();
  buttonRaceForm();
  createhList();
}