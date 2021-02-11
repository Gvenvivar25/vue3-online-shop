<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Наименование</label>
      <input type="text" id="title" v-model="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="price">Цена</label>
      <input type="number" id="price" v-model.number="price" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <div class="form-control" :class="{invalid: cError}">
      <label for="count">Количество на складе</label>
      <input type="number" id="count" v-model.number="count" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
    </div>

    <div class="form-control" :class="{invalid: iError}">
      <label for="img">Изображение</label>
      <input type="text" id="img" v-model="img" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>

    <div class="form-control">
      <label for="category">Категория</label>
      <select id="category" v-model="category">
        <option v-for="cat in categories" :key="cat.id" :value="cat.type">{{ cat.title }}</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useProductForm} from '@/use/product-form'
import {onMounted} from 'vue'
export default {
  emits: ['created-prod'],
  setup(_, {emit}) {
    const store = useStore()

    onMounted(() => {
      store.dispatch('category/loadCategories')
    })

    const submit = async values => {
      await store.dispatch('product/create', values)
      emit('created-prod')
    }

    return {
      ...useProductForm(submit),
    }
  }
}
</script>

<style scoped>

</style>