import axios from 'axios'

export const api = axios.create({
  baseURL: '172.17.0.1:3000/api',
})
