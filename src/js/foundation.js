import photoTpl from '../templates/photos.hbs';
import ApiService from './apiService';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('[id="search-form"]'),
  photoContainer: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiServise = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(event) {
  event.preventDefault();

  apiServise.query = event.currentTarget.elements.query.value;

  loadMoreBtn.show();
  apiServise.resetPage();
  clearPhotoContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  apiServise.fetchPhotoGallery().then(hits => {
    appendGalleryMarcup(hits);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarcup(hits) {
  refs.photoContainer.insertAdjacentHTML('beforeend', photoTpl(hits));
}

function clearPhotoContainer() {
  refs.photoContainer.innerHTML = '';
}