import store from '@/store'

export async function useUpdateCart(count, product) {
  const productToCart = {...product}
  productToCart.count = count
  store.commit('cart/updateCart', productToCart)
}