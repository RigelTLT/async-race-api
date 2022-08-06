import { IparamsSortWinners, IWinner, ICarBase} from '../../interface/interface';
import { getCountWinners, getWinners } from '../../api/apiWinner';
import { getCar } from '../../api/apiGarage';

async function refreshCountAndPage(){
  const countCars = await getCountWinners();
  const title = document.querySelector('.title-winners') as HTMLInputElement;
    title.innerHTML = `${countCars} winning cars`;
    const nextPage = document.querySelector('.next__winers') as HTMLInputElement;
    const elmentPage = (document.querySelector('.number-page__winners') as HTMLElement);
    let numberPage = Number(elmentPage.innerHTML);
    const maxPage = Math.ceil(countCars/10);
  if(countCars > 10){
    if(nextPage.disabled === true && numberPage<maxPage){
      nextPage.disabled = false;
    }
  }else{
    if(nextPage.disabled === false){
      nextPage.disabled = true;
    }
  }
}
async function addWinnerList(winner: IWinner, carProperty: ICarBase){
  const table = document.querySelector('.table-winners') as HTMLElement;
  const trHeader = document.createElement('tr');
    trHeader.className = 'tr-winner';
    table.append(trHeader);
    const idColumn = document.createElement('td');
    idColumn.className = 'td-cell id-cell';
    idColumn.innerHTML = `${winner.id}`;
    trHeader.append(idColumn);
    const carColumn = document.createElement('td');
    carColumn.className = 'td-cell car-cell';
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    car = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgElem.classList.add("svg-car__wins");
    car.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/svg/car-wins.svg#Capa_1');
    car.style.fill = `${carProperty.color}`;
    car.setAttribute('data-id', `${winner.id}`);
    svgElem.append(car);
    carColumn.append(svgElem);
    trHeader.append(carColumn);
    const nameColumn = document.createElement('td');
    nameColumn.className = 'td-cell name-cell';
    nameColumn.innerHTML = carProperty.name;
    trHeader.append(nameColumn);
    const winsColumn = document.createElement('td');
    winsColumn.className = 'td-cell wins-cell';
    winsColumn.innerHTML = `${winner.wins}`;
    trHeader.append(winsColumn);
    const timeColumn = document.createElement('td');
    timeColumn.className = 'td-cell time-cell';
    timeColumn.innerHTML = `${winner.time}`;
    trHeader.append(timeColumn);
}
export async function changehWinnersListPage(data: IparamsSortWinners){
  const winners = await getWinners(data);
  const listPageCar = document.querySelectorAll('.tr-winner');
  let listLength = 0;
  winners.length-1<listPageCar.length-1?listLength = winners.length:listLength = listPageCar.length;
  for(let i = 0; i < listLength; i++) {
    const id = listPageCar[i].querySelector('.id-cell') as HTMLElement;
    const colorCar = (listPageCar[i].querySelector('.svg-car__wins') as HTMLElement).firstChild as HTMLElement;
    const name = listPageCar[i].querySelector('.name-cell') as HTMLElement;
    const wins = listPageCar[i].querySelector('.wins-cell') as HTMLElement;
    const time = listPageCar[i].querySelector('.time-cell') as HTMLElement;
    const cars = await getCar(winners[i].id);
    id.innerHTML = winners[i].id;
    name.innerHTML = cars.name;
    colorCar.style.fill = cars.color;
    wins.innerHTML = winners[i].wins;
    time.innerHTML = winners[i].time;
  }
  if(winners.length-1<listPageCar.length-1) {
    for(let i = winners.length; i<listPageCar.length; i++){
      (listPageCar[i] as HTMLElement).remove();
    }
  }
  if(winners.length-1>listPageCar.length-1) {
    for(let i = listPageCar.length; i<winners.length; i++){
      const cars = await getCar(winners[i].id);
      await addWinnerList(winners[i], cars);
    }
  }
}

export function collectingTableInformation(){
  const winsFilter = document.querySelector('.wins-column') as HTMLElement;
  const timeFilter = document.querySelector('.time-column') as HTMLElement;
  const _page = (document.querySelector('.number-page__winners') as HTMLElement).innerHTML;
  let _sort = 'id';
  let _order = 'ASC';
  if(winsFilter.innerHTML === 'Wins ↓'){
  _sort = 'wins';
  _order = 'ASC';
  }
  else if(winsFilter.innerHTML === 'Wins ↑'){
    _sort = 'wins';
    _order = 'DESC';
  }
  if(timeFilter.innerHTML === 'Time ↓'){
  _sort = 'time';
  _order = 'ASC';
  }
  else if(timeFilter.innerHTML === 'Time ↑'){
    _sort = 'time';
    _order = 'DESC';
  }
  const data = {_page: _page, _limit: '10', _sort: _sort, _order: _order}
  return data;
}

export async function refreshWinnerList(){
  await refreshCountAndPage();
  const data = collectingTableInformation();
  await changehWinnersListPage(data);
}