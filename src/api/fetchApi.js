import axios from 'axios';
export let page = 1;
export let query = null;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31043005-c343c849c0779aac8ee4cbc3d';
const params = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

export async function getPictures(searchQuery) {
  if (searchQuery !== query) {
    page = 1;
    query = searchQuery;
  }
  try {
    const response = await axios.get(
      `${BASE_URL}${params}&q=${query}&page=${page}`
    );
    page += 1;
    return response.data;
  } catch (error) {
    throw new Error(error)
  }
}