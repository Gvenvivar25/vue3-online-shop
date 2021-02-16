<template>
  <div class="product-card">
    <div class="product-img" >
      <img :src="product.img" @click="$emit('openProductCard', product.id)">
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
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
  </div>

</template>

<script>
import {computed} from 'vue'
import {currency} from '@/utils/currency'
import {useStore} from 'vuex'
import AppCountChange from '@/components/ui/AppCountChange'
export default {
  props: ['product', 'cart'],
  emits: ['openProductCard'],
  setup(props) {
    const store = useStore()

    const productInCart = computed(() => props.cart.find(item => item.id === props.product.id))
    const countInCart = computed(() =>{
      if(productInCart.value) {
        return productInCart.value.count
      } else {
        return 0
      }
    })
    const updateCart = (count) => {
      const productToCart = {...props.product}
      productToCart.count = count
      store.commit('cart/updateCart', productToCart)
    }
    return {
      currency,
      countInCart,
      updateCart
    }
  },
  components: {AppCountChange}

}
</script>

<style scoped>

</style>