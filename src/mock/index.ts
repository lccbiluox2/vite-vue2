// src/mock/index.ts

import mockData from './user';
import Mock from 'mockjs';

// 遍历 mockData 数组并注册每个模拟接口
mockData.forEach(mock => {
    Mock.mock(new RegExp(mock.url), mock.method, mock.response);
});