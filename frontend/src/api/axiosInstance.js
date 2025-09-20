import axios from 'axios';

// Create a centralized Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // Your backend base URL
});

// This is an "interceptor" - a function that runs before every request is sent.
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token and user ID from localStorage
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        
        // If they exist, add them to the request headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (id) {
            config.headers['id'] = id;
        }
        
        return config;
    },
    (error) => {
        // Handle any request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;