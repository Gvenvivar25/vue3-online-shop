<template>
    <div class="order-title" @click="isOpen = !isOpen">Заказ от {{ new Date(order.date).toLocaleDateString() }}
      <strong>Сумма заказа: {{currency(total)}}</strong></div>
    <div v-if="isOpen">
      <table class="table" >
        <thead>
        <tr>
          <th> Наименование товара </th>
          <th>Количество</th>
          <th>Цена (шт)</th>
          <th>Сумма</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(prod, idx ) in order.list" :key="idx">
          <td>{{ prod.title }}</td>
          <td> {{ prod.count }}</td>
          <td>{{ currency(prod.price) }}</td>
          <td>{{ currency(prod.count*prod.price) }}</td>
        </tr>
        </tbody>
      </table>
      <div class="text-right"></div>
    </div>

</template>

<script>
import {ref, computed} from 'vue'
import {currency} from '@/utils/currency'
export default {
  props: {
    order: {
      type: Object
    }
  },
  setup(props) {
    const isOpen = ref(false)
    const total = computed(() => {
      if(props.order.list){
        return props.order.list.reduce((sum, current) =>  sum+current.count * current.price,0)
      }
      return 0
    })

    return {
      isOpen,
      currency,
      total
    }
  }
}
</script>

<style scoped>

</style>