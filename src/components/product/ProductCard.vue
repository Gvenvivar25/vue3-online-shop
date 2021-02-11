<template>
  <div class="product-card">
    <div class="product-img" >
      <img :src="product.img" @click="$emit('openProductCard', product.id)">
    </div>

    <h4 class="product-title">{{ product.title }}</h4>

    <div class="text-center">
      <button class="btn" v-if="product.count > 0" @click="show = true" v-show="!show">{{ currency(product.price) }}</button>
       <strong v-else>Нет в наличии</strong>

      <div class="product-controls in-card" v-if="show">
        <button class="btn danger" @click="remove" :disabled="count===0">-</button>
        <strong>{{ count }}</strong>
        <button class="btn primary" @click="add" :disabled="count===product.count">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {currency} from '@/utils/currency'
export default {
  props: ['product'],
  emits: ['openProductCard'],
  setup(props) {
    const show = ref(false)
    const count = ref(1)

    const add = () => {
      if(count.value < props.product.count) {
        count.value ++
      }
    }

    const remove = () => {
      if(count.value > 0) {
        count.value --
      }
    }

    return {
      currency,
      show,
      count,
      add,
      remove
    }
  }

}
</script>

<style scoped>

</style>