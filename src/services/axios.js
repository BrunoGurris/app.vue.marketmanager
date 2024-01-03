import axios from 'axios'

const token = localStorage.getItem('_token')
const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: apiUrl,
    headers: { 'Authorization': 'Bearer ' + token },
    // timeout: 10000
});

export default api