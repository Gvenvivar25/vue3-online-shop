import axios from '../../axios/request'
import store from '../index'
import {transform} from '@/utils/transform'

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
        const {data} = await axios.get(`/categories.json`)
        commit('setCategories', transform(data))
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const {data} = await axios.get(`/categories/${id}.json?auth=${store.getters['auth/token']}`)
        return {...data, id: id}
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        const {data} = await axios.post(`/categories.json?auth=${store.getters['auth/token']}`, payload)
        commit('addCategory', {...payload, id: data.name})
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
        await axios.put(`/categories/${category.id}.json?auth=${store.getters['auth/token']}`, category)
        commit('updateCategory', category)
        dispatch('setMessage', {
          value: 'Данные о категории обновлены',
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
        await axios.delete(`/categories/${id}.json?auth=${store.getters['auth/token']}`)
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