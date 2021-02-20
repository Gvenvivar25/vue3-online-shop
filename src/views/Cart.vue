<template>
  <app-page  class="card" title="Корзина" >
    <cart-table v-if="products.length"
        :products="products"
    ></cart-table>
    <h3 class="text-center" v-else>В корзине пока ничего нет</h3>
    <hr>
    <p class="text-right"><strong>Всего: {{ currency(total) }} </strong></p>
    <p class="text-right" v-if="isAuth">
      <button class="btn" @click="onPay">Оплатить</button>
    </p>
    <div  v-else>
      <h3 class="text-center">Для оформления заказа войдите в систему или зарегистрируйтесь</h3>
      <auth />
    </div>

  </app-page>
</template>

<script>
import CartTable from '@/components/cart/CartTable'
import Auth from '@/views/Auth'
import {useCart} from '@/use/cart'
import {currency} from '@/utils/currency'
import {useStore} from 'vuex'
import {computed} from 'vue'
import AppPage from '@/components/ui/AppPage'
import {pay} from '@/utils/pay'
export default {
  setup() {
    const store = useStore()
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const user = computed(() => store.getters['auth/user'])
    const {total} = useCart()

    const onPay = async () => {
      await pay({
        description: 'Оплата товаров',
        amount: total.value,
        accountId: user.value.email
      })
      await store.dispatch('order/createOrder')
    }
    return {
      ...useCart(),
      currency,
      isAuth,
      onPay,
    }
  },
  components: {CartTable, Auth, AppPage}
}
</script>

<style scoped>

</style>