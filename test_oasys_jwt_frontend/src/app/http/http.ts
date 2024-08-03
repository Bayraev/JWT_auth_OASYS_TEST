import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = `http://localhost:4000/api`;

const $api = axios.create({
  withCredentials: true, // it makes automatically connecting cookies to every request from client
  baseURL: API_URL, // base url (maybe better put it in .env)
});

//? what is instance of axios
// need to attach token in all requests.
$api.interceptors.request.use((config) => {
  // it have all base urls, headers etc., to get something or send something as request
  const token = Cookies.get('token');
  console.log(token);
  config.headers.Authorization = `Bearer ${token}`; // token is in localstorage
  return config;
});
//
export default $api;