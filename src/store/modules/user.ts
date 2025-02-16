// src/store/modules/user.ts

import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user/index'; // 导入获取用户信息的API
import type { LoginForm } from '@/api/user/type';
import { constantRoutes } from '@/router/routers';

interface UserState {
    token: string | null; // 用户唯一标识token
    username: string;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: localStorage.getItem('TOKEN') || null,
        username: '',
        constantRoutes: constantRoutes,
    }),
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
    },
    actions: {
        async userLogin(data: LoginForm) {
            try {
                console.log('准备登录, data:', data);
                const result = await reqLogin(data);
                console.log('登录调用结果, result:', result);
                if (result.code === 200) {
                    this.token = result.data.token;
                    localStorage.setItem('TOKEN', result.data.token);
                    this.username = data.username;
                    return 'ok';
                } else {
                    return Promise.reject(new Error(result.message));
                }
            } catch (error) {
                console.error('Login failed:', error);
                return Promise.reject(error);
            }
        },
        logout() {
            this.token = null;
            this.username = '';
            localStorage.removeItem('TOKEN');
        },

        async getUserInfo() {
            try {
                console.log('准备获取用户信息');
                const result = await reqUserInfo();
                console.log('用户信息', result);
                if (result.code === 200) {
                    this.username = result.data.username;
                    return 'ok';
                } else {
                    console.error('Failed to fetch user info:', result.message);
                    return Promise.reject(new Error(result.message));
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                return Promise.reject(error);
            }
        },
    },
});