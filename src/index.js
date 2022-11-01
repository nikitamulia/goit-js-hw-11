import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const countryListRef = document.querySelector(".country-list");
const countryInfoRef = document.querySelector(".country-info")

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e){
    let name = e.target.value.trim();
    clearInfo();
    if(name !== ''){
        fetchCountries(name).then(countries => {
            if(countries.length > 10){
                clearInfo();
                Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
                return;
            }
            else if(countries.length >= 2 && countries.length < 10){
                createListMarkup(countries)
            }
            else if(countries.length === 1){
                createInfoMarkup(countries)
            }
        })
        .catch(onError);

    }
}

function createListMarkup(countries){
    const markup = countries
     .map(({ flags, name }) => {
         return `
         <li class = 'list-info'>
             <img src="${flags.svg}" alt="${name.official}" width = '30'>
             <p>${name.official}</p>
         </li>
         `
     })
     .join('');
    countryListRef.innerHTML = markup;
 }

 export function createInfoMarkup(countries) {
    const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
        return `
        <div>
            <img src="${flags.svg}" alt="flags" width = '50'>
            <b>${name.official}</b>
        </div>
        <div>
            <p><b>Capital:</b>${capital}</p>
            <p><b>Population:</b>${population}</p>
            <p><b>Languages:</b>${Object.values(languages)}</p>
        </div>
        `
    })
    .join('');
    countryInfoRef.innerHTML = markup;
}


function clearInfo() {
    countryInfoRef.innerHTML = '';
    countryListRef.innerHTML = '';
  }

function onError(){
    clearInfo();
    Notiflix.Notify.warning("Oops, there is no country with that name")
}



