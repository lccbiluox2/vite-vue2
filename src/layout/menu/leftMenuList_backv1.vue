<template>
  <el-menu background-color="#333" text-color="white" active-text-color="#ffd04b">
    <template v-for="(item, index) in menuList" :key="index">
      <!-- 如果没有子菜单 -->
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path">
        <span>{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 如果有且仅有一个子菜单 -->
      <el-menu-item v-else-if="item.children && item.children.length === 1" :index="item.children[0].path">
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>

      <!-- 如果有多个子菜单 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

// 定义 props 类型
const props = defineProps({
  menuList: {
    type: Array as PropType<RouteRecordRaw[]>,
    required: true,
  },
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>