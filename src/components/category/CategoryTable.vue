<template>
  <table class="table">
    <thead>
    <tr>
      <th>№</th>
      <th> Наименование </th>
      <th>Тип</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(cat, idx) in categories" :key="cat.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ cat.title }}</td>
      <td>{{ cat.type }}</td>
      <td>
        <button class="btn" @click="$router.push(`/admin/categories/${cat.id}`)">Открыть</button>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script>


export default {
  props: ['categories'],
  setup() {

    return {
    }
  }
}
</script>

<style scoped>

</style>