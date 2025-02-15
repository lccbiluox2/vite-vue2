<template>
  <div>
    <!-- 隐藏/显示菜单的图标 -->
    <el-icon style="cursor:pointer; margin-right:10px;" @click="toggleMenu">
      <component :is="fold ? 'Fold' : 'Expand'" />
    </el-icon>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-icon="ArrowRight" style="display:inline-block; vertical-align:middle;">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="{ path: item.path }">
        <span v-if="item.icon" class="icon-margin"> <!-- 应用了CSS类 -->
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
        </span>
        <span> {{ item.title }} </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Expand, Fold } from '@element-plus/icons-vue';
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入自定义 store

// 定义一个响应式数据控制图标切换
const fold = ref(false); // 用于控制菜单折叠还是打开图标切换变量

const props = defineProps({
  breadcrumbItems: Array
});

// 使用自定义 store
const layoutSettingStore = useLayoutSettingStore();

function toggleMenu() {
  fold.value = !fold.value;
  layoutSettingStore.toggleFold(); // 切换菜单折叠状态
}
</script>

<style scoped>
.icon-margin {
  margin-right: 8px; /* 根据你的喜好调整 */
}
</style>