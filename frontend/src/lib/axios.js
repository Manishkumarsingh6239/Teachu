import axios from 'axios'
const baseURL =
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : '/api'

const axiosinstance = axios.create({
  baseURL,
  withCredentials: true,
})

export default axiosinstance