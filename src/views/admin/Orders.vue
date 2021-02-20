<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заказы" v-else>
    <order-list
        v-for="order in orders"
        :key="order.id"
        :order="order"
    ></order-list>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import OrderList from '@/components/order/OrderList'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
export default {
  setup() {
    const loading = ref(true)
    const store = useStore()
    onMounted(() => {
      store.dispatch('order/loadOrders')
      loading.value = false
    })
    const orders = computed(() => store.getters['order/orders'])
    return {
      loading,
      orders
    }
  },
components: {AppPage, AppLoader, OrderList}
}
</script>

<style scoped>

</style>