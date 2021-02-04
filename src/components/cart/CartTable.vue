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
    <tr v-for="(prod, idx) in products" :key="prod.id">
      <td ><img :src="prod.img" alt="Img" class="cart-img"></td>
      <td>{{ prod.title }}</td>
      <td>
        <button class="btn primary" @click="$emit('add', idx)">+</button>
        {{ prod.count }} шт.
        <button class="btn danger" @click="$emit('remove', idx)">-</button>
      </td>
      <td>{{ currency(prod.price) }}</td>
      <td>{{ currency(rowSum(idx)) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from '@/utils/currency';
/*import {computed} from 'vue'*/
export default {
  props:['products'],
  emits: ['add', 'remove'],
  setup(props) {

    const rowSum = (idx) => {
      return props.products[idx].count * props.products[idx].price
    }

    return {currency, rowSum}
  }

}
</script>

<style scoped>

</style>