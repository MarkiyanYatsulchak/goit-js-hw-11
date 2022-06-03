import './sass/main.scss';
import { noFindMessage, galleryEndMessage, totalImgMessage } from './js/notify-message';
import { ApiSearchService } from './js/api-search-service';
import galleryMarkup from './template/gallery.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgAPI = new ApiSearchService();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtnHidden();

async function onSearch(e) {
  e.preventDefault();

  const currentRequest = e.currentTarget.elements.searchQuery.value.trim();
  loadMoreBtnHidden();
  resetGallery();
  imgAPI.resetPage();
  imgAPI.setSearchParams(currentRequest);

  try {
    const data = await imgAPI.fetchImgs();

    if (data.total === 0) {
      return noFindMessage();
    }

    renderGallery(data);
    loadMoreBtnVisible();
    totalImgMessage(data);
    checkGalleryEndPoint(data);
    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  loadMoreBtnHidden();

  try {
    const data = await imgAPI.fetchImgs();

    renderGallery(data);
    smoothScroll();
    checkGalleryEndPoint(data);
    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }

  loadMoreBtnVisible();
}

function loadMoreBtnHidden() {
  loadMoreBtn.classList.add('visually-hidden');
}

function loadMoreBtnVisible() {
  loadMoreBtn.classList.remove('visually-hidden');
}

function checkGalleryEndPoint(data) {
  if (imgAPI.currentGalleryPoint >= data.totalHits) {
    galleryEndMessage();
    loadMoreBtnHidden();
  }
}

function renderGallery({ hits }) {
  gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
}

function resetGallery() {
  gallery.innerHTML = '';
}
