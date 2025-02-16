// D:\lcc\IdeaProject\vite\vite-vue2\src\api\user\index.ts

import request from '@/api/request';
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type';

enum API {
    LOGIN_URL = "/api/user/login",
    USERINFO_URL = "/api/user/info"
}

export const reqLogin = (data: loginForm) => {
    console.log('准备发送登录请求, 参数:', data); // 打印传入的参数
    return request.post<any, loginResponseData>(API.LOGIN_URL, data)
        .then(response => {
            console.log('登录请求响应:', response); // 打印响应数据
            return response;
        })
        .catch(error => {
            console.error('登录请求失败:', error); // 打印错误信息
            throw error;
        });
};

export const reqUserInfo = () => {
    console.log('准备发送获取用户信息请求'); // 打印请求开始的信息
        return request.get(API.USERINFO_URL, {
            // 如果你需要在这里添加额外的 headers，可以这样操作
            headers: {'Custom-Header': 'value'}
        })
        .then(response => {
            console.log('获取用户信息请求响应:', response); // 打印响应数据
            return response;
        })
        .catch(error => {
            console.error('获取用户信息请求失败:', error); // 打印错误信息
            throw error;
        });
};