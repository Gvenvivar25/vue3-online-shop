<template>
  <app-loader v-if="loading" />
  <app-page title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
  </app-page>

  <div class="card">
    <product-table
        :products="paginatedProducts"
    ></product-table>

    <app-pagination
    v-model="page"
    :count="products.length"
    :size="PAGE_SIZE"
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
import {useRoute, useRouter} from 'vue-router'
import {onMounted, computed, ref, watch} from 'vue'
import {chunk} from 'lodash'
import {useLoad} from '@/use/load'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const modal = ref(false)
    const loading = ref(true)
    const PAGE_SIZE = 5
    const page= ref(route.query.page ? route.query.page : 1)

    const _setPage = () => router.replace({query: {page: page.value}})

    watch(page, _setPage)

    onMounted(() => _setPage())

    onMounted(async () => {
      await useLoad()
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

    const paginatedProducts = computed(() => chunk(products.value, PAGE_SIZE)[page.value-1])

    return {
      products,
      modal,
      loading,
      PAGE_SIZE,
      paginatedProducts,
      page,
    }
  },
  components: {AppPage, ProductTable, AppLoader, AppModal, ProductModal, AppPagination}
}
</script>

<style scoped>

</style>