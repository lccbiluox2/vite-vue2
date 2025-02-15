<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <el-aside :style="{ width: baseMenuWidth }" class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <Menu :menuList="userStore.constantRoutes"></Menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="main_container">
      <!-- 顶部导航（二级菜单） -->
      <el-header class="layout_tabbar">
        <Tabbar :breadcrumbItems="breadcrumbItems"></Tabbar> <!-- 传递面包屑数据 -->
      </el-header>

      <!-- 内容展示区域 -->
      <MainContent />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Logo from '@/layout/logo/logo.vue'; // 直接导入整个组件
import Menu from '@/layout/menu/leftMenuList.vue'; // 导入菜单组件
import Tabbar from '@/layout/tabbar/tabbar-top.vue'; // 导入菜单组件
import MainContent from '@/layout/main/mainContent.vue'; // 导入新的内容展示组件
import { useUserStore } from '@/store/modules/user';
import { useRoute } from 'vue-router';
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入自定义 store

const layoutSettingStore = useLayoutSettingStore(); // 使用自定义 store
const userStore = useUserStore();
const route = useRoute();

// 动态计算左侧菜单宽度
const baseMenuWidth = computed(() => layoutSettingStore.isFolded ? '64px' : '200px');

// 计算面包屑路径
const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(record => record.meta.title);
  return matched.map((item) => ({
    title: item.meta.title as string,
    icon: item.meta.icon as string,
    path: item.path
  }));
});
</script>

<style scoped lang="scss">
.layout_container {
  display: flex;
  height: 100vh; /* 确保容器高度为视口高度 */
  width: 100%; /* 使用百分比确保宽度占据整个父元素的宽度 */
}

.main_container {
  display: flex;
  flex-direction: column;
  width: calc(100% - v-bind(baseMenuWidth)); /* 根据左侧菜单宽度动态调整宽度 */
  height: 100%; /* 占满剩余空间 */
}

.layout_slider {
  background-color: #333; /* 使用正确的颜色变量 */
  transition: width .3s; /* 添加过渡效果 */

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }
}

.layout_tabbar {
  padding-left: 0; /* 移除默认的padding-left */
  background-color: green;
  position: sticky;
  top: 0;
  z-index: 1000; /* 确保在滚动时保持顶部 */
  height: 60px; /* 设置固定高度 */
}
</style>