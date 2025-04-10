import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  showLoader,
  hideLoader,
  createGallery,
} from './js/render-functions.js';
import iconError from './img/error.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim().toLowerCase();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      titleColor: '#fff',
      messageColor: '#fff',
      class: 'error-icon',
      iconUrl: iconError,
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching<br/> your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          titleColor: '#fff',
          messageColor: '#fff',
          class: 'error-icon',
          iconUrl: iconError,
        });
        return;
      }

      createGallery(data.hits);
      form.reset();
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        class: 'error-icon',
        iconUrl: iconError,
      });
      console.log('Fetch error:', error);
    })
    .finally(() => {
      hideLoader();
    });
});
