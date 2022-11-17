import { BASE_API_URL } from '../constants';
import axios from 'axios';

export const fetchArtworks = async () => {
  return axios.get(BASE_API_URL);
};

export const fetchArtworkDetail = async (id: number) => {
  return axios.get(`${BASE_API_URL}/${id}`);
};
