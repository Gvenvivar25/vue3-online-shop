<template>
  <app-message />
  <div class="container">
    <div class="card">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'
export default {
  components: {AppMessage}
}
</script>

<style scoped>

</style>