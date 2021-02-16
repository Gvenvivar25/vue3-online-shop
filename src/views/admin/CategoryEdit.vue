<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="category" :title="category.title">
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="title">Наименование</label>
          <input type="text" id="title" v-model="category.title">
        </div>

        <div class="form-control">
          <label for="type">Цена</label>
          <input type="text" id="type" v-model.trim="category.type">
        </div>

        <button class="btn danger" @click.prevent="confirm = true">Удалить</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Обновить</button>
      </form>
  </app-page>
  <div class="card" v-else>Товар не найден</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Вы уверены, что хотите удалить категорию?"
        @reject="confirm = false"
        @confirm="remove"
    ></app-confirm>
  </teleport>

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
import AppLoader from '@/components/ui/AppLoader'
import AppConfirm from '@/components/ui/AppConfirm'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, onMounted, computed} from 'vue'
import {useLeaveGuard} from '@/use/leave-guard'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const category = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      initial = await store.dispatch('category/loadOne', route.params.id)
      category.value = {...initial}
      loading.value = false
    })

    const hasChanges = computed(() =>
        category.value.title !== initial.title ||
        category.value.type !== initial.type
    )

    const remove = async () => {
      confirm.value = false
      await store.dispatch('category/delete', route.params.id)
      router.push({name: 'AdminCategories'})
    }

    const onUpdate = async () => {
      initial = await store.dispatch('category/update', category.value)
      category.value = {...initial}
    }

    return {
      category,
      loading,
      hasChanges,
      remove,
      confirm,
      onUpdate,
      ...useLeaveGuard(hasChanges)
    }
  },
components: {AppPage, AppLoader, AppConfirm}
}
</script>

<style scoped>

</style>