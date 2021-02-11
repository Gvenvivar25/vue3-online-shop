<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Наименование</label>
      <input type="text" id="title" v-model.trim="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <div class="form-control" :class="{invalid: tpError}">
      <label for="type">Тип категории</label>
      <input type="text" id="type" v-model.trim="type" @blur="tpBlur">
      <small v-if="tpError">{{tpError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>

</template>

<script>
import {useStore} from 'vuex'
import {useCategoryForm} from '@/use/category-form'
export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async values => {
      await store.dispatch('category/create', values)
      emit('created')
    }

    return {
      ...useCategoryForm(submit),
    }
  }
}
</script>

<style scoped>

</style>