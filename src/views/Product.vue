<template>
  <app-loader v-if="loading"></app-loader>
    <div class="breadcrumbs" >
    <router-link to="/" class="text-white">Вернуться к списку товаров</router-link>
  </div>

  <app-page  class="card center" :title="product.title" v-if="product">
    <div class="product-cart-img">
      <img :src="product.img" :alt="product.title"/>
    </div>
    <p>Категория: <strong>{{ category.title }}</strong></p>
    <button class="btn" @click="show = true">
      {{ currency(product.price) }}
    </button>
    <div class="product-controls in-card" v-if="show">
      <button class="btn danger" @click="remove" :disabled="count===0">-</button>
      <strong>{{ count }}</strong>
      <button class="btn primary" @click="add" :disabled="count===product.count">+</button>
    </div>
  </app-page>
  <h3 class="text-center text-white" v-else>Товар не найден.</h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'
import {currency} from '@/utils/currency'
import {useLoad} from '@/use/load'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    const show = ref(false)
    const count = ref(1)

    onMounted(async () => {
      await useLoad()
      loading.value = false
    })

    const product = computed(() => store.getters['product/products']
        .find(prod => prod.id === route.params.id))

    const category = computed(() => store.getters['category/categories']
    .find(cat => cat.type === product.value.category))

    const add = () => {
      if(count.value < product.value.count) {
        count.value ++
      }
    }

    const remove = () => {
      if(count.value > 0) {
        count.value --
      }
    }

    return {
      product,
      category,
      currency,
      loading,
      show,
      add,
      remove,
      count
    }
  },
  components: {AppPage, AppLoader}
}
</script>

<style scoped>

</style>