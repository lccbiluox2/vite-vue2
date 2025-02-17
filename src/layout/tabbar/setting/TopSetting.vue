<template>
  <div class="user-info-container">
    <!-- 圆形按钮组 -->
    <el-button size="small" :icon="Refresh" circle @click="refreshContent"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="toggleFullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>

    <!-- 用户头像及下拉菜单 -->
    <el-dropdown trigger="click" v-if="isLoggedIn" class="user-dropdown">
      <div class="user-info">
        <el-avatar shape="circle" :size="40" :src="userAvatar" class="user-avatar"></el-avatar>
        <span class="username">{{ usernameToShow }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting'; // 引入Pinia store
import { Refresh, FullScreen } from '@element-plus/icons-vue'; // 假设使用Element Plus图标
import { useUserStore } from '@/store/modules/UserStore';

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();

// 使用计算属性来获取用户名和头像URL
const isLoggedIn = computed(() => !!userStore.getToken);

// 修改这里以返回用户名的前5个字符，如果不足5个字符则返回全部
const usernameToShow = computed(() => {
  const username = userStore.getUsername;
  return username.length > 5 ? username.substring(0, 5) : username;
});

const userAvatar = computed(() => userStore.getAvatar || "https://example.com/avatar.png");

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

onMounted(() => {
  // 可以在这里检查用户是否已经登录并加载相关信息
  if (!userStore.getToken) {
    // 如果没有token，则可能需要重定向到登录页面或其他操作
  }
});
</script>

<style scoped>
.user-info-container {
  display: flex;
  align-items: center;
}

.user-dropdown {
  margin-left: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 8px; /* 给头像和用户名之间添加一些间距 */
}

.username {
  font-size: 14px;
  line-height: 40px; /* 确保文本垂直居中 */
}
</style>