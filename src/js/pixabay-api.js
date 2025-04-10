import axios from 'axios';
const API_KEY = '49700975-4dc06388df5f2ad47df406614';

export async function getImagesByQuery(query) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
