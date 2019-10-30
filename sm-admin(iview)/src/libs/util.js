import axios from 'axios';
import Cookies from "js-cookie";
import lazyLoading from './lazyLoading.js';
import {
    getMenuList,
    getTabList,
    getUserInfo
} from "@/api/sysIndex.js";

let util = {};

//网站标题设置
util.title = function (title) {
    title = title || '厦门金融司法协同中心';
    window.document.title = title;
};

//ajax配置
util.ajax = axios.create({
    baseURL: '/api',
    timeout: 1800000
});

//两个数组中查找相同项
util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

//在单个数组中查找某个值
util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

//打开新页面是否增加标签
util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    //循环判断是否已打开
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    //如果没有打开，增加标签
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

//初始化加载路由
util.initRouter = function (vm) {
    //判断是否登录
    let roleTYpe = '';
    axios.get(getUserInfo,{}).then(ress => {
        if(ress.data.state == 100){
            roleTYpe = ress.data.data.roleType;
            // 加载菜单
            //根据角色获取对应的菜单
            axios.get(getMenuList, 
                {params:{'roleName': roleTYpe,platform:'courtfinance'}}
            ).then(res => {
                if(res.data.state == 100){
                    let menuLi = [];
                    //判断是否有菜单信息
                    if(res.data.roleMenus == [] || res.data.roleMenus.length == 0){
                        vm.$Message.warning({
                            content: '暂无权限',
                            duration: 2
                        });
                        setTimeout(function(){ 
                            //移除登陆保存的用户信息
                            vm.$store.commit("logout", vm);
                            //关闭打开的子标签
                            vm.$store.commit("clearOpenedSubmenu");
                            //发送退出登录清除session
                            vm.$store.dispatch("Logout").then(res => {
                            //跳转登录页
                            vm.$router.push({
                                name: "login_index"
                                });
                            });
                        }, 2000);
                        return false;
                    }
                    //给路由设置标题，会显示在子标签
                    res.data.roleMenus.map(item => {
                        item.title = item.title ? item.title : '无';
                    })
                    //菜单根据orderNumber降序排序
                    res.data.roleMenus.sort(util.compare('orderNumber'))
                    //递归构造子路由
                    menuLi = util.pushChildren(res.data.roleMenus,"");
                    //取要展示在菜单的二级路由
                    let menuLis = menuLi[0].children;
                    // 更新界面菜单显示
                    vm.$store.commit('updateMenulist', menuLis.filter(item => item.children.length > 0));
                    // 添加主界面菜单路由
                    vm.$store.commit('updateAppRouter', menuLis.filter(item => item.children.length > 0));
                    // 同步注入404路由，page404需要与动态路由同步注入，如果直接写在路由在刷新时由于还未获取到动态部分的路由时就已经匹配到404页面
                    vm.$store.commit('updateAppRouter', [
                        {
                            path: '/courtfinance/*',
                            name: 'error-404',
                            meta: {
                                title: '404-页面不存在'
                            },
                            component: lazyLoading('error-page/404')
                        }
                    ]);
                    let tagsList = [];
                    // 更新标签列表
                    vm.$store.state.app.routers.map((item) => {
                        if (item && item.children && item.children.length >0) {
                            tagsList.push(...item.children);
                        }
                    });
                    vm.$store.commit('setTagsList', tagsList);
                }
            });
            //根据角色获取选项卡权限
            axios.get(getTabList, 
                {params:{'roleName': roleTYpe,platform:'tableoption'}}
            ).then(res => {
                if(res.data.state == 100){
                    let tabList=res.data.authorities;
                    console.log("9988",tabList)
                    if(tabList.length != 0){
                        vm.$store.commit('updateTablist', tabList);
                    }
                }
            });
        }else{
            setTimeout(function(){ 
                vm.$store.commit("logout", vm);
                vm.$store.commit("clearOpenedSubmenu");
             }, 2000);
            return false;
        }
    }) 
};

//递归构造路由子节点
util.pushChildren = function (data,parent) {
    let vm = this;
    var tree = [];
    var temp;
    //根据父级的代码，循环路由列表查找包含路由父级代码的子路由
    for (var i = 0; i < data.length; i++) {
        //如果下一级路由的父路由代码与当前查找的符合，说明它是子路由
        if (data[i].fatherCode == parent) {
            var obj = data[i];
            //继续递归查找子路由的子路由
            temp = vm.pushChildren(data, data[i].code);
            //如果当前的子路由有数据，就放入父亲路由的children下
            if (temp.length > 0) {
                obj.children = temp;
            }
            obj.component = lazyLoading(obj.component);
            // 两种都可以
            // obj.component = vm.getViews(obj.component);
            //将当前是父亲的路由放在数组里
            tree.push(obj);
        }
    }
    return tree;
}

util.getViews=function(path) {
    return resolve => {
      require.ensure([], (require) => {
        resolve(require('@/views/' + path + '.vue'))
      })
    }
}

//降序排序
util.compare = function(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
};

export default util;
