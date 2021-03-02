<template>
  <the-main-navbar />
  <div class="container with-nav">
    <app-message/>
    <router-view />
  </div>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'
import TheMainNavbar from '@/components/TheMainNavbar'
export default {
  components: {
    TheMainNavbar,
    AppMessage
  }
}
</script>

<style scoped>

</style>