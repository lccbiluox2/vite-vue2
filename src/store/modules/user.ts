// src/store/modules/user.ts

import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user/index'; // 导入获取用户信息的API
import type { LoginForm } from '@/api/user/type';
import { constantRoutes } from '@/router/routers';

interface UserState {
    token: string | null; // 用户唯一标识token
    username: string;
    constantRoutes: any[]; // 假设路由信息是一个数组
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: localStorage.getItem('TOKEN') || null,
        username: '',
        constantRoutes: [], // 初始化为空数组
    }),
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
        getConstantRoutes: (state) => state.constantRoutes,
    },
    actions: {
        async userLogin(data: LoginForm) {
            try {
                console.log('【存储层】 准备登录, data:', data);
                const result = await reqLogin(data);
                console.log('【存储层】 登录调用结果, result:', result);
                if (result.code === 200) {
                    this.token = result.data.token;
                    localStorage.setItem('TOKEN', result.data.token);
                    this.username = data.username;
                    await this.loadConstantRoutes(); // 登录成功后加载常量路由
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
            this.constantRoutes = []; // 清空路由信息
            localStorage.removeItem('TOKEN');
        },

        async getUserInfo() {
            try {
                console.log('【存储层】 准备获取用户信息');
                const result = await reqUserInfo();
                console.log('【存储层】 用户信息', result);
                if (result.code === 200) {
                    this.username = result.data.username;
                    return 'ok';
                } else {
                    console.error('【存储层】 Failed to fetch user info:', result.message);
                    return Promise.reject(new Error(result.message));
                }
            } catch (error) {
                console.error('【存储层】 Error fetching user info:', error);
                return Promise.reject(error);
            }
        },

        setConstantRoutes(routes: any[]) {
            this.constantRoutes = routes;
        },

        async loadConstantRoutes() {
            console.log('【存储层】 准备设置路由信息, constantRoutes:', constantRoutes);
            // 如果路由信息是静态的，可以直接赋值
            this.setConstantRoutes(constantRoutes);

            // 如果路由信息需要通过API获取，则可以在这里进行异步请求
            /*
            try {
                const response = await someApiCallToFetchRoutes();
                this.setConstantRoutes(response.data.routes);
            } catch (error) {
                console.error('Failed to load constant routes:', error);
            }
            */
        }
    },
});