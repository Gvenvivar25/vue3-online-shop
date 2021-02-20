<template>
  <app-page class="center" title="Спасибо, Ваш заказ успешно оформлен и оплачен!">
    <img src="https://sales-generator.ru/upload/resize_cache/iblock/a44/790_395_2/xa449cc4881a848b3924592c6be6d1035.webp.pagespeed.ic.oZ8HSrNCDB.webp" alt="">
    <div>Письмо-подтверждение отправлено на Ваш email</div>
    <br>
    <router-link to="/">Продолжить покупки</router-link>
  </app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage'
export default {
  components: {AppPage}
}
</script>

<style scoped>

</style>