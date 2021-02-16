<template>
  <app-loader v-if="loading"/>

  <div class="card" v-if="isAuth">
    <div class="order-list">
      <div class="order-item" @click="$router.push({name: 'Orders'})">
        Список заказов
      </div>
      <div class="order-item" @click="$router.push({name: 'PersonalData'})">
        Личные данные
      </div>
      <div class="order-item" @click="$router.push({name: 'Cart'})">
        Корзина
      </div>
      <div class="order-item" @click="logout">
        Выход
      </div>
    </div>

  </div>
  <auth v-else/>

</template>

<script>
import Auth from '@/views/Auth'
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import AppLoader from '@/components/ui/AppLoader'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)
    const localId = computed(() => store.getters['auth/localId'])
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    onMounted(async() =>  {
      if(isAuth.value) {
        loading.value = true
        await store.dispatch('auth/getUser', localId.value)
        loading.value = false
      }
    })
    const user = computed(() => store.getters['auth/user'])

    return {
      user,
      isAuth,
      loading,
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  },
  components: {Auth, AppLoader}
}
</script>

<style scoped>

</style>