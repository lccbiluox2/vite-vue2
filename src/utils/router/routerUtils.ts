// src/utils/router/routerUtils.ts

import router from '@/router'; // 导入已存在的router实例

// 定义一个函数来执行路由跳转
export function routerPush(path: string) {
    router.push(path);
}