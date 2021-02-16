import store from '@/store'
import axios from '../../axios/request'
import router from '@/router'
import {transform} from '@/utils/transform'
const CART = 'CART'

export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem(CART)) ?? [],
      order: []
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
    loadCart(state) {
      state.cart = JSON.parse(localStorage.getItem(CART)) ?? []
    },
    updateCart(state, product) {
      const index = state.cart.findIndex(item => item.id === product.id)
      if(index === -1 && product.count > 0) {
        state.cart.push(product)
      } else if (index !== -1 && product.count > 0) {
        state.cart[index].count = product.count
      } else if (index !== -1 && product.count === 0) {
        state.cart.splice(index, 1)
      }
      localStorage.setItem(CART, JSON.stringify(state.cart))
    },
    clearCart (state) {
      state.cart = []
      localStorage.removeItem(CART)
    }

  },
  actions: {
    async createOrder({commit, state, dispatch},) {
      const body = {
        user: store.getters['auth/localId'],
        list: {...state.cart},
        date: Date.now()
      }
      try {
        await axios.post(`/orders.json?auth=${store.getters['auth/token']}`, body)
        commit('clearCart')
        dispatch('setMessage', {
          value: 'Заказ успешно создан!',
          type: 'primary'
        }, {root: true})
        await router.push({name: 'Shop'})

      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadOrders({commit, dispatch}) {
      try {
        const {data} = await axios.get(`/orders.json?auth=${store.getters['auth/token']}`)
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
        const {data} = await axios.get(`/orders.json?auth=${store.getters['auth/token']}`)
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
    cart(state) {
      return state.cart
    },
    orders(state) {
      return state.orders
    },
    cartCount(state) {
      if(state.cart) {
        return state.cart.length
      }
      return 0
    }
  }
}