import './css/styles.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = event.target.searchQuery.value;
  gallery.innerHTML = '';

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=34988834-b35392638b98e8c3c34637c92&q=${encodeURIComponent(
        searchQuery
      )}&lang=pl&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    const { data } = response;
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      data.hits.forEach(hit => {
        const card = document.createElement('a');
        card.href = hit.webformatURL;
        card.classList.add('photo-card');
        const img = document.createElement('img');
        img.src = hit.webformatURL;
        img.alt = hit.tags;
        img.loading = 'lazy';
        const info = document.createElement('div');
        info.classList.add('info');
        const likes = document.createElement('p');
        likes.classList.add('info-item');
        likes.innerHTML = `<b>Likes:</b><br>${hit.likes}</br>`;
        const views = document.createElement('p');
        views.classList.add('info-item');
        views.innerHTML = `<b>Views:</b><br>${hit.views}</br>`;
        const comments = document.createElement('p');
        comments.classList.add('info-item');
        comments.innerHTML = `<b>Comments:</b><br>${hit.comments}</br>`;
        const downloads = document.createElement('p');
        downloads.classList.add('info-item');
        downloads.innerHTML = `<b>Downloads:</b><br>${hit.downloads}</br>`;
        info.appendChild(likes);
        info.appendChild(views);
        info.appendChild(comments);
        info.appendChild(downloads);
        card.appendChild(img);
        card.appendChild(info);
        gallery.appendChild(card);
        onePicture.refresh();
      });
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong. Please try again later.'
    );
  }
});

const onePicture = new SimpleLightbox('.gallery a');
