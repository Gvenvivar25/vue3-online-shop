import {useStore} from 'vuex'
import {onMounted, computed} from 'vue'

export function useCart() {
  const store = useStore()

  onMounted( () => {
    store.commit('cart/loadCart')
  })
  const products = computed(() => store.getters['cart/cart'])

  const total = computed(() => {
    if(products.value){
      return products.value.reduce((sum, current) =>  sum+current.count * current.price,0)
    }
    return 0
  })

  return {
    products,
    total
  }
}