
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
let hitsPerPage = 0;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}


function onSearch(evt) {
  evt.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }
  currentQuery = query;
  page = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreButton();
  fetchImages();
}

function onLoadMore() {
  page += 1;
  fetchImages(true);
}
async function fetchImages(isLoadMore = false) {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const { hits, totalHits: total } = data;
    totalHits = total;
    hitsPerPage = hitsPerPage || hits.length;

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    createGallery(hits);

    const shownImages = page * hitsPerPage;
    if (shownImages < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      if (isLoadMore) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'bottomRight',
        });
      }
    }

    if (isLoadMore) smoothScroll();

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}


function smoothScroll() {
  const firstCard = document.querySelector('.gallery').firstElementChild;
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
