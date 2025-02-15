<template>
  <div>
    <!-- 隐藏/显示菜单的图标 -->
    <el-icon @click="toggleMenu" style="cursor:pointer;">
      <Expand />
    </el-icon>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight" style="display:inline-block; vertical-align:middle; margin-left:10px;">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="{ path: item.path }">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue';
import { defineProps } from 'vue';

const props = defineProps({
  breadcrumbItems: Array
});

function toggleMenu() {
  console.log('菜单切换');
  // 实现菜单的隐藏与显示逻辑
}
</script>

<style scoped>
/* 根据需要添加样式 */
</style>