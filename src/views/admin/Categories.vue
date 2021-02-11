<template>
  <app-page title="Категории">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
  </app-page>
  <div class="card">
    <category-table
        :categories="categories"
    ></category-table>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Создать категорию" @close="modal = false">
      <category-modal @created="modal = false" />
    </app-modal>
  </teleport>

</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import CategoryModal from '@/components/category/CategoryModal'
import CategoryTable from '@/components/category/CategoryTable'
import {onMounted, computed, ref} from 'vue'
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('category/loadCategories')
    })
    const categories = computed(() => store.getters['category/categories'])


    return {
      categories,
      modal
    }
  },
  components: {CategoryModal, AppPage, CategoryTable, AppModal}
}
</script>

<style scoped>

</style>