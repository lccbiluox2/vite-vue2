// src/permission/permission.ts

import { useUserStore } from '@/store/modules/UserStore';
import router from '@/router'; // 导入已经创建好的router实例
import nprogress from 'nprogress'; // 确保已安装nprogress
import 'nprogress/nprogress.css'; // 引入nprogress样式

// 定义路由前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start(); // 开始进度条
    const userStore = useUserStore();

    if (!userStore.getConstantRoutes.length && to.path !== '/login') {
        await userStore.loadConstantRoutes();
    }

    // 如果用户未登录且尝试访问非登录页面，则重定向到登录页
    if (!userStore.getToken && to.path !== '/login') {
        console.log('【路由前置守卫】 跳转登录页面');
        next('/login');
    } else {
        next();
    }
});

router.afterEach(async (to:any, from:any) => {
    nprogress.done(); // 结束进度条
});