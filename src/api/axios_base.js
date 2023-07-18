import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: import.meta.env.BACKEND_URL ?? 'http://localhost:8000/api/v1/',
})

export default axiosInstance
