import './style.scss';
import { getCars, getCountCars } from './components/ui/uiBasic';
import { createPageGarage } from './components/garage/garage';

const body = document.body;
const logoContainer = document.createElement('header');
logoContainer.className = 'container-logo';
body.append(logoContainer);
const logo = document.createElement('img');
logo.className = 'logo';
logo.src = `./assets/img/logo.png`;
logo.alt = 'Logo Race';
logoContainer.append(logo);
const navContainer = document.createElement('nav');
navContainer.className = 'container-nav';
body.append(navContainer);
const navbar = document.createElement('ul');
navbar.className = 'navbar';
navContainer.append(navbar);
const navbarLiOne = document.createElement('li');
navbarLiOne.className = 'navbar__item';
navbar.append(navbarLiOne);
const buttonGarage = document.createElement('button');
buttonGarage.className = 'button-navigation to-garage button-navigation__active';
buttonGarage.innerHTML = 'to garage';
navbarLiOne.append(buttonGarage);
const navbarLiTwo = document.createElement('li');
navbarLiTwo.className = 'navbar__item';
navbar.append(navbarLiTwo);
const buttonWinners = document.createElement('button');
buttonWinners.className = 'button-navigation to-winners';
buttonWinners.innerHTML = 'to winners';
navbarLiTwo.append(buttonWinners);
const main = document.createElement('main');
main.className = 'main';
body.append(main);

const garage = document.createElement('section');
garage.className = 'garage';
main.append(garage);







const footer = document.createElement('footer');
footer.className = 'footer';
body.append(footer);
const footerContainerOne = document.createElement('div');
footerContainerOne.className = 'footer__container';
footer.append(footerContainerOne);
const years = document.createElement('span');
years.className = 'years';
years.innerHTML = '@2022';
footerContainerOne.append(years);
const gitLink = document.createElement('a');
gitLink.className = 'git-link';
gitLink.href = 'https://github.com/RigelTLT';
gitLink.innerHTML = ' Github';
footerContainerOne.append(gitLink);
const footerContainerTwo = document.createElement('div');
footerContainerTwo.className = 'footer__container';
footer.append(footerContainerTwo);
const rsLink = document.createElement('a');
rsLink.className = 'rs-link';
rsLink.href = 'https://rs.school/js/';
footerContainerTwo.append(rsLink);
const rsImg = document.createElement('img');
rsImg.className = 'rs-img';
rsImg.src = 'https://rs.school/images/rs_school_js.svg';
rsImg.alt = 'Rolling Scopes School';
rsLink.append(rsImg);

(async () => {
  console.log(await getCountCars())
})();

createPageGarage();