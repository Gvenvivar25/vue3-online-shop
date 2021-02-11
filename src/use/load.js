import {useStore} from 'vuex'

export async function useLoad() {
  const store = useStore()

  if(!store.getters['category/categories'].length) {
    await store.dispatch('category/loadCategories')
  }

  if(!store.getters['product/products'].length) {
    await store.dispatch('product/loadProducts')
  }
}