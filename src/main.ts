// src/main.ts

import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router'; // 导入上面定义的路由器
import pinia from './store'; // 导入上面定义的 Pinia 实例

const loadMockServer = async () => {
    if (process.env.NODE_ENV === 'development') {
        await import('@/mock'); // 动态导入 mock 数据初始化脚本
    }
};

loadMockServer().then(() => {
    const app = createApp(App);

    console.log(import.meta.env.VITE_APP_API_URL); // 打印 API URL
    console.log(import.meta.env.VITE_APP_DEBUG);   // 打印 DEBUG 标志
    console.log(import.meta.env);                   // 打印所有的环境变量

    app.use(ElementPlus);
    app.use(router);
    app.use(pinia);

    app.mount('#app');
});