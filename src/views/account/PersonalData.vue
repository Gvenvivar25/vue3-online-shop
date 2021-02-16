<template>
  <app-loader v-if="loading" />
  <app-page title="Личные данные">
    <form @submit.prevent="onUpdate">
      <div class="form-control">
        <label for="name">Имя пользователя</label>
        <input type="text" id="name" v-model="user.name">
      </div>

      <button class="btn warning" type="submit">Обновить</button>
    </form>
  </app-page>

  <teleport to="body">
    <app-confirm
        v-if="saveChanges"
        title="Изменения не были сохранены. При переходе изменения будут утеряны. Покинуть страницу?"
        @reject="saveChanges = false"
        @confirm="navigate"
    ></app-confirm>
  </teleport>

</template>
<script>
import AppPage from '@/components/ui/AppPage'
import {useStore} from 'vuex'
import {computed, ref, onMounted} from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import AppConfirm from '@/components/ui/AppConfirm'
import {useLeaveGuard} from '@/use/leave-guard'

export default {
  setup() {
    const store = useStore()
    const loading = ref(true)
    const user = ref({})
    let initial
    const localId = computed(() => store.getters['auth/localId'])

    onMounted(async () => {
      initial = await store.dispatch('auth/getUser', localId.value)
      user.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        user.value.name !== initial.name
    )

    const onUpdate = async () => {
      initial = await store.dispatch('auth/updateUser', user.value)
      user.value = {...initial}
    }

    return {
      user,
      loading,
      onUpdate,
      ...useLeaveGuard(hasChanges)
    }
  },
  components: {AppPage, AppLoader, AppConfirm}

}
</script>

<style scoped>

</style>