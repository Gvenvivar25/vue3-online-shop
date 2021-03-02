import axios from 'axios'
import requestAxios from '@/axios/request'
import {error} from '@/utils/error'
import store from '@/store'
import router from '@/router'

const TOKEN_KEY = 'jwt-token'
const REFRESH_TOKEN = 'jwt-refresh-token'
const EXPIRES = 'jwt-expires'
const USER = 'user'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN),
      expiresDate: new Date(localStorage.getItem(EXPIRES)),
      user: JSON.parse(localStorage.getItem(USER)) ?? {},
    }
  },
  mutations: {
    setToken(state, data) {
      const expiresDate = new Date(new Date().getTime() + Number(data.expiresIn)*1000)
      state.token = data.idToken
      state.refreshToken = data.refreshToken
      state.expiresDate = expiresDate
      localStorage.setItem(TOKEN_KEY, data.idToken)
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
      localStorage.setItem(EXPIRES, expiresDate.toString())
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem(USER, JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER)
      localStorage.removeItem(EXPIRES)
      localStorage.removeItem(REFRESH_TOKEN)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data)
        commit('clearMessage', null, {root: true})
        await dispatch('getUser', data.localId)
      } catch(e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(error(e.response.data.error.message))
        throw new Error(e)
      }
    },
    async getUser({ commit, dispatch, }, localId) {
      try {
        const {data} = await requestAxios.get(`/users/${localId}.json`)
        commit('setUser', {localId: localId, ...data})
        commit('clearMessage', null, {root: true})
      } catch(e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(error(e.response.data.error.message))
        throw new Error(e)
      }
    },

    async refresh({state, commit}) {
      try {
        const {data} = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_FB_KEY}`, {
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken
        })
        commit('setToken', {
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in
        })
      } catch (e) {
        console.log('Error: ', e.message)
      }
    },

    async signUp({dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        dispatch('setMessage', {
          value: 'Пользователь успешно зарегистрирован',
          type: 'primary'
        }, {root: true})
        dispatch('createUser', data)
        dispatch('login', payload)
      } catch(e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(error(e.response.data.error.message))
        throw new Error(e)
      }
    },
    async createUser(_, payload) {
      try {
        await requestAxios.put(`/users/${payload.localId}.json?auth=${payload.idToken}`,
          { name: '', role: 'customer', email: payload.email})
      } catch (e) {
        console.log(e)
      }
      await router.push({name: 'Account'})
    },
    async updateUser({commit, dispatch }, user) {
      try {
        await requestAxios.put(`/users/${store.getters['auth/localId']}.json`, user)
        commit('setUser', user)
        dispatch('setMessage', {
          value: 'Данные о пользователе обновлены',
          type: 'primary'
        }, {root: true})
        return user
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
  },
  getters: {
    token(state) {
      return state.token
    },
    user(state) {
      return state.user
    },
    localId(state) {
      return state.user.localId
    },
    isExpired(state) {
      return new Date() >= state.expiresDate
    },
    isAdmin(state) {
      return state.user.role === 'admin'
    },
    isAuthenticated(_, getters) {
      return !!getters.token && !getters.isExpired
    }
  }
}