import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8002',
});

export default axiosApi;