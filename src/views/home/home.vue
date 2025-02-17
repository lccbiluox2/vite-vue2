<!-- src/views/home/home.vue -->
<template>
  <div>
    <h1>欢迎来到首页</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/UserStore';

const userStore = useUserStore();

onMounted(async () => {
    try {
        console.log('【主页面】主页面加载初始化');
        await userStore.getUserInfo();
    } catch (error) {
        console.error('Failed to fetch user info:', error);
    }
});
</script>

<style scoped>
/* 样式 */
</style>