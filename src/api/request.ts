import axios from 'axios';

// 获取环境变量中的API基础URL
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const config = {
    baseURL: API_BASE_URL, // 使用环境变量定义的基础URL
    timeout: 20000, // 20 seconds
    withCredentials: true,
};

class RequestHttp {
    service;

    constructor(config) {
        this.service = axios.create(config);

        // 请求拦截器
        this.service.interceptors.request.use(
            config => ({
                ...config,
                headers: { Authorization: 'Bearer ' + (localStorage.getItem('token') || '') }, // 使用本地存储的token
            }),
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

// 确保这里导出的是你想要使用的实例
export default new RequestHttp(config);