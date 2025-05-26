import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50342866-da1b32c712fb25d761b3cb22e';

export function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15
    };
    
    return axios.get(BASE_URL, { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching images:', error);
            throw error;
        });
}
