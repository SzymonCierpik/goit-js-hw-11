import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=34988834-b35392638b98e8c3c34637c92&q=${encodeURIComponent(
    query
  )}&lang=pl&image_type=photo&orientation=horizontal&safesearch=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      displayImages(data.hits);
    }
  } catch (error) {
    console.error('Error:', error);
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again later.'
    );
  }
}

const searchBox = document.querySelector('#search-form');

function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  images.forEach(image => {
    const img = document.createElement('img');
    img.setAttribute('src', image.webformatURL);
    img.setAttribute('alt', image.tags);
    img.setAttribute('data-source', image.largeImageURL);
  });
}
