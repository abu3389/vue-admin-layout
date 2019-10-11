import Util from '@/libs/util.js';

const service = Util.ajax;

//获取法院端的数据统计
export function countLawCase (params) {
    return service({
        url: '/court/index/countLawCase.jhtml',
        method: 'POST',
        data:params
    });
}

//获取法院工作人员列表
export function indexJudgeList (params) {
    return service({
        url: '/court/index/indexJudgeList.jhtml',
        method: 'GET',
        params
    });
}

//获取法院端的首页的案件列表
export function indexCourtLawCaseList (params) {
    return service({
        url: '/court/index/indexCourtLawCaseList.jhtml',
        method: 'GET',
        params
    });
}

//获取法院端的首页的案件列表
export function processNote (params) {
    return service({
        url: '/court/case/processNote.jhtml',
        method: 'GET',
        params
    });
}

//获取代理人和当事人的首页的案件列表
export function indexLawCaseList (params) {
    return service({
        url: '/court/index/indexLawCaseList.jhtml',
        method: 'GET',
        params
    });
}

//获取当事人和代理人的首页消息列表
export function noticeList (params) {
    return service({
        url: '/court/send/noticeList.jhtml',
        method: 'GET',
        params
    });
}