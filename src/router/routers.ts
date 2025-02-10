export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'), // 动态加载登录页面组件
        name: 'login', // 命名路由
        meta: {
            title: "登录"
            hidden: false
        },
        children: [
            {
                path: "/home",
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: "首页",
                    hidden: false
                },
            }
        ]
    },
    {
        path: '/',
        component: () => import('@/layout/layout.vue'), // 动态加载布局页面组件
        name: 'home', // 命名路由
        meta: {
            title: "布局",
            hidden: false
        },
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'), // 动态加载404页面组件
        name: 'not-found', // 命名路由
        meta: {
            title: "404页面",
            hidden: false
        },
    },
    {
        path: '/test',
        component: () => import('@/views/test/TestApi.vue'),
        name: 'test-page', // 使用唯一的命名路由
        meta: {
            title: "测试页面",
            hidden: false
        },
        children: [
            {
                path: "/test_A1",
                component: () => import('@/views/test/test_A1.vue'),
                meta: {
                    title: "测试后子页面1",
                    hidden: false
                },
            },{
              path: "/home_other",
              component: () => import('@/views/test/test_A2.vue'),
              meta: {
                  title: "测试后子页面2",
                  hidden: false
              },
            },{
               path: "/home_hidden",
               component: () => import('@/views/test/test_hidden.vue'),
               meta: {
                   title: "测试隐藏子页面",
                   hidden: true
               },
           }
        ]
    },
    {
        path: '/:pathMatch(.*)*', // 匹配所有未定义的路径
        component: () => import('@/views/404/index.vue'), // 直接指向404页面组件
        name: 'any', // 唯一命名路由
        meta: {
            title: "默认页面"
        },
    },
];