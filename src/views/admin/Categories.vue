<template>
  <app-page title="Категории">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
  </app-page>
  <div class="card">
    <category-table
        v-if="categories.length"
        :categories="categories"
    ></category-table>
    <h4 class="text-center" v-else>Категорий пока нет</h4>
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Создать категорию" @close="modal = false">
      <category-modal @created="modal = false" />
    </app-modal>
  </teleport>

<!-- <div class="card">
   <button class="btn primary" @click="load">Load products</button>
 </div>-->

</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import CategoryModal from '@/components/category/CategoryModal'
import CategoryTable from '@/components/category/CategoryTable'
import {onMounted, computed, ref} from 'vue'
// import db from '../../../database.json'
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const modal = ref(false)

    onMounted(async ()=> {
      await store.dispatch('category/loadCategories')
    })
    const categories = computed(() => store.getters['category/categories'])

    /*const load = () => {
      const data = db.products.map(d => {
        delete d.id
        return d
      })
      console.log(data)

      let index = 0
      setInterval(async () => {
        await store.dispatch('product/create', data[index])
        index ++
      }, 1000)
    }*/


    return {
      categories,
      modal,
    }
  },
  components: {CategoryModal, AppPage, CategoryTable, AppModal}
}
</script>

<style scoped>

</style>