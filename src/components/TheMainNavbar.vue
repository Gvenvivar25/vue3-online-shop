<template>
  <div class="navbar">
    <h3>Интернет-магазин Vue 3</h3>
    <ul class="navbar-menu">
      <li v-if="user">
        <small>{{user.email}}</small>
      </li>
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/account">Кабинет</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина <span class="badge count">{{ cartCount }}</span></router-link>
      </li>
      <li>
        <a v-if="isAuth" href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </div>

</template>
<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    return {
      user: computed(() =>  store.getters['auth/user']),
      cartCount: computed(() => store.getters['cart/cartCount']),
      isAuth: computed(() => store.getters['auth/isAuthenticated']),
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>