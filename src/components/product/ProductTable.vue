<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th> Наименование </th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(prod, idx) in products" :key="prod.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ prod.title }}</td>
      <td ><img :src="prod.img" alt="Img" class="product-list-img"></td>
      <td>{{ currency(prod.price) }}</td>
      <td>{{ prod.category }}</td>
      <td>{{ prod.count }}</td>
      <td>
        <button class="btn" @click="$router.push(`/admin/products/${prod.id}`)">Открыть</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from '@/utils/currency'

export default {
  props: ['products'],
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>

</style>