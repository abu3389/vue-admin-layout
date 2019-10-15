import Cookies from 'js-cookie';
import {
    login,
    logout,
    getUserInfo
} from '@/api/user';
import md5 from 'md5';

const user = {
    state: {
        access: [],
        name: '',
        avatar: '',
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ACCESS: (state, access) => {
            state.access = access;
        },
        logout (state, vm) {
            Cookies.remove('user');
        }
    },
    actions: {
        // 登录
        Login ({
            commit
        }, userInfo) {
            const username = userInfo.userName.trim();
            return new Promise((resolve, reject) => {
                login(username, md5(userInfo.password), userInfo.authCode, userInfo.loginType)
                    .then(response => {
                        console.log(9999)
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // 获取用户信息
        GetUserInfo ({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(response => {
                        const data = response.data.data;
                        if (response.data.state == 100) {
                            if(data.court != null && data.roleName != 'staff'){
                                if(data.court.name == '殿前法庭' && data.roleName != 'staff'){
                                    commit('SET_ACCESS', '法官');
                                }else{
                                    commit('SET_ACCESS', '法官');
                                }
                            }else{
                                commit('SET_ACCESS', data.roleName);
                            }
                            let dex = 0;
                            if(data.roleName != 'litigant' && data.roleName != 'lawyer'){
                                commit('SET_ACCESS', data.roleName);
                            }else{
                                commit('SET_ACCESS', data.roleName);
                            }
                            commit('SET_NAME', data.name);
                            Cookies.set('user', data.name);
                        } else {
                            Cookies.set('user', '');
                            
                        }
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        //退出登录
        Logout ({
            commit
        }) {
            return new Promise((resolve, reject) => {
                logout()
                    .then(response => {
                        const data = response.data;
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};

export default user;
