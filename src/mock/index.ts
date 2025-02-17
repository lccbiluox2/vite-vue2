import mockData from './user';
import Mock from 'mockjs';

// 注册 mockData 中的每一个接口
mockData.forEach(mock => {
    console.log('【Mock API】参数:', mock);
    console.log('【Mock API】参数: ', import.meta.env.VITE_APP_API_URL_PREFIX, ' ', mock.url);

    // 确保HTTP方法是小写的
    const method = mock.method.toLowerCase();

    // 使用正则表达式来匹配带有基础路径的URL
    Mock.mock(new RegExp(`^${import.meta.env.VITE_APP_API_URL_PREFIX}${mock.url}$`), method, function(options) {
        console.log('【Mock API】收到请求:', options);

        // 打印完整的请求头以调试
        console.log('【Mock API】完整请求头:', JSON.stringify(options.headers, null, 2));

        // 调用响应函数，传递请求选项
        return mock.response(options);
    });
});