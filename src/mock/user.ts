function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4a3211',
            username: 'admin', // 注意这里的用户名是小写的 "admin"
            password: '123456',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token'
        },
        {
            userId: 2,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4a3212',
            username: 'system',
            password: '123456',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'System Token'
        }
    ];
}

export default [
    // 用户登录接口
    {
        url: '/user/login',
        method: 'post',
        response: ({ body, type, url, headers }) => {
            console.log('【用户登录接口】收到请求');
            console.log('【用户登录接口】请求 URL:', url);
//             console.log('【用户登录接口】请求类型:', type);
//             console.log('【用户登录接口】请求头:', JSON.stringify(headers, null, 2));
//             console.log('【用户登录接口】收到用户登录请求, 原始body:', JSON.parse(body)); // 打印原始body对象
//             console.log('【用户登录接口】收到用户登录请求, body stringified:', JSON.stringify(body, null, 2)); // 更详细的日志

            // 这里必须自己mock一下，因为这里默认拿到的是字符串，不然无法获取到相关信息
            const bodyClient = JSON.parse(body);
            const username = bodyClient.username;
            const password = bodyClient.password;

            console.log('【用户登录接口】解析用户信息:', 'username:', username, 'password:', password);

            const users = createUserList();
//             console.log('可用用户列表:', JSON.stringify(users, null, 2));

            const checkUser = users.find(
                user => user.username === username && user.password === password
            );

            console.log('【用户登录接口】匹配用户信息结果, checkUser:', checkUser);

            if (!checkUser) {
                return { code: 201, data: { message: '用户名或密码不正确' } };
            }

            return { code: 200, data: { token: checkUser.token } };
        }
    },
    // 获取用户信息接口
    {
        url: '/user/info',
        method: 'get',
        response: (request) => {
            const headers = request.headers || {};
            console.log('【获取用户信息接口】收到请求');
            console.log('【获取用户信息接口】请求 URL:', request.url);
            console.log('【获取用户信息接口】请求方法:', request.method);
            console.log('【获取用户信息接口】完整请求头:', JSON.stringify(headers, null, 2)); // 打印完整请求头
            const authorization = headers.authorization || headers.Authorization || '';
            const token = authorization.replace('Bearer ', '');

            console.log('【获取用户信息接口】收到调用用户信息请求, request:', request);
            console.log('【获取用户信息接口】收到调用用户信息请求, headers:', headers);
            console.log('【获取用户信息接口】收到调用用户信息请求, Token:', token, 'Authorization Header:', authorization);
            const users = createUserList();
//             console.log('可用用户列表:', JSON.stringify(users, null, 2));

            const checkUser = users.find(user => user.token === token);

            if (!checkUser) {
                console.log('【获取用户信息接口】没有获取到用户信息');
                return { code: 201, data: { message: 'Token无效或已过期' } };
            }
            console.log('【获取用户信息接口】获取到用户信息');
            return { code: 200, data: checkUser };
        }
    }
];