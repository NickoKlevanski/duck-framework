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
    ${Button()} ${window.dataStore.currentFilm}
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

function Button() {
  return `Button`;
}

function FilmListResult() {
  return `<ul>
   <li>Film</li>
  </ul>`;
}
