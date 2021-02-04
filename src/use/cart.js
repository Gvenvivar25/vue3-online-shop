import {useStore} from 'vuex';
import {onMounted, computed} from 'vue'

export function useCart() {
  const CART_MODEL = {
    '2': 3,
    '5': 1,
    '8': 4,
    '12': 2
  }
  const store = useStore()
  const keys = Object.keys(CART_MODEL)

  onMounted(async () => {
    await store.dispatch('product/loadProducts')
  })

  const products = computed(
    () => store.getters['product/products']
      .filter(x => keys.includes(x.id))
      .map(prod => {
        prod.count = CART_MODEL[prod.id]
        return prod
      })
  )

  const rowSum = computed((idx) => {
    return products.value[idx].count * products.value[idx].price
  })

  const total = computed(() => {
    return products.value.reduce((sum, current) =>  sum+current.count * current.price,0)
  })

  const add = (id) => {
    products.value[id].count ++
  }
  const remove = (idx) => {
    products.value[idx].count --
    if(products.value[idx].count === 0) {
      products.value.splice(idx, 1)
    }
  }
  return {
    products,
    total,
    add,
    remove,
    rowSum
  }
}