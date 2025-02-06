import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'; // 导入上面定义的路由器


const app = createApp(App)

console.log(import.meta.env.VITE_APP_API_URL) // ��ӡ API URL
console.log(import.meta.env.VITE_APP_DEBUG)   // ��ӡ DEBUG ��־
console.log(import.meta.env)                   // ��ӡ���еĻ�������


app.use(ElementPlus)
app.use(router)
app.mount('#app')
