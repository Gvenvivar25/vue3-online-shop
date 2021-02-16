<template>
  <div class="navbar">
    <h3>Интернет-магазин Vue 3</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/account">Кабинет</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина <span class="badge count">{{ cartCount }}</span></router-link>
      </li>
    </ul>
  </div>

</template>
<script>
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  setup() {
    const store = useStore()
    const cartCount = computed(() => {
      return store.getters['cart/cartCount']})
    return {
      cartCount
    }
  }
}
</script>

<style scoped>

</style>