// src/permission/permission.ts

import { useUserStore } from '@/store/modules/UserStore';
import router from '@/router'; // 导入已经创建好的router实例
import nprogress from 'nprogress'; // 确保已安装nprogress
import 'nprogress/nprogress.css'; // 引入nprogress样式
import appConfig from '@/appSetting'; // 正确导入配置对象

// 定义路由前置守卫
router.beforeEach(async (to, from, next) => {
    nprogress.start(); // 开始进度条

    document.title = `${appConfig.title} - ${to.meta.title}`;

    const userStore = useUserStore();
    let constantRoutes = userStore.getConstantRoutes
    let username = userStore.getUsername
    let token = userStore.getToken

    if (!constantRoutes.length && to.path !== '/login') {
        await userStore.loadConstantRoutes();
    }

    // 如果用户未登录且尝试访问非登录页面，则重定向到登录页
    if (!token && to.path !== '/login') {
        console.log('【路由前置守卫】 跳转登录页面');
        next('/login');
    } else {
        try{
            await userStore.getUserInfo();
            next();
        }catch (error){
            // token 过期 需要重新登录
            userStore.logout(); // 先退出登录，清空用户信息
            next('/login');
        }
    }
});

router.afterEach(async (to:any, from:any) => {
    nprogress.done(); // 结束进度条
});