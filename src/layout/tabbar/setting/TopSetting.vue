<template>
  <div>
    <!-- 圆形按钮组 -->
    <el-button size="small" :icon="Refresh" circle @click="refreshContent"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="toggleFullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>

    <!-- 用户头像及下拉菜单 -->
    <el-dropdown trigger="click" style="margin-left:20px;">
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" :src="userAvatar">ccc</el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
          <el-dropdown-item @click="signOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入Pinia store
import { Refresh, FullScreen } from '@element-plus/icons-vue'; // 假设使用Element Plus图标
import { useUserStore } from '@/store/modules/UserStore';

const userStore = useUserStore();

// 获取全局事件总线或通过其他方式获取通信方法
const layoutSettingStore = useLayoutSettingStore();

const userAvatar = ref("https://example.com/avatar.png"); // 用户头像URL

function refreshContent() {
  console.log('刷新内容');
  layoutSettingStore.refreshLayoutMain(); // 调用store中的方法来通知刷新
}

function toggleFullScreen() {
  console.log('切换全屏');
  let full = document.fullscreenElement;
  if(full){
    document.exitFullscreen();
  }else{
    document.documentElement.requestFullscreen();
  }
}

function logout() {
  console.log('退出登录，准备向服务器发送请求');
  // 执行退出登录的逻辑
  userStore.logout();
}

function signOut() {
  console.log('注销账户');
  // 执行注销账户的逻辑
}
</script>

<style scoped>
/* 根据需要添加样式 */
</style>