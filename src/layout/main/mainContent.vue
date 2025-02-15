<template>
  <el-main :class="['layout_main', { 'fullscreen': isFullScreen }]">
    <router-view v-if="!needRefresh"></router-view> <!-- 添加此行以显示匹配的路由组件 -->
    <div v-else @animationend="onRefreshAnimationEnd">正在刷新...</div>
  </el-main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting';

const layoutSettingStore = useLayoutSettingStore(); // 使用自定义 store

// 监听是否需要刷新
const needRefresh = computed(() => layoutSettingStore.needRefresh);

// 是否处于全屏模式
const isFullScreen = ref(false);

// 刷新动画结束后的处理
function onRefreshAnimationEnd() {
  layoutSettingStore.setLayoutMainRefresh(false); // 清除刷新标志
}

// 设置全屏模式
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.querySelector('.layout_main')?.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 监听全屏状态变化
import { onMounted } from 'vue';

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullScreen.value = !!document.fullscreenElement;
  });
});
</script>

<style scoped lang="scss">
.layout_main {
  padding: 20px;
  flex-grow: 1; /* 让主要内容区域能够根据可用空间增长 */
  transition: all 0.3s ease;

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: white;
    padding: 0;
  }

  > div {
    animation: fadeIn 1s;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>