import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div>
        <ul class="info">
          <li class="info-item"><h4>Likes:</h4><p>${likes}</p></li>
          <li class="info-item"><h4>Views:</h4><p>${views}</p></li>
          <li class="info-item"><h4>Comments:</h4><p>${comments}</p></li>
          <li class="info-item"><h4>Downloads:</h4><p>${downloads}</p></li>
        </ul>
      </div>
    </li>
  `
    )
    .join('');
    
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

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