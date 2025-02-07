// src/store/index.ts

// 导入 createPinia 函数
import { createPinia } from 'pinia';

// 创建 Pinia 实例
const pinia = createPinia();

// 对外暴露 Pinia 实例，以便在应用中使用
export default pinia;