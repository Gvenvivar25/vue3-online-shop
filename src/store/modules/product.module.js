import axios from '../../axios/product'
import { v4 as uuidv4 } from 'uuid';
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
       // const token = store.getters['auth/token']
        payload.id = uuidv4()
        console.log(payload)
        await axios.post(`/products`, payload)
        commit('addProduct', {...payload})
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
        // const token = store.getters['auth/token']
        await axios.put(`/products/${product.id}`, product)
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
        const {data} = await axios.get(`/products`)
        const requests = Object.keys(data).map(id => ({...data[id]}))
        commit('setProducts', requests)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOne({ dispatch}, id) {
      try {
        const {data} = await axios.get(`/products/${id}`)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async deleteProduct({dispatch}, id) {
      try {
        await axios.delete(`/products/${id}`)
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