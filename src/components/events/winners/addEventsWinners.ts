import { openPageWinners } from "./eventsWinners";
import {changePageNumberWinners} from '../../events/winners/eventsWinners';

export function eventOpenWinnersCar(){
  const event = document.querySelector('.to-winners') as HTMLInputElement;
  event.addEventListener('click', openPageWinners);
}
export function eventChangePageWinners(){
  const event = document.querySelectorAll('.button-list-winners');
  event.forEach((el)=>{
el.addEventListener('click', changePageNumberWinners);
  })
}