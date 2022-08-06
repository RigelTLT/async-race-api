import { eventAddCar, eventGenerateCar, eventRaceCars, eventResetCars } from '../../events/garage/addEventsGarage';
import { createhList } from './createList';

export async function createCarForm() {
  const garage = document.querySelector('.garage') as HTMLElement;
  const carForm = document.createElement('div');
  carForm.className = 'container-garage container__create-car';
  garage.append(carForm);
  const createNameCar = document.createElement('input');
  createNameCar.className = 'input-car name-car__create';
  carForm.append(createNameCar);
  const createColorCar = document.createElement('input');
  createColorCar.className = 'color-car color-car__create';
  createColorCar.type = 'color';
  carForm.append(createColorCar);
  const createButtonCar = document.createElement('button');
  createButtonCar.className = 'button-car button-car__create';
  createButtonCar.innerHTML = 'Create';
  carForm.append(createButtonCar);
  eventAddCar();
}

export async function updateCarForm() {
  const garage = document.querySelector('.garage') as HTMLElement;
  const updateCar = document.createElement('div');
  updateCar.className = 'container-garage container__update-car';
  garage.append(updateCar);
  const updateNameCar = document.createElement('input');
  updateNameCar.className = 'input-car name-car__update';
  updateNameCar.disabled = true;
  updateCar.append(updateNameCar);
  const updateColorCar = document.createElement('input');
  updateColorCar.className = 'color-car color-car__update';
  updateColorCar.disabled = true;
  updateColorCar.type = 'color';
  updateCar.append(updateColorCar);
  const updateButtonCar = document.createElement('button');
  updateButtonCar.className = 'button-car button-car__update';
  updateButtonCar.innerHTML = 'Update';
  updateButtonCar.disabled = true;
  updateCar.append(updateButtonCar);
}

export async function GenerateCarsForm() {
  const garage = document.querySelector('.garage') as HTMLElement;
  const generateCar = document.createElement('div');
  generateCar.className = 'container-garage container__generate-car';
  garage.append(generateCar);
  const generateButtonCar = document.createElement('button');
  generateButtonCar.className = 'button-car button-car__generate';
  generateButtonCar.innerHTML = 'Generate';
  generateCar.append(generateButtonCar);
  eventGenerateCar();
}

export async function buttonRaceForm() {
  const garage = document.querySelector('.garage') as HTMLElement;
  const controls = document.createElement('div');
  controls.className = 'container-garage container__controls';
  garage.append(controls);
  const startButtonRace = document.createElement('button');
  startButtonRace.className = 'button-race start-race__all';
  startButtonRace.innerHTML = 'Start Race';
  controls.append(startButtonRace);
  const resetButtonRace = document.createElement('button');
  resetButtonRace.className = 'button-race reset-race__all';
  resetButtonRace.innerHTML = 'Reset Race';
  resetButtonRace.disabled = true;
  controls.append(resetButtonRace);
  eventRaceCars();
  eventResetCars();
}



export function createPageGarage() {
  createCarForm();
  updateCarForm();
  GenerateCarsForm();
  buttonRaceForm();
  createhList();
}