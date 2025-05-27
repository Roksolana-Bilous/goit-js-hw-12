import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50342866-da1b32c712fb25d761b3cb22e';

/**
 * @param {string} query
 * @param {number} page
 * @returns {Promise<Object>}
 */
export async function getImagesByQuery(query, page = 1) {
  try {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;

  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

