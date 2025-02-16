import mockData from './user';
import Mock from 'mockjs';

// 注册 mockData 中的每一个接口
mockData.forEach(mock => {
    console.log('【Mock API】参数:', mock);
    console.log('【Mock API】参数: ',import.meta.env.VITE_APP_API_URL_PREFIX,' ', mock.url );
    // 手动指定基础路径 /api
    Mock.mock(new RegExp(`^${import.meta.env.VITE_APP_API_URL_PREFIX}${mock.url}$`), mock.method, function(options) {
        console.log('【Mock API】收到请求:', options);
        return mock.response(options);
    });
});