import {getCountCars, getCars} from '../../api/apiGarage';
import {ICarBase, Iparams} from '../../interface/interface';
import {createControlCarForm, createTraceCar} from '../../ui/garage/createList'
import {resetRace} from '../../events/garage/eventsGarage';

async function replaceCars(idBaseNumber: number){
  const listCars = await getCars();
  const listPageCar = document.querySelectorAll('.garage-list__element');
  const dataIdControls = (listPageCar[idBaseNumber].firstChild as HTMLElement).childNodes;
  const nameCar = listPageCar[idBaseNumber].childNodes[1] as HTMLElement;
  const ColorCar = (listPageCar[idBaseNumber].childNodes[2].firstChild as HTMLElement).firstChild as HTMLElement;
  ColorCar.style.fill = listCars[idBaseNumber].color;
  ColorCar.setAttribute('data-id', `${listCars[idBaseNumber].id}`)
  dataIdControls.forEach((el) => {(el as HTMLElement).setAttribute('data-id', `${listCars[idBaseNumber].id}`);});
  nameCar.innerHTML = listCars[idBaseNumber].name;
  listPageCar[idBaseNumber].setAttribute('data-id', `${listCars[idBaseNumber].id}`);
}
async function refreshCountAndPage(){
  const countCars = await getCountCars();
  const title = document.querySelector('.title') as HTMLInputElement;
    title.innerHTML = `${countCars} cars in the garage`;
    const nextPage = document.querySelector('.next') as HTMLInputElement;
  if(countCars > 7){
    if(nextPage.disabled === true){
      nextPage.disabled = false;
    }
  }else{
    if(nextPage.disabled === false){
      nextPage.disabled = true;
    }
  }
}
export async function addCarsList(id: number, element: ICarBase){
  await refreshCountAndPage();
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
export async function deleteCarsList(id: number, nextNumberListId: number){
  const listCars = await getCars();
  const lastNumberCars = listCars.length - 1;
  await refreshCountAndPage();
  const listPageCar = document.querySelectorAll('.garage-list__element');
  const lastIdListPageCar = listPageCar.length-1;
  const deleteCar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  let idBaseNumber = nextNumberListId;
  let idListDeleteCar = lastIdListPageCar;
  if(idBaseNumber < lastNumberCars) {
    for(let i=0; i<=lastIdListPageCar;i++){
      if(listPageCar[i] === deleteCar){
        idListDeleteCar = i;
    }
    if(i>= idListDeleteCar){
      if(idBaseNumber <=lastNumberCars){
        await replaceCars(idBaseNumber);
      idBaseNumber++;}
      else{
        listPageCar[i].remove();
      }
    }
  }
}else{
  deleteCar.remove();
}
}
export async function updateCarsList(id: number, element: ICarBase){
  const updateCar = document.querySelector(`.garage-list__element[data-id="${id}"]`) as HTMLElement;
  const nameCar = updateCar.childNodes[1] as HTMLElement;
  const ColorCar = (updateCar.childNodes[2].firstChild as HTMLElement).firstChild as HTMLElement;
  ColorCar.style.fill = element.color;
  nameCar.innerHTML = element.name;
  const nameInputCar = document.querySelector('.name-car__update') as HTMLInputElement;
  const colorInputCar = document.querySelector('.color-car__update') as HTMLInputElement;
  const button = document.querySelector('.button-car__update') as HTMLInputElement;
  nameInputCar.disabled = true;
  colorInputCar.disabled = true;
  button.disabled = true;
}


export async function changeListPage(params: Iparams){
  const listCars = await getCars(params);
  const listPageCar = document.querySelectorAll('.garage-list__element');
  let listLength = 0;
  listCars.length-1<listPageCar.length-1?listLength = listCars.length:listLength = listPageCar.length;
  for(let i = 0; i < listLength; i++) {
    const dataIdControls = (listPageCar[i].firstChild as HTMLElement).childNodes;
    const nameCar = listPageCar[i].childNodes[1] as HTMLElement;
    const ColorCar = (listPageCar[i].childNodes[2].firstChild as HTMLElement).firstChild as HTMLElement;
    ColorCar.style.fill = listCars[i].color;
    ColorCar.setAttribute('data-id', `${listCars[i].id}`)
    dataIdControls.forEach((el) => {(el as HTMLElement).setAttribute('data-id', `${listCars[i].id}`);});
    nameCar.innerHTML = listCars[i].name;
    listPageCar[i].setAttribute('data-id', `${listCars[i].id}`);
  }
  if(listCars.length-1<listPageCar.length-1) {
    for(let i = listCars.length; i<listPageCar.length; i++){
      (listPageCar[i] as HTMLElement).remove();
    }
  }
  if(listCars.length-1>listPageCar.length-1) {
    for(let i = listPageCar.length; i<listCars.length; i++){
      await addCarsList(listCars[i].id, listCars[i]);
    }
  }
  const raceСheck = document.querySelector('.reset-race__all') as HTMLInputElement;
  if(!raceСheck.disabled){
    await resetRace();
  }
}