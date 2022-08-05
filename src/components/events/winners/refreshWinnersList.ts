import { IparamsSortWinners } from '../../interface/interface';
import { getCountWinners } from '../../api/apiWinner';
import {listWinners} from '../../ui/winners/winners'

async function refreshCountAndPage(){
  const countCars = await getCountWinners();
  const title = document.querySelector('.title-winners') as HTMLInputElement;
    title.innerHTML = `${countCars} winning cars`;
    const nextPage = document.querySelector('.next__winers') as HTMLInputElement;
  if(countCars > 10){
    if(nextPage.disabled === true){
      nextPage.disabled = false;
    }
  }else{
    if(nextPage.disabled === false){
      nextPage.disabled = true;
    }
  }
}
export async function refreshWinnerList(){
  await refreshCountAndPage();
  const listPageCar = document.querySelectorAll('.tr-winner');
  const winsFilter = document.querySelector('.wins-column') as HTMLElement;
  const timeFilter = document.querySelector('.time-column') as HTMLElement;
  const _page = (document.querySelector('.number-page__winners') as HTMLElement).innerHTML;
  let _sort = 'id';
  let _order = 'ASC';
  if(winsFilter.innerHTML === 'Wins ↑'){
  _sort = 'wins';
  _order = 'ASC';
  }
  else if(winsFilter.innerHTML === 'Wins ↓'){
    _sort = 'wins';
    _order = 'DESC';
  }
  if(timeFilter.innerHTML === 'Time ↑'){
  _sort = 'time';
  _order = 'ASC';
  }
  else if(timeFilter.innerHTML === 'Time ↓'){
    _sort = 'time';
    _order = 'DESC';
  }
  listPageCar.forEach(el => {
    el.remove();
  });
  const data = {_page: _page, _limit: '10', _sort: _sort, _order: _order}
  await listWinners(data);
}