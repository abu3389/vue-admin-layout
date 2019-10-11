import Main from '@/views/Main.vue';
import Login from '@/views/login.vue';


// 作为Login组件的子页面展示写在loginRouter里
export const loginRouter = {
  path: '/courtfinance/',
  name: 'loginRouter',
  redirect: '/courtfinance/login',
  component: Login,
  children: [
    {
      path: '/courtfinance/login',
      title: '代理人/当事人-登录',
      name: 'login_index',
      component: () => import('@/views/login/litigantLogin.vue')
    },
    {
      path: '/courtfinance/loginCourt',
      title: '法院工作人员-登录',
      name: 'login_court',
      component: () => import('@/views/login/courtLogin.vue')
    },
    {
      path: '/courtfinance/regist',
      title: '用户注册',
      name: 'regist_index',
      component: () => import('@/views/regist/regist.vue')
    },
    {
      path: '/courtfinance/forgetPass',
      title: '找回密码',
      name: 'forgetPass_index',
      component: () => import('@/views/forgetPass/forgetPass.vue')
    },
  ]
};

// 作为Main组件的子页面展示在左侧菜单，这部分路由由后端获取动态加载
export const appRouter = [
  // {
  //   path: '/courtfinance/sys',
  //   name: 'sys',
  //   title: '系统管理',
  //   access: ['法官'],
  //   component: Main,
  //   icon:'md-cog',
  //   children: [
  //     {
  //       path: 'menuManage',
  //       title: '菜单权限管理',
  //       name: 'menuManage_index',
  //       component: () => import('@/views/sys/menu-manage/menuManage.vue')
  //     },
  //     {
  //       path: 'roleManage',
  //       title: '角色权限管理',
  //       name: 'roleManage_index',
  //       component: () => import('@/views/sys/role-manage/roleManage.vue')
  //     },
  //     {
  //       path: 'userManage',
  //       title: '工作人员管理',
  //       name: 'userManage_index',
  //       component: () => import('@/views/sys/user-manage/userManage.vue')
  //     }
  //   ]
  // },
];

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/courtfinance/',
  name: 'otherRouter',
  redirect: '/courtfinance/home',
  component: Main,
  children: [
    {
      path: '/courtfinance/home',//法院端
      title: '首页',
      name: 'home_index',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/courtfinance/ownspace',
      title: '个人中心',
      name: 'ownspace_index',
      component: () => import('@/views/own-space/own-space.vue')
    },
    {
      path: '/courtfinance/message',
      title: '消息中心',
      name: 'message_index',
      component: () => import('@/views/message/message.vue')
    },
  ]
};

// 不作为Main组件的子页面展示的页面单独写，如下

export const page404 = {
  path: '/courtfinance/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/courtfinance/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
  path: '/courtfinance/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue')
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page403,
  page404,
];
