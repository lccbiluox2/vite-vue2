<template>
  <div class="login_container">
    <el-row type="flex" justify="center" align="middle" style="height: 100%;">
      <el-col :span="12" :xs="24">
        <el-form class="login_form" label-width="80px">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
                type="password"
                v-model="loginForm.password"
                :prefix-icon="Lock"
                placeholder="请输入密码"
                show-password> <!-- 增加 show-password 属性 -->
              </el-input>
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
    import { ElNotification } from 'element-plus';


let useStore = useUserStore();
let loading = ref(false);

const loginForm = ref<LoginForm>({
  username: 'admin', // 设置默认用户名
  password: '123456'  // 设置默认密码
});


// 处理登录逻辑
const handleLogin = async () => {
    try {
        loading.value = true;

        // 调用 store 中的登录方法
        const result = await useStore.userLogin(loginForm.value);

        if (result.success) {
            // 编程式导航跳转到首页
            $router.push('/');

            // 登录成功提示信息
            ElNotification({
                title: '成功',
                message: '登录成功',
                type: 'success'
            });
            loading.value = false;
        } else {
            // 登录失败的提示信息
            ElNotification({
                title: '错误',
                message: result.message || '登录失败',
                type: 'error'
            });
            loading.value = false;
        }
    } catch (error) {
        // 登录失败的提示信息
        ElNotification({
            title: '错误',
            message: (error as Error).message || '请求过程中发生错误',
            type: 'error'
        });
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
    background-color: white;
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