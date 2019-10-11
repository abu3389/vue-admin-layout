import Util from '@/libs/util.js';

const service = Util.ajax;

/**
 * [通过案号模糊搜索案件]
 * @param caseNo [案号]
 * @return {[Array]} [案件列表]
 */
export function queryCaseNo (caseNo, pageData) {
    const params = {
        caseNo,
        pageNumber: pageData.pageNumber || '',
        pageSize: pageData.pageSize || ''
    };
    return service({
        url: '/court/createCase/queryCaseNo.jhtml',
        method: 'get',
        params
    });
}
/** 三网认证 */
export function NetworkKyc (litigantName, identityCard, litigantPhone,legalManName, legalManId, legalManPhone,  litigantType) {
    const params = {
        litigantName,
        identityCard,
        litigantPhone,
        litigantType,
        legalManName,
        legalManId,
        legalManPhone
    };
    return service({
        url: '/court/createCase/validateIdCard.jhtml',
        method: 'get',
        params
    });
}

/**
 * 我的案件、案件中心的案件列表（旧）
 */
export function lawCaseList (params) {
    return service({
        url: '/court/case/lawCaseList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 我的案件、案件中心的案件列表（新）
 */
export function findLawCaseList (params) {
    return service({
        url: '/court/case/findLawCaseList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 被告获取确认地址
 */
export function checkSendAddress (params) {
    return service({
        url: '/court/login/checkSendAddress.jhtml',
        method: 'GET',
        params
    });
}
/**
 * 被告提交确认地址
 */
export function addSendAddress (params) {
    return service({
        url: '/court/login/addSendAddress.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 法院端推送给法院调解员
 */
export function distributioncourtMediate (data) {
    return service({
        url: '/court/case/distributioncourtMediate.jhtml',
        method: 'post',
        data
    });
}

/**
 * 法院调解员案件推送给机构调解员
 */
export function distributionInstitutionMediate (data) {
    return service({
        url: '/court/case/distributionInstitutionMediate.jhtml',
        method: 'post',
        data
    });
}

/**
 * 获取法院调解员列表
 */
export function courtmediatorList (params) {
    return service({
        url: '/court/case/courtmediatorList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 获取机构调解员列表
 */
export function institutionalmediatorList (params) {
    return service({
        url: '/court/case/institutionalmediatorList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 预立案
 */
export function preFiling (data) {
    return service({
        url: '/court/case/preFiling.jhtml',
        method: 'post',
        data
    });
}

/**
 * 案件退回
 */
export function backLawCase (data) {
    return service({
        url: '/court/case/backLawCase.jhtml',
        method: 'post',
        data
    });
}

/**
 * 案管添加用户
 * @param {*} params 
 */
export function addAnGuanUser (data) {
    return service({
        url: '/court/case/addAnGuanUser.jhtml',
        method: 'post',
        data
    });
}
/**
 * 案管修改用户
 * @param {*} params 
 */
export function changeAnGuanUser (data) {
    return service({
        url: '/court/case/changeAnGuanUser.jhtml',
        method: 'post',
        data
    });
}
/**
 * 案管用户列表
 * @param {*} params 
 */
export function findAnGuanUser () {
    return service({
        url: '/court/case/findAnGuanUser.jhtml',
        method: 'get',
    });
}

