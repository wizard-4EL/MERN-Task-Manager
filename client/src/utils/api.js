import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mern-task-manager-yl8a.onrender.com/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
