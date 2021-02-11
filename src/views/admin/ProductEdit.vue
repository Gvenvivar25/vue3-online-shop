<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="product" :title="product.title">
      <div>
        <img class="cart-img" :src="product.img" :alt="product.title">
      </div>
      <form @submit.prevent="onUpdate">
        <div class="form-control">
          <label for="title">Наименование</label>
          <input type="text" id="title" v-model="product.title">
        </div>

        <div class="form-control">
          <label for="price">Цена</label>
          <input type="number" id="price" v-model.number="product.price">
        </div>

        <div class="form-control">
          <label for="count">Количество на складе</label>
          <input type="number" id="count" v-model.number="product.count">
        </div>

        <div class="form-control">
          <label for="img">Изображение</label>
          <input type="text" id="img" v-model="product.img">
        </div>

        <div class="form-control">
          <label for="category">Категория</label>
          <select id="category" v-model="product.category">
            <option v-for="cat in categories" :key="cat.id" :value="cat.type">{{ cat.title }}</option>
          </select>
        </div>
        <button class="btn danger" @click="confirm = true">Удалить</button>
        <button class="btn warning" type="submit" v-if="hasChanges">Обновить</button>
      </form>
  </app-page>
  <div class="card" v-else>Товар не найден</div>


  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Вы уверены, что хотите удалить товар?"
        @reject="confirm = false"
        @confirm="removeProduct"
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
import {useCategories} from '@/use/categories'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const product = ref({})
    const confirm = ref(false)
    const loading = ref(true)
    let initial

    onMounted( async () => {
      await useCategories()
      initial = await store.dispatch('product/loadOne', route.params.id)
      product.value = {...initial}
      loading.value = false
    })

    const categories = computed( () => store.getters['category/categories'])

    const hasChanges = computed(() =>
        product.value.title !== initial.title ||
        product.value.count !== initial.count ||
        product.value.price !== initial.price ||
        product.value.img !== initial.img ||
        product.value.category !== initial.category
    )

    const removeProduct = async () => {
      confirm.value = false
      await store.dispatch('product/deleteProduct', route.params.id)
      router.push({name: 'AdminProducts'})
    }

    const onUpdate = async () => {
      initial = await store.dispatch('product/update', product.value)
      product.value = {...initial}
    }

    return {
      loading,
      product,
      categories,
      hasChanges,
      removeProduct,
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