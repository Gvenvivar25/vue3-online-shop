import axios from '../../axios/request'
import store from '../index'
import {transform} from '@/utils/transform'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  getters: {
    products(state) {
      return state.products
    }
  },
  mutations: {
    setProducts(state, prods) {
      state.products = prods
    },
    addProduct(state, product) {
      state.products.push(product)
    },
    updateProduct(state, product) {
      const idx = state.products.findIndex(item => item.id === product.id)
      if (idx !== -1) {
        state.products[idx] = product
      }
    }
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const {data} = await axios.post(`/products.json?auth=${store.getters['auth/token']}`, payload)
        commit('addProduct', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Товар успешно создан',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },

    async update({commit, dispatch }, product) {
      try {
        await axios.put(`/products/${product.id}.json?auth=${store.getters['auth/token']}`, product)
        commit('updateProduct', product)
        dispatch('setMessage', {
          value: 'Данные о товаре обновлены',
          type: 'primary'
        }, {root: true})
        return product
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },

    async loadProducts({commit, dispatch}) {
      try {
        const {data} = await axios.get(`/products.json`)
        commit('setProducts', transform(data))
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const {data} = await axios.get(`/products/${id}.json?auth=${store.getters['auth/token']}`)
        return {...data, id: id}
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async deleteProduct({dispatch}, id) {
      try {
        await axios.delete(`/products/${id}.json?auth=${store.getters['auth/token']}`)
        dispatch('setMessage', {
          value: 'Товар успешно удален',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  }
}