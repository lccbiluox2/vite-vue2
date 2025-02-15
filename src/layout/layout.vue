<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <el-aside :style="{ width: baseMenuWidth }" class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#333" text-color="white">
          <Menu :menuList="userStore.constantRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="main_container">
      <!-- 顶部导航（二级菜单） -->
      <el-header class="layout_tabbar">
        <Tabbar :breadcrumbItems="breadcrumbItems"></Tabbar> <!-- 传递面包屑数据 -->
      </el-header>

      <!-- 内容展示区域 -->
      <el-main class="layout_main">
        <router-view></router-view> <!-- 添加此行以显示匹配的路由组件 -->
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Logo from '@/layout/logo/logo.vue'; // 直接导入整个组件
import Menu from '@/layout/menu/leftMenuList.vue'; // 导入菜单组件
import Tabbar from '@/layout/tabbar/tabbar-top.vue'; // 导入菜单组件
import { useUserStore } from '@/store/modules/user';
import { useRoute } from 'vue-router';

// 示例变量，实际应用中可以从配置或状态管理中获取
const baseMenuWidth = ref('200px'); // 左侧菜单宽度

// 使用 Pinia 状态管理中的 user store
const userStore = useUserStore();

// 获取当前路由对象
const route = useRoute();


// 组件名称
defineOptions({
  name: "Layout"
});

// 计算面包屑路径
const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(record => record.meta.title);
  return matched.map((item) => ({
    title: item.meta.title as string,
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

.layout_main {
  padding: 20px;
  flex-grow: 1; /* 让主要内容区域能够根据可用空间增长 */
}
</style>