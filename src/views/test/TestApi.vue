<template>
  <!-- 使用 count 变量显示点击次数 -->
  <button @click="increment">Clicked {{ count }} times.</button>
</template>

<script>
// 导入 ref 函数来创建响应式引用
import { ref } from 'vue'

export default {
  // setup 函数是 Vue 3 组合式 API 的入口点
  setup() {
    // 使用 ref 创建一个名为 count 的响应式引用，初始值为 0
    const count = ref(0)

    // 定义 increment 方法来增加 count 的值
    function increment() {
      // 在 JavaScript 中访问或修改 ref 的值需要通过 .value 属性
      count.value++
    }

    // 返回的对象让模板可以访问 `count` 和 `increment`
    return {
      count,      // 模板可以访问 `{{ count }}`
      increment   // 模板可以调用 `@click="increment"`
    }
  }
}
</script>

<style scoped>
/* 可选：添加一些样式 */
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: white;
}
</style>