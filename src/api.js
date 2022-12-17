import axios from 'axios';

const API_KEY = '30719665-02331968f49df94435bfd7c2d';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (query, page) => {
    const response = await axios.get(`/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
};