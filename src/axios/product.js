import axios from 'axios'
import router from '../router'

const productAxios = axios.create({
  baseURL: process.env.VUE_APP_DBASE
})

productAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/auth?message=auth')
  }
  return Promise.reject(error)
})

export default productAxios