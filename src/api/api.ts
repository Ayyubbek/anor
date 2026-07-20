import axios from 'axios'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15000,
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const params = { ...config.params }

  if (params.search) {
    params.title = params.search
    delete params.search
  }

  config.params = params

  return config
})

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      globalThis.location.href = '/'
    }

    return Promise.reject(error)
  },
)
