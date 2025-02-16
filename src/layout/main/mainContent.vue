<template>
  <el-main :class="['layout_main', { 'fullscreen': isFullScreen }]">
    <transition name="fade">
      <div v-if="!needRefresh">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <div v-else key="refresh" @animationend="onRefreshAnimationEnd">正在刷新...</div>
    </transition>
  </el-main>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting';

const layoutSettingStore = useLayoutSettingStore();

const needRefresh = computed(() => layoutSettingStore.needRefresh);

const isFullScreen = ref(false);

function onRefreshAnimationEnd() {
  layoutSettingStore.setLayoutMainRefresh(false);
}

// 监听全屏状态变化
import { onMounted } from 'vue';

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullScreen.value = !!document.fullscreenElement;
  });
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>