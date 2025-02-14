<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const doubleCount = computed(() => {
  return count.value * 2
})

// 正确示例：通过修改依赖项来更新计算属性
function incrementCount() {
  count.value++
}
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Double Count: {{ doubleCount }}</p>
  <button @click="incrementCount">Increment Count</button>
</template>