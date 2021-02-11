<template>
  <div class="paginate wrapper">
<!--    <ul>
      <li>
        <router-link to="?page=prev">
          <a @click="prevPage" >« Назад</a>
        </router-link>
      </li>
      <li v-for="(page) in numberOfPages" :key="page">
        <router-link :to="`?page=${page}`" >
          <span>{{page}}</span>
          <a :class="pageNumber === page ? 'active' : ''">{{page}}</a>
        </router-link>
      </li>

      <li>
        <router-link to="?_page=next">
        <a @click="nextPage">
          Следующая »
        </a>
      </router-link></li>
    </ul>-->
  </div>
</template>

<script>
import {computed, ref} from "vue"

export default {
  emits: ['paginated'],
  props: {
    dataList: {
      type:Array,
      required: true
    },
    listSize: {
      type: Number,
      required: false,
      default: 10
    }
  },

  setup(props, {emit}) {
    console.log(props)
    const pageNumber = ref(1)

    const numberOfPages = computed(() => {
      return Math.ceil(props.dataList.length/props.listSize)
    })

    const nextPage = function () {
      if(pageNumber.value < numberOfPages.value) {
        pageNumber.value++
      }

    }
    const prevPage = function () {
      if(pageNumber.value > 0) {
        pageNumber.value--
      }
    }

    const paginated = computed(() => {
      const start = pageNumber.value * props.listSize - props.listSize
      console.log(start)
      const end = start + props.listSize
      return props.dataList.slice(start, end)
    })
    emit('paginated', paginated)

    return {
      pageNumber,
      prevPage,
      nextPage,
      numberOfPages
    }
  }
}
</script>

<style scoped>

</style>