import Util from '@/libs/util.js';

const service = Util.ajax;

export function showNotice () {
    return service({
        url: '/court/send/noticeList.jhtml',
        method: 'get'
    });
}

export function modiNotice (id) {
    const params = {
        id
    };
    return service({
        url: '/court/send/confrimNotice.jhtml',
        method: 'get',
        params
    });
}

export function delNotice (noticeId) {
    const params = {
        noticeId
    };
    return service({
        url: '/court/estFile/delNotice.jhtml',
        method: 'get',
        params
    });
}
