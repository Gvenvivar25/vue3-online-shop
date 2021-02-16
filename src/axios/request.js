import axios from 'axios'
import router from '../router'
// import store from '../store'

const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

/*requestAxios.interceptors.request.use(async config => {
  config.params['auth'] = store.getters['auth/token']
  return config
})*/

requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/auth?message=auth')
  }
  return Promise.reject(error)
})

export default requestAxios