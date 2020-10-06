import axios from 'axios';

export const local = 'http://localhost:4040/api/v1/';
export const testDomain = 'https://wwww.masjidfinder.com/api/v1/';
export const server = local;

export const APP_TITLE = 'Masjid Finder';

export const baseApi = axios.create({
  baseURL: server,
});

export const MAP_KEY = process.env.REACT_APP_GOOGLE_KEY!;
