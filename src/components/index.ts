// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue';
import Pagination from './Pagination/index.vue';

// 引入 element-plus 提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

console.log(ElementPlusIconsVue);

// 全局对象，包含所有需要注册为全局组件的对象
const allGlobalComponents = { SvgIcon, Pagination };

// 对外暴露插件对象
export default {
  // 务必叫做 install 方法，这是 Vue 插件的标准约定
  install(app: any) {
    // 注册项目中的全部全局组件
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key]);
    });

    // 将 element-plus 提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};