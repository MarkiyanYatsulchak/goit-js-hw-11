import { Notify } from 'notiflix/build/notiflix-notify-aio';

function noFindMessage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function galleryEndMessage() {
    Notify.info("We're sorry, but you've reached the end of search results.");
}

function totalImgMessage({totalHits}) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
}

export { noFindMessage, galleryEndMessage, totalImgMessage };