import { data } from './mockup-data';

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
  const films = data.results.filter(film => film.original_title === currentFilm);
  let content = '';
  if (films) {
    content += 'Lists of films';
    content += films
      .map(({ original_title, release_date }) => `<div>${original_title}<br/>${release_date}</div>`)
      .join('');
  }
  return content ? `<div>${content}</div>` : `<div>Search films</div>`;
}
