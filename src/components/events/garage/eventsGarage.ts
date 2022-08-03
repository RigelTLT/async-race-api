import { getCars, getCountCars, createCar, updateCar, deleteCar } from '../../api/apiGarage';
import { addCarsList, deleteCarsList, updateCarsList, changeListPage } from './refreshGarageList';
import { IparamsCar } from '../../interface/interface'

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
  if(nameCar.value){
  const body: IparamsCar  = {
    name: nameCar.value,
    color: colorCar.value
  };
  const result = await createCar(body);
  if(result){
    addCarsList(result.id, result);
  }}
  else{
    throw new Error('Field "name" is empty');
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

export function unlockUpdateCar(){
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

export function openPageCar(){
  const navigation = document.querySelector('.to-winners') as HTMLInputElement;
    if(navigation.classList.contains('button-navigation__active')){
      navigation.classList.remove('button-navigation__active');
    }
  const toGarage = document.querySelector('.to-garage') as HTMLInputElement;
  if(!toGarage.classList.contains('button-navigation__active')){
    toGarage.classList.add('button-navigation__active');
  }
  const sectionGarage = document.querySelector('.garage') as HTMLInputElement;
  if(sectionGarage.style.display === 'none'){
    sectionGarage.style.display = 'block';
  }
  const sectionWinners = document.querySelector('.winners') as HTMLInputElement;
  if(sectionWinners.style.display === 'block'){
    sectionWinners.style.display = 'none';
  }
}

export async function changePageNumber(event: Event) {
  const elmentPage = (document.querySelector('.number-page') as HTMLElement);
  let numberPage = elmentPage.innerHTML;
  let next = document.querySelector('.next') as HTMLInputElement;
  let prev = document.querySelector('.prev') as HTMLInputElement;
  const countCars = await getCountCars();
  const maxPage = Math.ceil(countCars/7);
  if(countCars>7) {
    if((event.target as HTMLElement).classList.contains('next') && Number(numberPage) < maxPage){
      numberPage = `${Number(numberPage)+1}`;
      if(Number(numberPage) === maxPage){
        next.disabled = true;
      }
      prev.disabled = false;
    }
    if((event.target as HTMLElement).classList.contains('prev') && Number(numberPage) > 1){
      numberPage = `${Number(numberPage)-1}`;
      if(Number(numberPage) === 1){
        prev.disabled = true;
      }
      next.disabled = false;
    }
    elmentPage.innerHTML =numberPage;
    const params ={
      _page: numberPage,
      _limit: '7'
    }
    changeListPage(params);
  }
}

export async function generateCars(){
  const arrayCars = ['AUDI', 'BENTLEY', 'BMW', 'CITROEN', 'FERRARI', 'FORD', 'LAMBORGHINI', 'NISSAN', 'MITSUBISHI', 'LEXUS'];
  const arrayModels = ['100', 'Defender', '5', 'М5', 'Arnage', 'Cygnet', 'Arcadia', 'Leading', 'MPV', 'Florida'];
  for(let i =0;i<100;i++){
    const randomNumberOne = Math.floor(Math.random()*11);
    const randomNumberTwo = Math.floor(Math.random()*11);
    const randomColor = `#${(Math.random().toString(16) + '000000').substring(2,8).toUpperCase()}`;
    const randomName = `${arrayCars[randomNumberOne]} ${arrayModels[randomNumberTwo]}`;
    const body: IparamsCar  = {
      name: randomName,
      color: randomColor
    };
    const result = await createCar(body);
    if(result){
      addCarsList(result.id, result);
    }
  }
}