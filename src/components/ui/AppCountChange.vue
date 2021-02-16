<template>
  <button class="btn danger" @click="remove" :disabled="currentCount===0">-</button>
  <strong>{{ currentCount }}  </strong>
  <button class="btn primary" @click="add" :disabled="currentCount===maxCount">+</button>
</template>

<script>
import {ref} from 'vue'
export default {
  emits: ['changeValue'],
  props: {
    count: {
      type: Number,
      required: true,
      default: 0
    },
    maxCount: {
      type: Number,
      required: true,
    }
  },
  setup(props, {emit}){
    const currentCount = ref(props.count)

    const remove = () => {
      if(currentCount.value > 0) {
        currentCount.value --
        emit('changeValue', currentCount.value)
      }
    }
    const add = () => {
      if(currentCount.value < props.maxCount) {
        currentCount.value ++
        emit('changeValue', currentCount.value)
      }
    }
    return{
      currentCount,
      remove,
      add
    }
  }
}
</script>

<style scoped>

</style>