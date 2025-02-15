<template>
  <div class="tabbar">
    <!-- 左侧区域 -->
    <div class="tabbar_left">
      <Breadcrumb :breadcrumbItems="breadcrumbItems" />
    </div>

    <!-- 右侧区域 -->
    <div class="tabbar_right">
      <TopSetting />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Breadcrumb from '@/layout/tabbar/breadcrumb/breadcrumb.vue';
import TopSetting from '@/layout/tabbar/setting/top_setting.vue';

// 组件名称
defineOptions({
  name: "Tabbar"
});

const props = defineProps({
  breadcrumbItems: Array
});
</script>

<style scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%; /* 调整为100%以适应父容器的高度 */
  height: 100%; /* 调整为100%以适应父容器的高度 */
  border-bottom: 1px solid #e6e6e6;
}

.tabbar_left {
  display: flex;
  align-items: center;
  height: 100%; /* 调整为100%以适应父容器的高度 */
  background-color: red;
}

.tabbar_right {
  display: flex;
  align-items: center;
  height: 100%; /* 调整为100%以适应父容器的高度 */
  background-color: pink;
}
</style>