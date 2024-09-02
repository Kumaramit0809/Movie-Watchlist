import axios from 'axios';

const API_KEY = 'ebd0393f';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
};

export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
};
