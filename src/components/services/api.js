import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30472544-2e14e66ac2a4601c283b9c0c0';
const REQUEST_PARAM = 'image_type=photo&orientation=horizontal&per_page=12';

export const fetchImagesWithQuery = async (searchQuery, page = 1) => {
  const response = axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&${REQUEST_PARAM}`
  );
  return response;
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
