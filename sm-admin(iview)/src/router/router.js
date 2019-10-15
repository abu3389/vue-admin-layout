import Main from '@/views/Main.vue';
import Login from '@/views/login.vue';


// 作为未登录的组件的子页面展示写在loginRouter里
export const loginRouter = {
  path: '/courtfinance/index',
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

// 作为已登录的组件的子页面，展示在左侧菜单，这部分路由由后端获取并且动态加载
//（所以，登录系统管理员对菜单进行添加和设置后这里可以注释掉，但测试路由是否有效的时候可以先打开测试，这里注释的最好保持与菜单设置的一致，方便测试）
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

// 作为已登录的组件的子页面，但不展示在左侧菜单写在otherRouter里
export const otherRouter = {
  path: '/courtfinance/home',
  name: 'otherRouter',
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

// 一些全局展示的页面单独写，如下：

//由于动态获取的那部分路由是异步过程，page404需要与动态路由同步注入，否则刷新时由于还未获取到动态部分的路由时就已经匹配到这个404页面
// export const page404 = {
//   path: '/courtfinance/*',
//   name: 'error-404',
//   meta: {
//     title: '404-页面不存在'
//   },
//   component: () => import('@/views/error-page/404.vue')
// };

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
  // page404,
];