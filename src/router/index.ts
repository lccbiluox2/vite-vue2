// src/router/index.ts

import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from '@/router/routers';

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
});

export default router;