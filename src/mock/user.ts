// project/mock/user.ts

/**
 * createUserList: �˺���ִ�л᷵��һ�����飬����������������û���Ϣ��
 */
function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4a3211',
            username: 'admin',
            password: '111111',
            desc: 'ƽ̨����Ա',
            roles: ['ƽ̨����Ա'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token'
        },
        {
            userId: 2,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4a3212',
            username: 'system',
            password: '111111',
            desc: 'ϵͳ����Ա',
            roles: ['ϵͳ����Ա'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'System Token'
        }
    ];
}

export default [
    // �û���¼�ӿ�
    {
        url: '/api/user/login', // �����ַ
        method: 'post', // ����ʽ
        response: ({ body }) => {
            // ��ȡ������Я���������û���������
            const { username, password } = body;

            // ���û�ȡ�û���Ϣ�����������ж��Ƿ��д��û�
            const checkUser = createUserList().find(
                user => user.username === username && user.password === password
            );

            // û���û�����ʧ����Ϣ
            if (!checkUser) {
                return { code: 201, data: { message: '�˺Ż������벻��ȷ' } };
            }

            // ����з��سɹ���Ϣ
            return { code: 200, data: { token: checkUser.token } };
        }
    },
    // ��ȡ�û���Ϣ�ӿ�
    {
        url: '/api/user/info', // �����ַ
        method: 'get', // ����ʽ
        response: (request) => {
            // ��ȡ����ͷЯ��token
            const token = request.headers.token;

            // �鿴�û���Ϣ�Ƿ�����д�token�û�
            const checkUser = createUserList().find(user => user.token === token);

            // û�з���ʧ�ܵ���Ϣ
            if (!checkUser) {
                return { code: 201, data: { message: 'Token��Ч���ѹ���' } };
            }

            // ����з��سɹ���Ϣ
            return { code: 200, data: checkUser };
        }
    }
];