import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = 'http://localhost:8080';
const mlApiUrl = import.meta.env.VITE_ML_API_URL;

// Java backend client
const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
});

// Flask ML service client
export const mlApi = axios.create({
  baseURL: mlApiUrl,
});

export default api;