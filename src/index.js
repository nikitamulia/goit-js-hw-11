

import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './api/fetchApi';
import { createMarkup } from './api/galleryCard';
const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadRef = document.querySelector('.js-load-btn');
formRef.addEventListener('submit', onSubmit);
loadRef.addEventListener('click', onLoadClick);
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let page = 1;
let searchQuery = '';
async function onSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  page = 1;
  loadRef.classList.add('js-load-btn');
  galleryRef.innerHTML = '';
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter a search query!');
    return;
  }
  try {
    const searchData = await getPictures(searchQuery, page);
    const { hits, totalHits } = searchData;
    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (hits.length > 0) {
      const markup = hits.map(item => createMarkup(item)).join('');
      galleryRef.innerHTML = markup;
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
    if (totalHits > 40) {
      loadRef.classList.remove('js-load-btn');
    }
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}
async function onLoadClick() {
  loadRef.disabled = true;
  loadRef.classList.add('js-load-btn');
  page += 1;
  try {
    const response = await getPictures(searchQuery, page);
    const { hits, totalHits } = response;
    const markup = hits.map(item => createMarkup(item)).join('');
    galleryRef.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    const amountOfPages = totalHits / (40 * page);
    loadRef.disabled = false;
    console.log(amountOfPages);
    if (amountOfPages < 1) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadRef.classList.remove('js-load-btn');
    }
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
}