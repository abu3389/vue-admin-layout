import Util from '@/libs/util.js';

const service = Util.ajax;


/**
 * 获取法人与代理人信息
 */
export function getPersonInfo () {
    return service({
        url: '/court/person/getInfo.jhtml',
        method: 'GET',
    });
}

/**
 * 修改密码
 */
export function changePwd (data) {
    const params =  data;
    return service({
        url: '/court/login/changePassword.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 手机绑定修改
 */
export function changePhone (data) {
    const params =  data;
    return service({
        url: '/court/register/changePhone.jhtml',
        method: 'GET',
        params
    });
}

//发送手机验证码
export function sendPhoneCode (data) {
    const params =  data;
    return service({
        url: '/court/register/sendPhoneCode.jhtml',
        method: 'get',
        params
    });
}
