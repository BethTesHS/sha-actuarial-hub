import axios from 'axios';
import { supabase } from '../supabaseClient';

// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired or invalid -> go back to login
      window.location.href = '/auth?mode=login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
