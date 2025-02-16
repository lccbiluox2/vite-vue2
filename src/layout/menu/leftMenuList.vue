<template>
  <el-menu
    :collapse="layoutSettingStore.isFolded"
    background-color="#333"
    text-color="white"
    active-text-color="#ffd04b">
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children || item.children.length === 0">
        <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute(item.path)">
          <template #title>
            <el-icon v-if="item.meta.icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有子路由但是只有一个子路由 -->
      <template v-else-if="item.children && item.children.length === 1">
        <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute(item.children[0].path)">
          <template #title>
            <el-icon v-if="item.children[0].meta.icon">
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有子路由且个数大于一个 -->
      <el-sub-menu :index="item.path" v-else-if="item.children && item.children.length > 1">
        <template #title>
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归调用自己来处理子菜单，并确保传递 menuList -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入自定义 store

defineProps({
  menuList: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [],
  },
});

const router = useRouter();
const layoutSettingStore = useLayoutSettingStore(); // 使用自定义 store

const goRoute = (path: string) => {
  router.push(path);
};
</script>

<script lang="ts">
export default {
  name: 'Menu', // 设置组件名称，用于递归引用
};
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>