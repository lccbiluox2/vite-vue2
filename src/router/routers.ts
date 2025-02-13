export const constantRoutes = [
    // 登录页面
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: "登录",
            hidden: false,
            icon: "Promotion"
        }
    },
    // 首页
    {
        path: '/',
        redirect: '/home', // 重定向到/home以使用子路由
        component: () => import('@/layout/layout.vue'), // 使用布局组件来包含首页
        name: 'home',
        meta: {
            title: "首页",
            hidden: false,
            icon: "HomeFilled" // 更改首页图标为更直观的“家”图标
        },
        children: [{
            path: '/home', // 子路由路径
            component: () => import('@/views/home/home.vue'),
            name: 'home-child', // 独立的名字避免冲突
            meta: {
                title: "首页",
                hidden: false,
                icon: "HomeFilled" // 同样使用“家”图标
            },
        }]
    },
    // 数据大屏
     {
        path: '/screen',
        redirect: '/screen', // 重定向到/home以使用子路由
        component: () => import('@/layout/layout.vue'), // 使用布局组件来包含首页
        name: 'screen',
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: "DataBoard" // 假设存在一个名为“DataBoard”的图标表示数据大屏
        },
        children: [{
            path: '/screen', // 子路由路径
            component: () => import('@/views/screen/screen.vue'),
            name: 'screen-child', // 独立的名字避免冲突
            meta: {
                title: "数据大屏",
                hidden: false,
                icon: "DataBoard" // 假设存在一个名为“DataBoard”的图标表示数据大屏
            },
        }]
    },
    // 404 页面
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: 'not-found', // 使用特定的名字来标识404页面
        meta: {
            title: "404页面",
            hidden: true, // 设置为隐藏，不在菜单显示
            icon: "Warning" // 使用警告图标表示错误或丢失页面
        },
    },
    // 测试页面及其子页面
    {
        path: '/test',
        component: () => import('@/layout/layout.vue'),
        name: 'test-page',
        meta: {
            title: "测试页面",
            hidden: false,
            icon: "User"
        },
        children: [
            {
                path: "/test/test_A1", // 注意这里不需要前导斜杠
                component: () => import('@/views/test/test_A1.vue'),
                name: 'test-A1',
                meta: {
                    title: "测试A",
                    hidden: false,
                    icon: "TestTube"
                },
            },
            {
                path: "/test/test_A2", // 注意这里不需要前导斜杠
                component: () => import('@/views/test/test_A2.vue'),
                name: 'test-B',
                meta: {
                    title: "测试B",
                    hidden: false,
                    icon: "TestTube"
                },
            },
            {
                path: "/test/test_hidden", // 注意这里不需要前导斜杠
                component: () => import('@/views/test/test_hidden.vue'),
                meta: {
                    title: "测试隐藏子页面",
                    hidden: true,
                    icon: "TestTube"
                },
            }
        ]
    },
    {
        path: '/acl',
        component: () => import('@/layout/layout.vue'), // 动态加载布局页面组件
        name: 'acl-page', // 使用唯一的命名路由
        meta: {
            title: "权限管理",
            hidden: false,
            icon: "Key"
        },
        children: [
            {
                path: "/acl/user",
                component: () => import('@/views/acl/user/user.vue'),
                name: 'acl-user', // 使用唯一的命名路由
                meta: {
                    title: "用户管理",
                    hidden: false,
                    icon: "User"
                },
            },{
              path: "/acl/role",
              component: () => import('@/views/acl/role/role.vue'),
              name: 'acl-role', // 使用唯一的命名路由
              meta: {
                  title: "角色管理",
                  hidden: false,
                  icon: "Role"
              },
            },{
              path: "/acl/permission",
              component: () => import('@/views/acl/permission/permission.vue'),
              name: 'acl-permission', // 使用唯一的命名路由
              meta: {
                  title: "菜单管理",
                  hidden: false,
                  icon: "Menu"
              },
          }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/layout.vue'), // 动态加载布局页面组件
        name: 'Product', // 使用唯一的命名路由
        meta: {
            title: "商品管理",
            hidden: false,
            icon: "Goods"
        },
        children: [
            {
                path: "/product/trademark",
                component: () => import('@/views/product/trademark/trademark.vue'),
                name: 'Trademark', // 使用唯一的命名路由
                meta: {
                    title: "品牌管理",
                    hidden: false,
                    icon: "Brand"
                },
            },{
              path: "/product/attr",
              component: () => import('@/views/product/attr/attr.vue'),
              name: 'Attr', // 使用唯一的命名路由
              meta: {
                  title: "属性管理",
                  hidden: false,
                  icon: "Attribute"
              },
            },{
              path: "/product/spu",
              component: () => import('@/views/product/spu/spu.vue'),
              name: 'Spu', // 使用唯一的命名路由
              meta: {
                  title: "Spu管理",
                  hidden: false,
                  icon: "Spu"
              },
          },{
             path: "/product/sku",
             component: () => import('@/views/product/sku/sku.vue'),
             name: 'Sku', // 使用唯一的命名路由
             meta: {
                 title: "Sku管理",
                 hidden: false,
                 icon: "Sku"
             },
         }
        ]
    },
    {
        path: '/:pathMatch(.*)*', // 匹配所有未定义的路径
        component: () => import('@/views/404/index.vue'),
        name: 'any', // 唯一命名路由
        meta: {
            title: "默认页面",
            hidden: true, // 设置为隐藏，不在菜单显示
            icon: "Question"
        },
    },
];