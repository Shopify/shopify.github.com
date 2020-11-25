import Shuffle from 'shufflejs';

const textinputEl = document.getElementById('textfilter');
const langselectEl = document.getElementById('langtype-select');
const sortselectEl = document.getElementById('sort-select');
const projectsEl = document.getElementById('sortable-projects')
const shuffle = new Shuffle(projectsEl, {itemSelector: '.sortable-project'});

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
  shuffle.sort({
    reverse: true,
    by: (element) => parseInt(element.getAttribute(`data-${sortable}`))
  });
});

export default {}
