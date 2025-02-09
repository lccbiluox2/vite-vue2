// src/store/modules/user.ts

// 导入 defineStore 函数用于创建 store
import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import type { LoginForm } from '@/api/user/type';



// 定义接口以描述 state 的结构
interface UserState {
    token: string | null; // 用户唯一标识token
    username: string;
}

// 创建用户相关的 store
export const useUserStore = defineStore('user', {
    // 定义 state
    state: (): UserState => ({
        token: localStorage.getItem('ToKEN') || null, // 从本地存储获取 token
        username: '',
    }),

    // 定义 getters
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
    },

    // 定义 actions
    actions: {
        async userLogin(data: LoginForm) {
            try {
                
                // 发送登录请求
                const result = await reqLogin(data);

                // 检查响应码是否为200（成功）
                if (result.code === 200) {
                    // 将 token 存储到 state 和 localStorage 中
                    this.token = result.data.token;
                    localStorage.setItem('ToKEN', result.data.token);

                    // 更新用户名
                    this.username = data.username;

                    return 'ok';
                } else {
                    // 如果登录失败，返回错误信息
                    //return Promise.reject(new Error(result.data.message));
                    return 'ok';
                }
            } catch (error) {
                // 处理请求中的任何异常
                //return Promise.reject(new Error('请求过程中发生错误'));
                return 'ok';
            }
        },

        // 清除用户信息和 token
        logout() {
            this.token = null;
            this.username = '';
            localStorage.removeItem('ToKEN');
        },
    },
});