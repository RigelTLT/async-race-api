import { openPageWinners } from "./eventsWinners";

export function eventOpenWinnersCar(){
  const event = document.querySelector('.to-winners') as HTMLInputElement;
  event.addEventListener('click', openPageWinners);
}