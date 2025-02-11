<template>
  <el-menu background-color="#333" text-color="white" active-text-color="#ffd04b">
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children || item.children.length === 0">
        <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
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
        <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
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
        <!-- 递归调用自己来处理子菜单 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';

// 定义 props 类型
defineProps({
  menuList: {
    type: Array as PropType<RouteRecordRaw[]>,
    required: true,
  },
});

const goRoute = (vc) =>{
    console.log(vc);
}
</script>

<script lang="ts">
export default {
  name: 'Menu', // 设置组件名称，用于递归引用
};
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>