function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://img0.baidu.com/it/u=252894945,1630497372&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
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
        response: ({ body }) => {
            const bodyClient = JSON.parse(body);
            const username = bodyClient.username;
            const password = bodyClient.password;

            console.log('【用户登录接口】解析用户信息:', 'username:', username, 'password:', password);
            const users = createUserList();

            const checkUser = users.find(
                user => user.username === username && user.password === password
            );

            console.log('【用户登录接口】匹配用户信息结果, checkUser:', checkUser);
            if (!checkUser) {
                return { code: 201, data: { message: '用户名或密码不正确' } };
            }

            return { code: 200, data: {
                    token: checkUser.token,
                    username: checkUser.username,
                    avatar: checkUser.avatar
                }
            };
        }
    },
    // 获取用户信息接口
    {
        url: '/user/info',
        method: 'get',
        response: () => {
            // 这个 mock 拿不到前端给的请求头
            const users = createUserList();
            const checkUser = users.find(user => user.token === 'Admin Token');
            if (!checkUser) {
                console.log('【获取用户信息接口】没有获取到用户信息');
                return { code: 201, data: { message: 'Token无效或已过期' } };
            }
            console.log('【获取用户信息接口】获取到用户信息');
            return { code: 200, data: checkUser };
        }
    }
];