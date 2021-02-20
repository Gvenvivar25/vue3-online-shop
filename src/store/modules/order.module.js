import store from '@/store'
import axios from '@/axios/request'
import router from '@/router'
import {transform} from '@/utils/transform'

export default {
  namespaced: true,
  state() {
    return {
      order: []
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
  },
  actions: {
    async createOrder({commit, rootGetters, dispatch}) {
      const cart = rootGetters['cart/cart']
      await dispatch('product/loadProducts', null, {root:true})
      const products = rootGetters['product/products']
      const order = {
        user: store.getters['auth/localId'],
        list: {...cart},
        date: Date.now()
      }

      for (const value of cart) {
        const product = products.find(p => p.id === value.id)
        const count = product.count - value.count
        commit('product/updateProductCount', {id: value.id, count}, {root: true})
        await axios.patch(`/products/${value.id}.json`, {count})
      }
      try {
        await axios.post(`/orders.json`, order)
        commit('cart/clearCart', null, {root: true})
        await router.push({name: 'Thanks'})

      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOrders({commit, dispatch}) {
      try {
        const {data} = await axios.get(`/orders.json`)
        commit('setOrders', transform(data))
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOrdersByUser({dispatch, commit}, id) {
      try {
        const {data} = await axios.get(`/orders.json`)
        const userOrders = transform(data).filter(order => order.user === id)
        commit('setOrders', userOrders)
        return userOrders
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
  },
  getters: {
    orders(state) {
      return state.orders? state.orders : []
    }
  }
}