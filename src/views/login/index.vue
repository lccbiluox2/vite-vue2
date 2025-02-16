<template>
  <div class="login_container">
    <el-row type="flex" justify="center" align="middle" style="height: 100%;">
      <el-col :span="12" :xs="24">
        <el-form ref="loginFormRef" class="login_form" label-width="80px" :model="loginForm" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/modules/user';
import type { LoginForm } from '@/api/user/type';
import { ElNotification, FormInstance } from 'element-plus';
import router from '@/router'; // 正确导入 router 实例
import { useRouter } from 'vue-router'; // 可选：用于调试

let useStore = useUserStore();
let loading = ref(false);
const loginFormRef = ref<FormInstance | null>(null); // 创建对表单实例的引用

const loginForm = ref<LoginForm>({
  username: 'admin', // 设置默认用户名
  password: '123456'  // 设置默认密码
});

// 定义表单校验需要配置对象
const validatePassword = (rule: any, value: string, callback: Function) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    //} else if (!/[A-Z]/.test(value)) {
        //callback(new Error('密码必须包含至少一个大写字母'));
    } else if (value.length < 6 || value.length > 16) {
        callback(new Error('长度在 6 到 16 个字符'));
    } else {
        callback(); // 校验通过
    }
    };

// 定义表单校验需要配置对象
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' }
    ]
};

// 处理登录逻辑
const handleLogin = async () => {
  if (!loginFormRef.value) return;

  try {
    await loginFormRef.value.validate(); // 验证表单
    loading.value = true;

    // 调用 store 中的登录方法（模拟接口调用）
    console.log('准备登录，登录界面传参, loginForm.value:', loginForm.value);
    const result = await useStore.userLogin(loginForm.value);

    // 编程式导航跳转到首页
      router.push('/');
      console.log('Navigation to home page triggered.'); // 添加日志输出

    // 登录成功提示信息
    ElNotification({
      title: '成功',
      message: '登录成功',
      type: 'success'
    });
  } catch (error) {
    console.error('Error during login attempt:', error); // 添加错误日志输出
    // 登录失败的提示信息
    ElNotification({
      title: '错误',
      message: (error as Error).message || '请求过程中发生错误',
      type: 'error'
    });

    // 即使失败也跳转到首页
    router.push('/');
  } finally {
    loading.value = false;
  }
};
</script>



<style lang="scss" scoped>
.login_container {
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_form {
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    h1 {
      margin-bottom: 10px;
      font-size: 24px;
      color: #333;
    }

    h2 {
      margin-bottom: 30px;
      font-size: 16px;
      color: #666;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>