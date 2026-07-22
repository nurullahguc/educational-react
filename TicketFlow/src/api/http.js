import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    header: {
        Accept: 'application/json'
    }
});

export default http;