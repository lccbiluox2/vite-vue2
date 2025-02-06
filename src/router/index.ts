// src/router/index.ts

// 导入必要的模块
import { createRouter, createWebHashHistory } from 'vue-router';

// 定义路由配置
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 动态导入登录页面组件
    name: 'login', // 命名路由
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'), // 动态导入主页组件
    name: 'home', // 命名路由
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'), // 动态导入404页面组件
    name: 'not-found', // 更具描述性的命名
  },
  {
    path: '/:pathMatch(.*)*', // 匹配所有未定义的路径
    component: () => import('@/views/404/index.vue'), // 直接指向404页面组件
    name: 'any', // 这个名字可以更具体一点，比如'catch-all'
  },
];

// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式的路由历史记录
  routes, // 上面定义的路由配置
});

// 导出路由器实例
export default router;