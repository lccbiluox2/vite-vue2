import { createApp } from 'vue';
import './style.css';
import type { App as _App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router'; // 导入上面定义的路由器
import pinia from './store'; // 导入上面定义的 Pinia 实例
import globalComponentsPlugin from '@/components/index'; // 路径根据实际情况调整

console.log('所有环境变量:', import.meta.env);

// 开发环境特定的配置和初始化
const setupForDevelopment = async (app: _App) => {
    if (import.meta.env.VITE_USER_NODE_ENV === 'development') {
        console.log('Running in development mode.');

        // 动态导入 mock 数据初始化脚本
        await import('@/mock');

        console.log(import.meta.env.VITE_APP_API_URL); // 打印 API URL
        console.log(import.meta.env.VITE_APP_DEBUG);   // 打印 DEBUG 标志
        console.log(import.meta.env);                   // 打印所有的环境变量
    }
};

// 生产环境特定的配置和初始化
const setupForProduction = (app: _App) => {
    if (import.meta.env.NODE_ENV === 'production') {
        console.log('Running in production mode.');

        // 这里可以添加针对生产环境的额外配置或初始化
    }
};

const initializeApp = async () => {
    console.log('【主程序】准备初始化app');
    const app = createApp(App);

    console.log('【主程序】设置组件');
    // 使用 Element Plus、路由、Pinia 和全局组件插件
    app.use(ElementPlus);
    app.use(router);
    app.use(pinia);
    app.use(globalComponentsPlugin);

    // 根据当前环境执行相应的初始化步骤
    console.log('【主程序】根据当前环境执行相应的初始化步骤 ', import.meta.env.VITE_USER_NODE_ENV);
    await setupForDevelopment(app);
    setupForProduction(app);

    // 挂载应用
    app.mount('#app');
};

initializeApp().catch(err => {
    console.error('Failed to initialize the application:', err);
});