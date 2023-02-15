import './css/styles.css';
var debounce = require('lodash.debounce');
import SearchCountry from './fetchCountries';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchCountry = new SearchCountry();

const inputCountry = document.getElementById('search-box');
const markupContainer = document.querySelector('div');

inputCountry.addEventListener('input', debounce(fetchCountry, DEBOUNCE_DELAY));

function fetchCountry(e) {
  e.preventDefault();
  markupContainer.innerHTML = '';
  if (e.target.value.trim() === '') {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  searchCountry.country = e.target.value.trim();
  searchCountry
    .findCountries()
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return (markupContainer.innerHTML = '');
      } else if (data.length >= 2 && data.length <= 10) {
        return data.reduce(
          (acc, country) => createCountryShortCard(country) + acc,
          ''
        );
      } else if (data.length === 1) {
        return data.reduce(
          (acc, country) => createCountryBigCard(country) + acc,
          ''
        );
      }
    })
    .then(markup => createCountryCardMarkup(markup));
}

function createCountryShortCard({ flags, name }) {
  const flag = flags.svg;
  const officialName = name.official;
  return `
    <div class="short-card-container" style="display: flex; gap:20px; align-items:center">
    <img width=50 height=36 src=${flag} class="short-country-flag">
    <h2 class="short-country-title">${officialName}</h2>
    </div>`;
}

function createCountryBigCard({ flags, name, capital, population, languages }) {
  const language = Object.values(languages).join(', ');
  return `
    ${createCountryShortCard({ flags, name })}
    <p class="country-capital"><b>Capital:</b> ${capital}</p>
    <p class="country-population"><b>Population: </b>${population}</p>
    <p class ="languages"><b>Languages:</b> ${language}</p></div>`;
}

function createCountryCardMarkup(markup) {
  markupContainer.innerHTML = markup;
}

// const container = document.querySelector('.short-card-container');
