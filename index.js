import { data } from './mockup-data';
import './style.scss';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentFilm: '',
  films: [],
};

window.renderApp = renderApp;
window.handleClick = handleClick;
window.closeModal = closeModal;

function handleClick() {
  const list = document.querySelectorAll('li');
  for (let item of list) {
    item.addEventListener('click', createModal);
  }
}

function createModal(e) {
  const filmId = Number(e.target.id);
  const filmObj = window.dataStore.films.find(elem => elem.id === filmId);
  const body = document.querySelector('body');
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop', 'js-fade');
  body.append(backdrop);

  backdrop.classList.add('js-show');

  const div = document.createElement('div');
  div.classList.add('modal');
  const block = `
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
  // console.log(div);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  const backdrop = document.querySelector('.backdrop');
  modal.remove();
  backdrop.remove();
}

renderApp();

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
  return `<input 
    type="text"
    value="${window.dataStore.currentFilm}"
    onchange="window.dataStore.currentFilm = this.value; renderApp(); handleClick();"/>`;
}

function FilmListResult(handleClickFn) {
  const { currentFilm } = window.dataStore;
  const regex = new RegExp(currentFilm, 'i');
  const films = data.results.filter(film => {
    if (currentFilm) {
      return film.original_title.match(regex);
    }
  });
  window.dataStore.films = films;
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
