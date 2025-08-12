import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Java backend client
const api = axios.create({
  baseURL: `${apiUrl}:8080/api`,
  withCredentials: true,
});

// Flask ML service client
export const mlApi = axios.create({
  baseURL: `${apiUrl}:5001/`
});

export default api;