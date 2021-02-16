<template>
  <tr>
    <td ><img :src="prod.img" alt="Img" class="cart-img"></td>
    <td>{{ prod.title }}</td>
    <td>
      <app-count-change
          :count="prod.count"
          :max-count="100"
          @change-value="updateCart"
      ></app-count-change>
    </td>
    <td>{{ currency(prod.price) }}</td>
    <td>{{ currency(rowSum()) }}</td>
  </tr>
</template>

<script>
import {currency} from '@/utils/currency'
import {useStore} from 'vuex'
import AppCountChange from '@/components/ui/AppCountChange'
export default {
  props: {
    prod: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const rowSum = () => props.prod.count * props.prod.price

    const updateCart = (count) => {
      const productToCart = {...props.prod}
      productToCart.count = count
      store.commit('cart/updateCart', productToCart)
    }
    return {
      currency,
      updateCart,
      rowSum
    }
  },
  components: {AppCountChange}
}
</script>

<style scoped>

</style>