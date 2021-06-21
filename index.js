import { data } from './mockup-data';
import './style.scss';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentFilm: '',
};

window.renderApp = renderApp;

renderApp();

function renderApp() {
  document.getElementById('app-root').innerHTML = `${App()}`;
}

function App() {
  return `<div>
    ${SearchByFilm()}
    <br/>
    ${FilmListResult()}
  </div>`;
}

function SearchByFilm() {
  return `<input 
    type="text"
    value="${window.dataStore.currentFilm}"
    onchange="window.dataStore.currentFilm = this.value; renderApp();"/>`;
}

function FilmListResult() {
  const { currentFilm } = window.dataStore;
  const regex = new RegExp(currentFilm, 'i');
  const films = data.results.filter(film => {
    if (currentFilm) {
      return film.original_title.match(regex);
    }
  });
  let content = '';
  if (films.length) {
    content += '<h3>Lists of films</h3>';
    content += `<ul class="list">${films
      .map(
        ({ original_title, release_date }) =>
          `<li class="item">${original_title}<br/>${release_date}</li>`,
      )
      .join('')}</ul>`;
  }
  return content ? `<div>${content}</div>` : `<h3>Type film's title, please</h3>`;
}
