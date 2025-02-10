// src/router/index.ts

// 导入必要的模块
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from '@/router/routers';

// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式的路由历史记录
  routes: constantRoutes, // 正确地传递路由配置
});

// 导出路由器实例
export default router;