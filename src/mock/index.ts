// src/mock/index.ts

import mockData from './user';
import Mock from 'mockjs';

// ���� mockData ���鲢ע��ÿ��ģ��ӿ�
mockData.forEach(mock => {
    Mock.mock(new RegExp(mock.url), mock.method, mock.response);
});