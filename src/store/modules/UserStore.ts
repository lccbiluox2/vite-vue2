// src/store/modules/UserStore.ts

import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user/userApi'; // 导入获取用户信息的API
import type { LoginForm } from '@/api/user/type';
import { constantRoutes } from '@/router/routers';
import { setToken, getToken, removeToken } from '@/utils/token/TokenUtils'; // 引入新的token工具函数
import { routerPush } from '@/utils/router/routerUtils'; // 引入路由跳转函数

interface UserState {
    token: string | null; // 用户唯一标识token
    username: string;
    avatar: string;
    constantRoutes: any[]; // 假设路由信息是一个数组
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: getToken() || null, // 使用getToken方法初始化token
        username: '',
        avatar: '',
        constantRoutes: [], // 初始化为空数组
    }),
    getters: {
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
        getAvatar: (state) => state.avatar,
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
                    setToken(result.data.token); // 使用setToken方法设置token
                    this.username = result.data.username;
                    this.avatar = result.data.avatar;
                    console.log('【存储层】 设置用户登录信息, token:', this.token,' username:',this.username,' avatar:',this.avatar);
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
            console.log('【存储层】 退出登录, 清空数据');
            this.token = null;
            this.username = '';
            this.avatar = '';
            this.constantRoutes = []; // 清空路由信息
            removeToken(); // 使用removeToken方法移除token
            routerPush('/login'); // 使用routerPush进行跳转
        },

        async getUserInfo() {
            try {
                console.log('【存储层】 准备获取用户信息');
                const result = await reqUserInfo();
                console.log('【存储层】 用户信息', result);
                if (result.code === 200) {
                    this.username = result.data.username;
                    this.avatar = result.data.avatar;
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