import { data } from './mockup-data';
import { getDataFromAPI } from './utils.js';
import './style.scss';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentFilm: '',
  films: [],
  isDataLoading: false,
  error: null,
  cacheFilms: [],
};

window.validateAndLoadData = validateAndLoadData;
function validateAndLoadData(filmName) {
  const url = getDataFromAPI(filmName);
  return fetch(url)
    .then(resp => resp.json())
    .then(data => data);
}

window.performSearch = performSearch;
function performSearch(film) {
  window.dataStore.currentFilm = film;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  window
    .validateAndLoadData(film)
    .then(({ data, error }) => {
      window.dataStore.isDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.cacheFilms = data;
      }
    })
    .catch(() => {
      window.dataStore.error = 'Some error occurred';
    })
    .finally(() => {
      renderApp();
      handleClick();
    });
}

window.handleClick = handleClick;
function handleClick() {
  const list = document.querySelectorAll('li');
  for (let item of list) {
    item.addEventListener('click', createModal);
  }
}

function createModal(e) {
  const filmId = Number(e.target.id);
  const filmObj = window.dataStore.cacheFilms.results.find(elem => elem.id === filmId);
  const body = document.querySelector('body');
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop', 'js-fade');
  body.append(backdrop);

  backdrop.classList.add('js-show');

  const div = document.createElement('div');
  div.classList.add('modal');
  const block = /*html*/ `
    <div class="modal__wrapper">
      <div>${filmObj.title}</div>
      <div>
        <button
        type="button"
        onclick="closeModal();"
        >
          Close
        </button>
      </div>
    </div>
  `;
  div.innerHTML = block;
  body.append(div);
}

window.closeModal = closeModal;

function closeModal() {
  const modal = document.querySelector('.modal');
  const backdrop = document.querySelector('.backdrop');
  modal.remove();
  backdrop.remove();
}

renderApp();

window.renderApp = renderApp;
function renderApp() {
  document.getElementById('app-root').innerHTML = `${App()}`;
}

function App() {
  return `<div>
    ${SearchByFilm()}
    <br/>
    ${FilmListResult(handleClick)}
  </div>`;
}

function SearchByFilm() {
  return /*html*/ `<input 
    type="text"
    value="${window.dataStore.currentFilm}"
    onchange="window.performSearch(this.value)"/>`;
}

function FilmListResult(handleClickFn) {
  const films = window.dataStore.cacheFilms.results || window.dataStore.cacheFilms;
  let content = '';
  if (films.length) {
    content += '<h3>Lists of films</h3>';
    content += `<ul class="list">${films
      .map(
        ({ original_title, release_date, id }) =>
          `<li class="item" id="${id}"
          >
            ${original_title}
            <br/>
            ${release_date}
          </li>`,
      )
      .join('')}</ul>`;
  }
  return content ? `<div>${content}</div>` : `<h3>Type film's title, please</h3>`;
}
