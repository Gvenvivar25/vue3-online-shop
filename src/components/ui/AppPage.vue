<template>
<!--  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться к списку заявок</router-link>
  </div>-->
  <div class="card">
    <h3 class="card-title">
      {{title}}
      <slot name="header" />
    </h3>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Online Shop`
  }
}
</script>

<style scoped>

</style>