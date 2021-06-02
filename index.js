if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentFilm: '',
};

document.getElementById('app-root').innerHTML = App();

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
    onchange="window.dataStore.currentFilm = this.value"/>`;
}

function FilmListResult() {
  return `FilmListResult`;
}
