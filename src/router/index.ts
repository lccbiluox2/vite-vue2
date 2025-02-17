// src/router/index.ts

import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from '@/router/routers';
import { useUserStore } from '@/store/modules/UserStore';

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.getConstantRoutes.length && to.path !== '/login') {
    await userStore.loadConstantRoutes();
  }

  // 如果用户未登录且尝试访问非登录页面，则重定向到登录页
  if (!userStore.getToken && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;