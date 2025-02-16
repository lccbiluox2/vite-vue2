import mockData from './user';
import Mock from 'mockjs';

console.log('【Mock API】这里需要加一个前缀/api，需要与.env文件中的VITE_APP_API_URL统一');
// 注册 mockData 中的每一个接口
mockData.forEach(mock => {
    console.log('【Mock API】参数:', mock);
    // 手动指定基础路径 /api
    Mock.mock(new RegExp(`^/api${mock.url}$`), mock.method, mock.response);
});