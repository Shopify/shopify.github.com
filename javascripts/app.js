import Shuffle from './shuffle';

const textinputEl = document.getElementById('textfilter');
const langselectEl = document.getElementById('langtype-select');
const sortselectEl = document.getElementById('sort-select');
const projectsEl = document.getElementById('sortable-projects')
<<<<<<< Updated upstream
const shuffle = new Shuffle(projectsEl, {itemSelector: '.sortable-project', sizer: sizer});
=======
const shuffle = new Shuffle(projectsEl, '.sortable-project');
>>>>>>> Stashed changes

textinputEl.addEventListener('keyup', (event) => {
  var searchText = event.target.value.toLowerCase();
  shuffle.filter((element) => {
    var index = element.getAttribute('data-search').toLowerCase().trim();
    return index.indexOf(searchText) !== -1;
  });
});

langselectEl.addEventListener('change', (event) => {
  const lang = event.target.value;
  shuffle.filter((element) => (lang == "" || element.getAttribute('data-language') == lang));
});

sortselectEl.addEventListener('change', (event) => {
  const sortable = event.target.value || "stars";
  shuffle.sort((elA, elB) => {
    const orderA = parseInt(elA.getAttribute(`data-${sortable}`))
    const orderB = parseInt(elB.getAttribute(`data-${sortable}`))
    return orderA > orderB
  });
});

export default {}
