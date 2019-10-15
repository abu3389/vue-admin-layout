import { otherRouter, appRouter } from '@/router/router';
import Util from '@/libs/util';
import store from '@/store';
import Vue from 'vue';
import { router } from '@/router/index';

const app = {
    state: {
        cachePage: [],
        idDraw:false,   //收缩菜单
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'light', // 主题
        themeColor: '',
        pageOpenedList: [
            {
                title: '首页',
                path: '/send/home',
                name: 'home_index'
            }
        ],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],//菜单权限列表
        tabList:[],//选项卡权限列表
        userIdCard:[],//用户身份证
        userName:"",//用户名
        userId:"",//用户id
        roLeName:"",    //角色
        caseId: '', //案件id
        breifName: '', //案件案由
        litigantType:'',//当事人类型
        agentType:'',//代理人类型
        routers: [],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        SET_CASEID: (state, CASEID) => {
            state.caseId = CASEID;
        },
        SET_BREIFNAME: (state, BREIFNAME) => {
            state.breifName = BREIFNAME;
        },
        SET_litigantType: (state, litigantType) => {
            state.litigantType = litigantType;
        },
        SET_agentType: (state, agentType) => {
            state.agentType = agentType;
        },
        SET_USERIDCARD: (state, USERIDCARD) => {
            state.userIdCard = USERIDCARD;
        },
        SET_USERNAME: (state, USERNAME) => {
            state.userName = USERNAME;
        },
        SET_USERID: (state, USERID) => {
            state.userId = USERID;
        },
        SET_ROLENAME: (state, ROLENAME) => {
            state.roLeName = ROLENAME;
        },
        // 动态添加主界面路由（即菜单路由）
        updateAppRouter(state, appRouter) {
            console.log("appRouter",appRouter)
            state.routers.push(...appRouter);
            router.addRoutes(appRouter);
        },
        updateMenulist(state, appRouter) {
            state.menuList = appRouter;
        },
        updateTablist(state, tabList) {
            state.tabList = tabList;
        },
        SET_ISDRAW: (state, idDraw) => {
            state.idDraw = idDraw;
        },
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {//关闭页面，移除缓存的页面
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    // state.cachePage.splice(index, 1);
                }
            });
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList
                ? JSON.parse(localStorage.pageOpenedList)
                : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            state.pageOpenedList.push(tagObj);
        }
    }
};

export default app;
