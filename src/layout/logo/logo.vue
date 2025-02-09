<!-- src/layout/logo/logo.vue -->
<template>
    <div class="logo">
        <img src="../../../public/logo.jpg" alt="Logo" />
        <p>硅谷甄选运营平台</p>
    </div>
</template>

<script setup lang="ts">
    // 如果有需要在这里添加的逻辑，可以在此处编写
</script>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Logo'
    });
</script>

<style scoped lang="scss">
    .logo {
        width: 100%;
        height: $base-menu-logo-height;
        color: white;
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
            font-size: 1.2em;
        }
    }
</style>