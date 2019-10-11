import Util from '@/libs/util.js';

const service = Util.ajax;

import request from '@/libs/service'

export function login(username, password, code,loginType,return_EncData) {
    const params = {
        username,
        password,
        code,
        loginType,
        return_EncData
    }
    return request({
      url: '/court/login/login.jhtml',
      method: 'get',
      params
    })
}

export function optionRole (roleType,loginId) {
    const params = {
        roleType,
        loginId
    }
    return service({
        url: '/court/login/optionRole.jhtml',
        method: 'get',
        params
    });
}
/**
 * 测试websoket
 */
export function testWxScan () {
    return service({
        url: '/main/testWxScan.jhtml',
        method: 'get',
    });
}

export function wxScanLoginEncoder () {
    return service({
        url: '/main/wxScanLoginEncoder.jhtml',
        method: 'get',
    });
}

export function getCode (phone) {
    const params = {
        phone
    }
    return service({
        url: '/court/login/code.jhtml',
        method: 'get',
        params
    });
}
export function registerPhone (phone, mcode) {
    const data = {
        phone,
        mcode
      }
      return service({
          url: '/main/registerPhone.jhtml',
          method: 'post',
          data
      });
}

export function registerAdmin(idCard,password,email,trueAddress) {
    const data = {
        idCard,
        password,
        email,
        trueAddress
    }
    return service({
        url: '/main/registerAdmin.jhtml',
        method: 'post',
        data
    });
}

export function changePassword(oldpassword,newpassword1,newpassword2) {
    const params = {
        oldpassword,
        newpassword1,
        newpassword2
    }
    return service({
        url: '/main/changePassword.jhtml',
        method: 'post',
        params
    });
}

export function phoneLogin (idCard,password,code) {
    const data = {
        idCard,
        password,
        code
    }
    return service({
        url: '/main/phoneLogin.jhtml',
        method: 'post',
        data
    });
}

export function logout () {
    return service({
        url: '/court/login/loginOut.jhtml',
        method: 'get'
    });
}
export function getUserInfo () {
    return service({
        url: '/court/login/getUserInfo.jhtml',
        method: 'get'
    });
}
//单位注册
export function groupRegist (data) {
    const params =  data;
    return service({
        url: '/court/register/registerByOrg.jhtml',
        method: 'post',
        params
    });
}

//自然人注册
export function personRegist (data) {
    const params =  data;
    return service({
        url: '/court/register/registerByPerson.jhtml',
        method: 'post',
        params
    });
}

//注册发送手机验证码
export function sendPhoneCode (data) {
    const params =  data;
    return service({
        url: '/court/register/sendPhoneCode.jhtml',
        method: 'get',
        params
    });
}

//获取主体身份认证二维码图片
export function get2CodeImg () {
    return service({
        url: '/court/register/registerByFace.jhtml',
        method: 'get',
    });
}

//获取二维码扫描结果
export function getScanRes (data) {
    const params =  data;
    return service({
        url: '/court/register/registerNext.jhtml',
        method: 'get',
        params
    });
}


//获取随机数
export function getRnd () {
    return service({
        url: '/court/login/getRnd.jhtml',
        method: 'get',
    });
}

//重置密码发送手机验证码
export function sendPhoneCodefindPw (data) {
    const params =  data;
    return service({
        url: '/court/register/sendPhoneCodefindPw.jhtml',
        method: 'get',
        params
    });
}

//重置密码
export function forgetPassword (data) {
    const params =  data;
    return service({
        url: '/court/login/forgetPassword.jhtml',
        method: 'get',
        params
    });
}

