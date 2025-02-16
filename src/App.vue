<script setup lang="ts">
    import HelloWorld from '@/components/HelloWorld.vue'
    import { Plus } from '@element-plus/icons-vue'
    import request from '@/api/request' // ʹ��Ĭ�ϵ���
    import { onMounted, ref } from 'vue'
    import axios from 'axios';

    const clusters = ref([])


</script>


<template>
    <div id="app">
        <router-view></router-view> <!-- 显示匹配的组件 -->
    </div>
</template>

<style scoped>

/* 确保html和body也占满整个视口 */
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: red;
    }

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
}
</style>
