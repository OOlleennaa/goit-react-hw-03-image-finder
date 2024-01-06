import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '38417070-f95938a425bab398a492a74ff';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages  = async (query, page) => {
  const separated = query.split('/');
  const exstractedQuery = separated[1];
  try {
    const response = await axios.get('',
    
     {
      params: {
        key: API_KEY,
        q: exstractedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.log(error);
    throw error;
  }
};