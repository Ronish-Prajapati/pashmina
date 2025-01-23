// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend.event.nepalpashmina.org.np/public/api', // Update with your actual base URL
});

// Add token to headers if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch users function
export const fetchUsers = async () => {
  try {
    const response = await api.get('/registrations'); // Adjust the endpoint based on your backend
    return response.data; // Assuming users are in the response `data` field
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error for the calling component to handle
  }
};

export default api;
