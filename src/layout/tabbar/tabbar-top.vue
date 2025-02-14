<template>
  <div class="tabbar">
    <!-- 左侧区域 -->
    <div class="tabbar_left">
      <!-- 隐藏/显示菜单的图标 -->
      <el-icon @click="toggleMenu" style="cursor:pointer;">
        <Expand />
      </el-icon>

      <!-- 面包屑导航 -->
      <el-breadcrumb separator-icon="ArrowRight" style="display:inline-block; vertical-align:middle; margin-left:10px;">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="{ path: item.path }">{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧区域 -->
    <div class="tabbar_right">
      <!-- 圆形按钮组 -->
      <el-button circle v-for="(btn, idx) in circularButtons" :key="idx" :icon="btn.icon" @click="handleButtonClick(btn.action)"></el-button>

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
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Expand } from '@element-plus/icons-vue';

const props = defineProps({
  breadcrumbItems: Array
});

const circularButtons = ref([
  { icon: "Document", action: "action1" },
  { icon: "Bell", action: "action2" },
  { icon: "Setting", action: "action3" },
  { icon: "User", action: "action4" }
]);

const userAvatar = ref("https://example.com/avatar.png"); // 用户头像URL

function toggleMenu() {
  console.log('菜单切换');
  // 实现菜单的隐藏与显示逻辑
}

function handleButtonClick(action: string) {
  console.log(`按钮点击: ${action}`);
  // 根据不同的action执行相应的操作
}

function logout() {
  console.log('退出登录');
  // 执行退出登录的逻辑
}

function signOut() {
  console.log('注销账户');
  // 执行注销账户的逻辑
}
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


.el-button.is-circle {
  margin-left: 10px;
}
</style>