export function fetchNames(name) {
  return fetch(
    `https://pixabay.com/api/?key=34988834-b35392638b98e8c3c34637c92&q=${name}&lang=pl&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
