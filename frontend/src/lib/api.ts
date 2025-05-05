import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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