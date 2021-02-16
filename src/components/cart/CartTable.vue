<template>
  <table class="table" v-if="products.length">
    <thead>
    <tr>
      <th> Изображение </th>
      <th> Наименование </th>
      <th>Количество</th>
      <th>Цена (шт)</th>
      <th>Сумма</th>
    </tr>
    </thead>
    <tbody>
    <cart-product
        v-for="prod in products"
        :key="prod.id"
        :prod="prod"
    >
    </cart-product>
    </tbody>
  </table>
</template>

<script>
import CartProduct from '@/components/cart/CartProduct'
export default {
  props: {
    products: Array
  },
  components: { CartProduct}
}
</script>

<style scoped>

</style>