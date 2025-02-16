// D:\lcc\IdeaProject\vite\vite-vue2\src\api\user\index.ts

import request from '@/api/request';
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type';

enum API {
    LOGIN_URL = "/api/user/login",
    USERINFO_URL = "/api/user/info"
}

export const reqLogin = (data: loginForm) =>
    request.post<any,loginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
    request.get<any, userResponseData>(API.USERINFO_URL);