// src/api/request.ts

import axios from 'axios';
import { useUserStore } from '@/store/modules/user'; // 引入用户store
import { ElMessage } from 'element-plus'; // 局部引入 ElMessage

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const config = {
    baseURL: API_BASE_URL,
    timeout: 20000,
    withCredentials: true,
};

class RequestHttp {
    service;

    constructor(config) {
        this.service = axios.create(config);

        // 请求拦截器
       // 请求拦截器
       this.service.interceptors.request.use(
           config => {
               const userStore = useUserStore(); // 获取用户store实例
               const token = userStore.getToken; // 从store中获取token
               if(token) { // 检查 token 是否存在
                   config.headers.Authorization = 'Bearer ' + token;
               }
               return config;
           },
           error => Promise.reject(error)
       );

        // 响应拦截器
        this.service.interceptors.response.use(
            response => {
                const { data } = response;
                if (data.code === 600) localStorage.setItem('token', '');
                if (data.code && data.code !== 200) ElMessage.error(data.message || '未知错误');
                return data;
            },
            error => {
                if (error.response) this.handleCode(error.response.status);
                if (!window.navigator.onLine) ElMessage.error('网络请求失败');
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

    get(url, params) {
        return this.service.get(url, { params });
    }

    post(url, params) {
        return this.service.post(url, params);
    }

    put(url, params) {
        return this.service.put(url, params);
    }

    delete(url, params) {
        return this.service.delete(url, { params });
    }
}

export default new RequestHttp(config);