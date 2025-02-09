// project/mock/user.ts

/**
 * createUserList: 此函数执行会返回一个数组，数组里面包含两个用户信息。
 */
function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4a3211',
            username: 'admin',
            password: '111111',
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
            password: '111111',
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
        url: '/api/user/login', // 请求地址
        method: 'post', // 请求方式
        response: ({ body }) => {
            // 获取请求体携带过来的用户名与密码
            const { username, password } = body;

            // 调用获取用户信息函数，用于判断是否有此用户
            const checkUser = createUserList().find(
                user => user.username === username && user.password === password
            );

            // 没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } };
            }

            // 如果有返回成功信息
            return { code: 200, data: { token: checkUser.token } };
        }
    },
    // 获取用户信息接口
    {
        url: '/api/user/info', // 请求地址
        method: 'get', // 请求方式
        response: (request) => {
            // 获取请求头携带token
            const token = request.headers.token;

            // 查看用户信息是否包含有此token用户
            const checkUser = createUserList().find(user => user.token === token);

            // 没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: 'Token无效或已过期' } };
            }

            // 如果有返回成功信息
            return { code: 200, data: checkUser };
        }
    }
];