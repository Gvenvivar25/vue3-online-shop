<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="!products.length">В корзине пока ничего нет</h3>
    <cart-table
        :products="products"
        @add="add"
        @remove="remove"
    ></cart-table>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }} </strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import CartTable from '@/components/cart/CartTable'
import {useCart} from '@/use/cart'
import {currency} from '@/utils/currency'
export default {
  setup() {
    return {...useCart(), currency}
  },
  components: {CartTable}
}
</script>

<style scoped>

</style>