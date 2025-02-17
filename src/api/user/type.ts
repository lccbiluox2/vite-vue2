// src/api/type.ts

export interface LoginForm {
    username: string;
    password: string;
}

// ��¼�ӿڷ��ص���������
interface DataType {
    token: string;
}

// �û���Ϣ��������
export interface UserInfo {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
}

// �����������û���Ϣ��ص���������
interface UserResponse {
    checkUser: UserInfo;
}

// ������������ص����ݽṹ
export interface UserResponseData {
    code: number;
    data: UserResponse;
}
// �û���Ϣ��Ӧ��������
export interface UserInfoData {
    id: number;
    username: string;
    email: string;
    roles: string[];
}

// ��ȡ�û���Ϣ�ӿڷ��ص���������
export interface UserResponseData {
    code: number;
    data: UserInfoData;
    message?: string; // ��ѡ�ֶΣ����ڴ����ɹ���Ϣ
}