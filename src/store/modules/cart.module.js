const CART = 'CART'

export default {
  namespaced: true,
  state() {
    return {
      cart: JSON.parse(localStorage.getItem(CART)) ?? [],
    }
  },
  mutations: {
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
  getters: {
    cart(state) {
      return state.cart
    },
    cartCount(state) {
      return state.cart ? state.cart.length : 0
    }
  }
}