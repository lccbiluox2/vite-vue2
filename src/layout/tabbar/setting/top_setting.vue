<template>
  <div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const circularButtons = ref([
  { icon: "Document", action: "action1" },
  { icon: "Bell", action: "action2" },
  { icon: "Setting", action: "action3" },
  { icon: "User", action: "action4" }
]);

const userAvatar = ref("https://example.com/avatar.png"); // 用户头像URL

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
/* 根据需要添加样式 */
</style>
``