import { openPageWinners, changePageNumberWinners, filterWins, filterTime } from './eventsWinners';


export function eventOpenWinnersCar() {
  const event = document.querySelector('.to-winners') as HTMLInputElement;
  event.addEventListener('click', openPageWinners);
}
export function eventChangePageWinners() {
  const event = document.querySelectorAll('.button-list-winners');
  event.forEach((el)=>{
    el.addEventListener('click', changePageNumberWinners);
  });
}
export function eventfilterWinners() {
  const event = document.querySelector('.wins-column') as HTMLInputElement;
  event.addEventListener('click', filterWins);
}
export function eventfilterTime() {
  const event = document.querySelector('.time-column') as HTMLInputElement;
  event.addEventListener('click', filterTime);
}