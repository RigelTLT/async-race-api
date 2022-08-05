import { getWinners, getCountWinners } from '../../api/apiWinner';
import { getCar } from '../../api/apiGarage';
import { IparamsSortWinners } from '../../interface/interface';

export async function titleWinners(): Promise<void> {
  const CountWinners = await getCountWinners();
  const winners = document.querySelector('.winners') as HTMLElement;
  const containerListWinners = document.createElement('div');
  containerListWinners.className = 'container-Winners-list';
  winners.append(containerListWinners);
  const titleWinners = document.createElement('h1');
  titleWinners.className = 'title-winners';
  titleWinners.innerHTML = `${CountWinners} winning cars`;
  containerListWinners.append(titleWinners);
  const pageTitleWinners = document.createElement('span');
  pageTitleWinners.className = 'Winners-list__page';
  pageTitleWinners.innerHTML = `Page #`;
  containerListWinners.append(pageTitleWinners);
  const pageWinners = document.createElement('span');
  pageWinners.className = 'Winners-list__page number-page__winners';
  pageWinners.innerHTML = `1`;
  containerListWinners.append(pageWinners);
  const ListPage = document.createElement('div');
  ListPage.className = 'container-list-winners__page';
  containerListWinners.append(ListPage);
  const prevListPage = document.createElement('button');
  prevListPage.className = 'button-list prev__winers';
  prevListPage.innerHTML = 'Prev';
  prevListPage.value = 'Prev';
  prevListPage.disabled = true;
  ListPage.append(prevListPage);
  const nextListPage = document.createElement('button');
  nextListPage.className = 'button-list next__winers';
  nextListPage.innerHTML = 'Next';
  nextListPage.value = 'Next';
  if(CountWinners < 10){
  nextListPage.disabled = true;
  }
  ListPage.append(nextListPage);
  listHeadersWinners();
}
export  function listHeadersWinners() {
  const winners = document.querySelector('.winners') as HTMLElement;
  const table = document.createElement('table');
  table.className = 'table-winners';
  winners.append(table);
  const trHeader = document.createElement('tr');
  trHeader.className = 'tr-header';
  table.append(trHeader);
  const idColumn = document.createElement('th');
  idColumn.className = 'th-header id-column';
  idColumn.innerHTML = 'ID';
  trHeader.append(idColumn);
  const carColumn = document.createElement('th');
  carColumn.className = 'th-header car-column';
  carColumn.innerHTML = 'Color';
  trHeader.append(carColumn);
  const nameColumn = document.createElement('th');
  nameColumn.className = 'th-header name-column';
  nameColumn.innerHTML = 'Name';
  trHeader.append(nameColumn);
  const winsColumn = document.createElement('th');
  winsColumn.className = 'th-header wins-column';
  winsColumn.innerHTML = 'Wins';
  trHeader.append(winsColumn);
  const timeColumn = document.createElement('th');
  timeColumn.className = 'th-header time-column';
  timeColumn.innerHTML = 'Time';
  trHeader.append(timeColumn);
  
}
export async function listWinners(data?: IparamsSortWinners): Promise<void> {
  let body = {} as IparamsSortWinners;
  !data? body = {_page: '1', _limit: '10', _sort: 'id', _order: 'ASC'}:body = data;
  const winners = await getWinners(body);
  const table = document.querySelector('.table-winners') as HTMLElement;
  for(let i=0; i<winners.length; i++) {
    const carProperty = await getCar(winners[i].id);
    const trHeader = document.createElement('tr');
    trHeader.className = 'tr-winner';
    table.append(trHeader);
    const idColumn = document.createElement('td');
    idColumn.className = 'td-cell id-cell';
    idColumn.innerHTML = winners[i].id;
    trHeader.append(idColumn);
    const carColumn = document.createElement('td');
    carColumn.className = 'td-cell car-cell';
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    car = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgElem.classList.add("svg-car__wins");
    car.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/svg/car-wins.svg#Capa_1');
    car.style.fill = `${carProperty.color}`;
    car.setAttribute('data-id', `${winners[i].id}`);
    svgElem.append(car);
    carColumn.append(svgElem);
    trHeader.append(carColumn);
    const nameColumn = document.createElement('td');
    nameColumn.className = 'td-cell name-cell';
    nameColumn.innerHTML = carProperty.name;
    trHeader.append(nameColumn);
    const winsColumn = document.createElement('td');
    winsColumn.className = 'td-cell wins-cell';
    winsColumn.innerHTML = winners[i].wins;
    trHeader.append(winsColumn);
    const timeColumn = document.createElement('td');
    timeColumn.className = 'td-cell time-cell';
    timeColumn.innerHTML = winners[i].time;
    trHeader.append(timeColumn);
  }
}
export function createPageWinners(){
  titleWinners();
  listWinners();
}