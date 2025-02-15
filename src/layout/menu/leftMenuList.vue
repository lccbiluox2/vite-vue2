<template>
  <el-menu
    :collapse="layoutSettingStore.isFolded"
    background-color="#333"
    text-color="white"
    active-text-color="#ffd04b">
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" @click="goRoute(item.path)">
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 有子路由 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item :index="subItem.path" @click="goRoute(subItem.path)">
            <el-icon v-if="subItem.meta.icon">
              <component :is="subItem.meta.icon"></component>
            </el-icon>
            <span>{{ subItem.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入自定义 store
import { useRouter } from 'vue-router';
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

// 定义 props 类型
const props = defineProps({
  menuList: {
    type: Array as PropType<RouteRecordRaw[]>,
    required: true,
  },
});

const router = useRouter();
const layoutSettingStore = useLayoutSettingStore(); // 使用自定义 store

const goRoute = (path: string) => {
  router.push(path);
};
</script>

<script lang="ts">
import { ref, defineOptions } from 'vue';
// 组件名称
defineOptions({
  name: "Menu"
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>