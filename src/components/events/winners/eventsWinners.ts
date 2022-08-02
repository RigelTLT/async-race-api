
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