<template>
  <app-loader v-if="loading" />
  <app-page title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
  </app-page>

  <div class="card">
    <product-table
        :products="products"
    ></product-table>

    <app-pagination
    :dataList="products"
    :listSize="5"
    >
    </app-pagination>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Создать товар" @close="modal = false">
      <product-modal @created-prod="modal = false" />
    </app-modal>
  </teleport>
</template>

<script>
import ProductTable from '@/components/product/ProductTable'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import ProductModal from '@/components/product/ProductModal'
import AppPagination from '@/components/ui/AppPagination'
import {useStore} from 'vuex'
import {onMounted, computed, ref} from 'vue'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const paginated= ref()

    onMounted(async () => {
      loading.value = true
      await store.dispatch('category/loadCategories')
      await store.dispatch('product/loadProducts')
      loading.value = false
    })

    const categories = computed(() => store.getters['category/categories'])

    const products = computed(
        () => store.getters['product/products']
            .map(prod => {
              if(categories.value.find(cat => cat.type === prod.category)) {
                prod.category = categories.value.find(cat => cat.type === prod.category).title
              }
              return prod
        }))

    /*const paginate = (pagin) => {
      console.log(pagin)
      paginated.value = pagin.value
      console.log(paginated.value)
    }*/

    return {
      products,
      modal,
      loading,
      paginated,
      /*paginate*/
    }
  },
  components: {AppPage, ProductTable, AppLoader, AppModal, ProductModal, AppPagination}
}
</script>

<style scoped>

</style>