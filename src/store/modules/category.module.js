import axios from '../../axios/category'
import {v4 as uuidv4} from 'uuid'

export default {
  namespaced: true,
  state() {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    addCategory(state, category) {
      state.categories.push(category)
    },
    updateCategory(state, category) {
      const idx = state.categories.findIndex(item => item.id === category.id)
      if (idx !== -1) {
        state.categories[idx] = category
      }
    }
  },
  actions: {
    async loadCategories({commit, dispatch}) {
      try {
        const {data} = await axios.get(`/categories`)
        const request = Object.keys(data).map(id => ({...data[id]}))
        commit('setCategories', request)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const {data} = await axios.get(`/categories/${id}`)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        // const token = store.getters['auth/token']
        payload.id = uuidv4()
        await axios.post(`/categories`, payload)
        commit('addCategory', {...payload})
        dispatch('setMessage', {
          value: 'Категория успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({commit, dispatch }, category) {
      try {
        // const token = store.getters['auth/token']
        await axios.put(`/categories/${category.id}`, category)
        commit('updateCategory', category)
        dispatch('setMessage', {
          value: 'Данные о товаре обновлены',
          type: 'primary'
        }, {root: true})
        return category
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete({dispatch}, id) {
      try {
        await axios.delete(`/categories/${id}`)
        dispatch('loadCategories')
        dispatch('setMessage', {
          value: 'Категория успешно удалена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },
  getters: {
    categories(state) {
      return state.categories
    }
  }
}