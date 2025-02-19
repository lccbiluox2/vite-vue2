// src/api/request.ts

import axios from 'axios';
import { useUserStore } from '@/store/modules/UserStore'; // 引入用户store
import { ElMessage } from 'element-plus'; // 局部引入 ElMessage

const VITE_APP_API_URL_PREFIX = import.meta.env.VITE_APP_API_URL_PREFIX;

const config = {
    baseURL: VITE_APP_API_URL_PREFIX,
    timeout: 20000,
    withCredentials: true, // 确保允许携带凭证
};

class RequestHttp {
    service;

    constructor(config) {
        this.service = axios.create(config);

        // 请求拦截器
        this.service.interceptors.request.use(
            config => {
//                 console.log('【请求拦截器】准备执行请求拦截器');
                const userStore = useUserStore(); // 获取用户store实例
                const token = userStore.getToken; // 从store中获取token
                if(token) { // 检查 token 是否存在
                    console.log('【请求拦截器】将token设置到响应头:', token);
                    config.headers.Authorization = 'Bearer ' + token;
                } else {
                    console.warn('【请求拦截器】Token is not available in the store.');
                }
//                 console.log('【请求拦截器】请求配置:', config); // 打印完整的请求配置，包括headers
                return config;
            },
            error => Promise.reject(error)
        );

        // 响应拦截器
        this.service.interceptors.response.use(
            response => {
                console.log('【响应拦截器】准备执行响应拦截器');
//                 console.log('【响应拦截器】响应头:', response.headers); // 打印响应头
                const { data } = response;
                if (data.code === 600) localStorage.setItem('token', '');
                if (data.code && data.code !== 200) ElMessage.error(data.message || '未知错误');
                return data;
            },
            error => {
                if (error.response) {
//                     console.log('【响应拦截器】响应头（错误）:', error.response.headers); // 打印错误响应头
                    console.error('【响应拦截器】响应数据（错误）:', error.response.data); // 打印错误响应数据
                    this.handleCode(error.response.status);
                }
                if (!window.navigator.onLine) ElMessage.error('网络请求失败');
                console.error('【响应拦截器】请求错误:', error); // 打印详细的错误信息
                return Promise.reject(error);
            }
        );
    }

    handleCode(code) {
        switch (code) {
            case 401:
                ElMessage.error('登录失败，请重新登录');
                break;
            default:
                ElMessage.error('请求失败');
        }
    }

    get(url, params = {}) {
        console.log('【通用请求】准备执行通用GET请求 url:', url, ' params:', params);
        return this.service.get(url, { params }).then(response => {
            console.log('【通用请求】响应头:', response.headers); // 打印响应头
            return response;
        }).catch(error => {
            console.error('【通用请求】请求错误:', error);
            throw error;
        });
    }

    post(url, data = {}, config = {}) {
        console.log('【通用请求】准备执行通用POST请求 url:', url, ' data:', data);
        return this.service.post(url, data, config).then(response => {
            console.log('【通用请求】响应头:', response.headers); // 打印响应头
            return response;
        }).catch(error => {
            console.error('【通用请求】请求错误:', error);
            throw error;
        });
    }

    put(url, data = {}, config = {}) {
        console.log('【通用请求】准备执行通用PUT请求 url:', url, ' data:', data);
        return this.service.put(url, data, config).then(response => {
            console.log('【通用请求】响应头:', response.headers); // 打印响应头
            return response;
        }).catch(error => {
            console.error('【通用请求】请求错误:', error);
            throw error;
        });
    }

    delete(url, config = {}) {
        console.log('【通用请求】准备执行通用DELETE请求 url:', url);
        return this.service.delete(url, config).then(response => {
            console.log('【通用请求】响应头:', response.headers); // 打印响应头
            return response;
        }).catch(error => {
            console.error('【通用请求】请求错误:', error);
            throw error;
        });
    }
}

export default new RequestHttp(config);