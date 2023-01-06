import PropTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31882982-4157c5a40df977384753c9618';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export default async function FetchImages(searchQuery, page, perPage = 12) {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${perPage}`
  );
  return response;
}

FetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
