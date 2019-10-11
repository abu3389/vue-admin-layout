import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import store from '@/store';
import Cookies from 'js-cookie';
import {
    routers,
} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};

let mark = false

export const router = new VueRouter(RouterConfig);
//路由拦截器
router.beforeEach((to, from, next) => {
    //加载状态
    iView.LoadingBar.start();
    //获取当前用户信息
    store.dispatch('GetUserInfo').then(res => {
        //如果没哟用户信息跳转登录页，且标记只跳转一次，防止跳转登录页重新获取用户信息又重复加载
        if (res.data.state == 101 && !mark) {
            next({
                name: 'login_index'
            });
            mark = true
        }else {
            //如果获得当前用户信息vuex保存用户信息
            if(res.data.state == 100){
                store.commit("SET_ROLENAME", res.data.data.roleName);
                store.commit("SET_USERIDCARD", res.data.data.result.idCard);
                store.commit("SET_USERNAME", res.data.data.result.name);
                store.commit("SET_USERID", res.data.data.result.id);
            }
            //设置路由名称为网站标题
            Util.title(to.meta.title);
            // 如果没有用户信息且前往的页面不是登录页，跳转到登录页
            if (!Cookies.get('user') && to.name !== 'login_index' && to.name !== 'login_court') {
                next({
                    name: 'login_index'
                });
            // 如果有用户信息且前往的是登录页，跳转到登录后的首页
            } else if (Cookies.get('user') && to.name === 'login_index') {
                next({
                    name: 'home_index'
                });
            // 其他情况默认允许直接跳转
            }else {
                next();
            }
        }
    })
});

router.afterEach(to => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
