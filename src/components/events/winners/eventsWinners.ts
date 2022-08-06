import { getWinner, createWinner, updateWinner, getCountWinners } from '../../api/apiWinner';
import {refreshWinnerList} from '../../events/winners/refreshWinnersList';

export function openPageWinners(){
  const navigation = document.querySelector('.to-garage') as HTMLInputElement;
    if(navigation.classList.contains('button-navigation__active')){
      navigation.classList.remove('button-navigation__active');
    }
  const toWinners = document.querySelector('.to-winners ') as HTMLInputElement;
  if(!toWinners.classList.contains('button-navigation__active')){
    toWinners.classList.add('button-navigation__active');
  }
  const sectionWinners = document.querySelector('.winners') as HTMLInputElement;
  if(sectionWinners.style.display === 'none'){
    sectionWinners.style.display = 'block';
  }
  const sectionGarage = document.querySelector('.garage') as HTMLInputElement;
  if(sectionGarage.style.display === 'block'){
    sectionGarage.style.display = 'none';
  }
}

export async function addWinnerTable(id: number, time: number){
  const checkId = await getWinner(id);
  if(Object.keys(checkId).length !== 0){
    const body = {wins: (Number(checkId.wins)+1), time: (checkId.time<time?checkId.time:time)};
    await updateWinner(id, body);
  }else{
    const body = {id: id, wins: 1, time: time}
    await createWinner(body);
  }
}

export async function changePageNumberWinners(event: Event) {
  const elmentPage = (document.querySelector('.number-page__winners') as HTMLElement);
  let numberPage = elmentPage.innerHTML;
  let next = document.querySelector('.next__winers') as HTMLInputElement;
  let prev = document.querySelector('.prev__winers') as HTMLInputElement;
  const countCars = await getCountWinners();
  const maxPage = Math.ceil(countCars/10);
  if(countCars>10) {
    if((event.target as HTMLElement).classList.contains('next__winers') && Number(numberPage) < maxPage){
      numberPage = `${Number(numberPage)+1}`;
      
      if(Number(numberPage) === maxPage){
        next.disabled = true;
      }
      prev.disabled = false;
    }
    if((event.target as HTMLElement).classList.contains('prev__winers') && Number(numberPage) > 1){
      numberPage = `${Number(numberPage)-1}`;
      if(Number(numberPage) === 1){
        prev.disabled = true;
      }
      next.disabled = false;
    }
    elmentPage.innerHTML = numberPage;
    refreshWinnerList();
  }
}