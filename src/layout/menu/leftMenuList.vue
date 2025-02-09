<!-- src/layout/menu/leftMenuList.vue -->
<template>
    <div>
        <!-- 菜单列表 -->
        <el-menu background-color="red" text-color="white" active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">订单管理</el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    权限管理
                </template>
                <el-menu-item index="3-1">用户角色</el-menu-item>
                <el-menu-item index="3-2">角色权限</el-menu-item>
                <el-menu-item index="3-3">接口权限</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4">Orders</el-menu-item>
            <el-menu-item index="5" disabled>退出登录</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
// 如果需要在这里添加逻辑或状态管理，请继续
</script>

<style scoped lang="scss">
    /* 如果需要额外的样式，请在此处添加 */
</style>