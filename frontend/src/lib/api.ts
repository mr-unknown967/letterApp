import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://letterapp-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      // Handle CORS errors
      console.error('CORS Error:', error);
    }
    return Promise.reject(error);
  }
);

export default api; 