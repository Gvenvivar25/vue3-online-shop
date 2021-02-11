<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="image">
    </div>
    <h4 class="product-title">{{ title }}</h4>
    <div class="text-center">
      <button class="btn" v-if="count > 0">{{ currency(price) }}</button>
       <strong v-else>Нет в наличии</strong>
      <!--          <div class="product-controls">-->
      <!--            <button class="btn danger">-</button>-->
      <!--            <strong>123</strong>-->
      <!--            <button class="btn primary">+</button>-->
      <!--          </div>-->
    </div>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
export default {
  props: ['title', 'price', 'image', 'count'],
  setup() {
    return {
      currency
    }
  }

}
</script>

<style scoped>

</style>