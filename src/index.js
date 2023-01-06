import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { makeListElemet, makeInfoElement } from './helpers';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const listElement = document.querySelector('.country-list');
const infoElement = document.querySelector('.country-info');

inputField.addEventListener('input', debounce((e) => {
    const { value } = e.target;

    if (value.trim() === '') {
        setInnerHTMLs();

        return;
    }

    fetchCountries(value)
        .then(data => renderSearch(data))
        .catch(({ code, message }) => {
            if (code === 404) {
                setInnerHTMLs();
                Notify.failure(message);
            }
        })
}, DEBOUNCE_DELAY));

function renderSearch(countries) {
    if (countries.length > 10) {
        setInnerHTMLs();
        Notify.info('Too many matches found. Please enter a more specific name.');

        return;
    }

    if (countries.length > 1) {
        setInnerHTMLs({ list: makeListElemet(countries) });

        return;
    }

    setInnerHTMLs({ info: makeInfoElement(countries[0]) });
}

function setInnerHTMLs({ list = '', info = '' } = {}) {
    // just sets empty HTML if no parameters passed in
    listElement.innerHTML = list;
    infoElement.innerHTML = info;
}
