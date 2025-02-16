<!-- src/views/home/home.vue -->
<template>
  <div>
    <h1>欢迎来到首页</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

onMounted(async () => {
    try {
        await userStore.getUserInfo();
    } catch (error) {
        console.error('Failed to fetch user info:', error);
    }
});
</script>

<style scoped>
/* 样式 */
</style>