// src/api/type.ts

// 登录表单数据类型
export interface LoginForm {
    username: string;
    password: string;
}

// 登录接口返回的数据类型
interface DataType {
    token: string;
}

// 用户信息数据类型
export interface UserInfo {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
}

// 服务器返回用户信息相关的数据类型
interface UserResponse {
    checkUser: UserInfo;
}

// 定义服务器返回的数据结构
export interface UserResponseData {
    code: number;
    data: UserResponse;
}
// 用户信息响应数据类型
export interface UserInfoData {
    id: number;
    username: string;
    email: string;
    roles: string[];
}

// 获取用户信息接口返回的数据类型
export interface UserResponseData {
    code: number;
    data: UserInfoData;
    message?: string; // 可选字段，用于错误或成功消息
}