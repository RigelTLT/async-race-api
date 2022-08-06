import { getCars, getCountCars, createCar, updateCar, deleteCar, startStopDriveCar } from '../../api/apiGarage';
import { addCarsList, deleteCarsList, updateCarsList, changeListPage } from './refreshGarageList';
import { IparamsCar } from '../../interface/interface';
import { addWinnerTable } from '.././winners/eventsWinners';
import { refreshWinnerList} from '../../events/winners/refreshWinnersList';

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
    const randomNumberOne = Math.floor(Math.random()*10);
    const randomNumberTwo = Math.floor(Math.random()*10);
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

function randomDistance(){
  let distance = Math.floor(Math.random()*80);
  const width = Number((document.querySelector('.garage-list__element') as HTMLElement).offsetWidth);
  const chek = (width/100)*distance - 155;
  if(chek<0){
    distance = randomDistance();
  }
  return distance;
}

export async function startCar(id: number){
  const start = await startStopDriveCar(id,'started');
  const time = start.distance / start.velocity / 2000;
  const updateCar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const startButtonRace = document.querySelector(`.button-start-race[data-id="${id}"]`) as HTMLInputElement;
  startButtonRace.disabled = true;
  const resetButtonRace = document.querySelector(`.button-reset[data-id="${id}"]`) as HTMLInputElement;
  resetButtonRace.disabled = false;
  const valueColorCar = updateCar.childNodes[2].firstChild as HTMLElement;
  valueColorCar.style.transition = `${time}s`;
  try{
    const drive = await startStopDriveCar(id,'drive');
    if(drive){
      valueColorCar.style.marginLeft = 'calc(95% - 155px)';
      return time;
    }
  } catch(err){
    const distance = randomDistance();
    valueColorCar.style.marginLeft = `calc(${distance}% - 155px)`;
  }
}
export async function resetCar(id: number){
  await startStopDriveCar(id,'stopped');
  const updateCar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const startButtonRace = document.querySelector(`.button-start-race[data-id="${id}"]`) as HTMLInputElement;
  startButtonRace.disabled = false;
  const resetButtonRace = document.querySelector(`.button-reset[data-id="${id}"]`) as HTMLInputElement;
  resetButtonRace.disabled = true;
  const valueColorCar = updateCar.childNodes[2].firstChild as HTMLElement;
  valueColorCar.style.transition = `0s`;
    valueColorCar.style.marginLeft = `0`;
}
export async function raceCars(){
  const cars = document.querySelectorAll('.garage-list__element');
  const reset = document.querySelector(`.reset-race__all`) as HTMLInputElement;
  reset.disabled = false;
  const start = document.querySelector(`.start-race__all`) as HTMLInputElement;
  start.disabled = true;
  let idsCar = [] as Array<number>;
  cars.forEach(car => {
    idsCar.push(Number(car.getAttribute('data-id')));
  })
let detailSet = ( await Promise.all(idsCar.map(itemId => startCar(itemId))) as Array<number>).map(el => el==null || el == undefined? el = 99: el);
const winnerTime = Math.min.apply(null, detailSet);
let idWinner = 0;
for (let i = 0; i < detailSet.length; i++){
  if(detailSet[i] === winnerTime){
    idWinner = idsCar[i];
  }
}
announceWinner(idWinner, winnerTime);
}

async function announceWinner(id: number, time: number){
  const fixTime = time.toFixed(2);
  const сar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const nameCar = (сar.childNodes[1] as HTMLElement).innerHTML;
  const container = document.querySelector('.winner') as HTMLElement;
  container.innerHTML = `WINNER ${nameCar} time: ${fixTime}`;
  await addWinnerTable(id, Number(fixTime));
  refreshWinnerList();
}

export async function resetRace(){
  const cars = document.querySelectorAll('.garage-list__element');
  const reset = document.querySelector(`.reset-race__all`) as HTMLInputElement;
  reset.disabled = true;
  const start = document.querySelector(`.start-race__all`) as HTMLInputElement;
  start.disabled = false;
  let idsCar = [] as Array<number>;
  cars.forEach(car => {
    idsCar.push(Number(car.getAttribute('data-id')));
  })
  await Promise.all(idsCar.map(itemId => resetCar(itemId)));
}