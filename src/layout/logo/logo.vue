<template>
    <div class="logo">
        <img :src="appConfig.logo" :alt="appConfig.title" />
        <p>{{ appConfig.title }}</p>
    </div>
</template>

<script setup lang="ts">

import { defineComponent } from 'vue';
import appConfig from '@/AppSetting'; // 正确导入配置对象


// 组件名称
defineOptions({
  name: "Logo"
});

</script>

<style scoped lang="scss">
    .logo {
        width: 100%;
        height: $base-menu-logo-height;
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;

        img {
            width: 40px;
            margin-right: 10px;
        }

        p {
            margin: 0;
            font-size: 10px;
            color: white;
        }
    }
</style>