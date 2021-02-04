import axios from '../../axios/product'
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
    }
  },
  actions: {
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

    }
  }
}