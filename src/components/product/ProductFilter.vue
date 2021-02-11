<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="search">
      <span class="form-control-clear" @click="search = '' ">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" @click="category = ''">Все</li>
      <li class="list-item" v-for="cat in categories" :key="cat.id" @click="changeCategory(cat.type)">
        {{ cat.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, onMounted, computed, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {useCategories} from '@/use/categories'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit}) {
    const store = useStore()
    const router = useRouter()
    const search = ref(props.modelValue.search || '')
    const category = ref(props.modelValue.category || '')
    onMounted(async () => {
      await useCategories()
    })
    const categories = computed(() => store.getters['category/categories'])

    const changeCategory = (cat) => {
      category.value = cat
    }

    watch([search, category], values => {
      const query = {}
      if (values[0]) {
        query.search = values[0]
      }
      if (values[1]) {
        query.category = values[1]
      }
      router.push({query: query})
      emit('update:modelValue', {search, category})
    })

    return {
      category,
      search,
      categories,
      changeCategory
    }
  }

}
</script>

<style scoped>

</style>