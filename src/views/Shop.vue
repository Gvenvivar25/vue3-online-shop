<template>
  <app-loader v-if="loading"></app-loader>
  <div class="card" v-else>
    <product-filter v-model="filter"></product-filter>
    <div class="products-table" v-if="products.length">
      <product-card
          v-for="(prod, key) in products"
          :key="key"
          :product="prod"
          :cart="cart"
          @openProductCard="$router.push(`/product/${prod.id}`)"
      ></product-card>
    </div>
    <h2 class="center" v-if="!products.length">Таких товаров нет, увы</h2>
  </div>
</template>

<script>
import ProductCard from '@/components/product/ProductCard'
import ProductFilter from '@/components/product/ProductFilter'
import AppLoader from '@/components/ui/AppLoader'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import {useLoad} from '@/use/load'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const loading = ref(true)
    const filter = ref({
      search: route.query.search,
      category: route.query.category
    })

    onMounted(async () => {
      await useLoad()
      await store.commit('cart/loadCart')
      loading.value = false
    })
    const cart = computed(() => store.getters['cart/cart'])
    const products = computed(() => store.state.product.products
        .filter(product => {
          if (filter.value.search) {
            return product.title.toLowerCase().includes(filter.value.search.toLowerCase())
          }
          return product
        })
        .filter(product => {
          if (filter.value.category) {
            return product.category === filter.value.category
          }
          return product
        })
        .sort((a, b) => b.count - a.count)
    )


    return {
      filter,
      loading,
      products,
      cart
    }

  },
  components: {AppLoader, ProductCard, ProductFilter}
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>