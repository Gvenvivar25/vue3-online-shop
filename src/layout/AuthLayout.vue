<template>
  <app-message />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage'
export default {
  components: {AppMessage}
}
</script>

<style scoped>

</style>