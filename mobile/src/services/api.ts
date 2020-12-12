import axios from 'axios';
const api = axios.create({
    baseURL: 'http://192.168.10.8:3200'
})

export default api;