import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const LOCAL_ID = 'localId'
const ROLE = 'role'
import {error} from '@/utils/error'
import store from '@/store'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      localId: localStorage.getItem(LOCAL_ID),
      user: {},
      role: localStorage.getItem(ROLE)
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data.idToken
      state.localId = data.localId
      localStorage.setItem(TOKEN_KEY, data.idToken)
      localStorage.setItem(LOCAL_ID, data.localId)
    },
    setUser(state, user) {
      state.user = user
      state.role = user.role
      localStorage.setItem(ROLE, user.role)
    },
    logout(state) {
      state.user = null
      state.token = null
      state.role = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(LOCAL_ID)
      localStorage.removeItem(ROLE)
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
    async getUser({ commit, dispatch, getters }, localId) {
      try {
        const {data} = await axios.get(`https://online-shop-vue3-default-rtdb.firebaseio.com/users/${localId}.json?auth=${getters['token']}`)
        commit('setUser', data)
        return data
      } catch(e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(error(e.response.data.error.message))
        throw new Error(e)
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
      console.log(payload)
      try {
        await axios.put(`https://online-shop-vue3-default-rtdb.firebaseio.com/users/${payload.localId}.json?auth=${payload.idToken}`,
          { name: '', role: 'customer'})
      } catch (e) {
        console.log(e)
      }
    },
    async updateUser({commit, dispatch }, user) {
      try {
        await axios.put(`https://online-shop-vue3-default-rtdb.firebaseio.com/users/${store.getters['auth/localId']}.json?auth=${store.getters['auth/token']}`, user)
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
      return state.localId
    },
    role(state) {
      return state.role
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  }
}