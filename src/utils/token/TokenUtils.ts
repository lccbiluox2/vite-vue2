// src/utils/token/TokenUtils.ts

/**
 * 存储token到本地存储
 * @param token - 要存储的token字符串
 */
export const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token);
};

/**
 * 从本地存储获取token
 * @returns 返回存储的token，如果不存在则返回null
 */
export const getToken = (): string | null => {
    return localStorage.getItem('TOKEN');
};

/**
 * 从本地存储删除token
 */
export const removeToken = () => {
    localStorage.removeItem('TOKEN');
};