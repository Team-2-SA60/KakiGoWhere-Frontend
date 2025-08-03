import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = 'http://localhost:8080';

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
});

export default api;