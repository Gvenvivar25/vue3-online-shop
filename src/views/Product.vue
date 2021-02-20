<template>
  <app-loader v-if="loading"></app-loader>
    <div class="breadcrumbs" >
    <router-link to="/" class="text-white">Вернуться к списку товаров</router-link>
  </div>

  <app-page  class="card center" :title="product.title" v-if="product">
    <div >
      <img class="product-cart-img" :src="product.img" :alt="product.title"/>
    </div>
    <p>Категория: <strong>{{ category.title }}</strong></p>
    <div class="text-center" v-if="product.count > 0">
      <button class="btn" v-if="countInCart === 0" @click="updateCart(1)" >{{ currency(product.price) }}</button>

      <div class="product-controls in-card" v-else>
        <app-count-change
            :count="countInCart"
            :max-count="product.count"
            @change-value="updateCart"
        ></app-count-change>
      </div>

    </div>
    <div class="text-center" v-else>
      <strong >Нет в наличии</strong>
    </div>
  </app-page>
  <h3 class="text-center text-white" v-else>Товар не найден.</h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppCountChange from '@/components/ui/AppCountChange'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'
import {currency} from '@/utils/currency'
import {useLoad} from '@/use/load'
import {useUpdateCart} from '@/use/updateCart'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      await useLoad()
      await store.commit('cart/loadCart')
      loading.value = false
    })

    const product = computed(() => store.getters['product/products']
        .find(prod => prod.id === route.params.id))

    const category = computed(() => store.getters['category/categories']
    .find(cat => cat.type === product.value.category))

    const productInCart = computed(() => store.getters['cart/cart'].find(item => item.id === product.value.id))
    const countInCart = computed(() =>{
      if(productInCart.value) {
        return productInCart.value.count
      } else {
        return 0
      }
    })

    const updateCart = (count) => useUpdateCart(count, product.value)

    return {
      product,
      category,
      currency,
      loading,
      countInCart,
      updateCart

    }
  },
  components: {AppPage, AppLoader, AppCountChange}
}
</script>

<style scoped>

</style>