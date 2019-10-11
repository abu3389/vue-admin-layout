import Util from '@/libs/util.js';

const service = Util.ajax;

/**
 * [查询所有案由接口]
 * @return {[Array]} [案由列表]
 */
export function getBrief () {
    return service({
        url: '/court/case/briefList.jhtml',
        method: 'get'
    });
}

/**
 * [下载要素表接口 压缩包]
 */					
export function essential (data) {
    return service({
        url: 'court/case/downloadLawCaseFact.jhtml',
        method: 'post',
        data
    });
}

/**
 * [下载要素表接口 excel]
 */					
export function downloadFactExcel (data) {
    return service({
        url: 'court/case/downloadFactExcel.jhtml',
        method: 'post',
        data
    });
}

/**
 * [要素提交]
 */					
export function updataLawCase (data) {
    return service({
        url: 'court/case/updataLawCase.jhtml',
        method: 'post',
        data
    });
}

/**
 * [证明提交]
 */					
export function addProveFile (data) {
    return service({
        url: 'court/case/addProveFile.jhtml',
        method: 'post',
        data
    });
}

/**
 * [证据提交接口]
 */					
export function addEvidence (data) {
    return service({
        url: 'court/case/addEvidence.jhtml',
        method: 'post',
        data
    });
}


/**
 * [图片提交接口]
 */					
export function addPic (data) {
    return service({
        url: 'court/case/addPic.jhtml',
        method: 'post',
        data
    });
}


/**
 * [查询所有法院部门接口]
 * @return {[Array]} [法院部门列表]
 */					
export function courtList () {
    return service({
        url: '/court/case/courtList.jhtml',
        method: 'get'
    });
}

/**
 * [查询所有承办人（法官）接口]
 * @return {[Array]} [承办人（法官）列表]
 */					

export function judgeList () {
    return service({
        url: '/court/case/judgeList.jhtml',
        method: 'get'
    });
}

/**
 * [查询法庭列表]
 * @return {[Array]} [承办人（法官）列表]
 */					

export function getTribunalList () {
    return service({
        url: '/court/schedulding/tribunalList.jhtml',
        method: 'get'
    });
}

/**
 * [查询法官助理列表]
 * @return {[Array]} [法官助理列表]
 */					

export function assistantJudgeList () {
    return service({
        url: '/court/case/assistantJudgeList.jhtml',
        method: 'get'
    });
}

/**
 * [查询书记员列表]
 * @return {[Array]} [书记员列表]
 */					

export function clerkList () {
    return service({
        url: '/court/case/clerkList.jhtml',
        method: 'get'
    });
}

/**
 * [查询案件文书列表]
 * @return {[Array]} [案件文书列表]
 */					

export function docxTemplatesName (briefName) {
    const params = {
        briefName
    }
    return service({
        url: '/court/judgement_result/docxTemplatesName.jhtml',
        method: 'get',
        params
    });
}

/**
 * [查询当事人文书列表]
 * @return {[Array]} [当事人文书列表]
 */					

export function diplomsTemplateList () {
    return service({
        url: '/court/diploms/diplomsTemplateList.jhtml',
        method: 'get'
    });
}


/**
 * 获取邮件模板
 * 
 */
export function emailMessageTemplate () {
    return service({
        url: '/court/send/emailMessageTemplate.jhtml',
        method: 'get',
    });
  }
/**
 * 批量打印
 * 
 */
export function batchPrint (list) {
    const params = {
        printType: '620k',
        list
    }
    return service({
        url: '/court/send/printEms.jhtml',
        method: 'POST',
        data:params
    });
  }


/**
 * 获取案号/网申号列表
 * numberType  类型 0案号  1网申号
 * count       数量number
 */
export function caseNoList (numberType,count) {
    const params = {
        numberType,
        count
    }
    return service({
        url: '/court/case/caseNoList.jhtml',
        method: 'GET',
        params
    });
}


/**
 * 
 * @param {*} id 
 */
export function getTribunal (id) {
    const params = {
        id
    };
    return service({
        url: '/court/scheduling/queryTribunals.jhtml',
        method: 'get',
        params
    });
}

export function queryCase (a, b, c) {
    const params = {
        caseNo: a,
        plaintiffName: b,
        defendantName: c
    };
    return service({
        url: '/court/send/queryLawCase.jhtml',
        method: 'POST',
        params
    });
}

export function queryCaseInfo (id) {
    const params = {
        id: id
    };
    return service({
        url: '/court/infoManage/queryLawCaseAll.jhtml',
        method: 'GET',
        params
    });
}

export function caselist (caseNo, caseName, briefName, litigantName, filingDate1, filingDate2, pageNumber) {
    const params = {
        caseNo: caseNo,
        caseName: caseName,
        briefName: briefName,
        litigantName: litigantName,
        filingDate1: filingDate1,
        filingDate2: filingDate2,
        pageNumber: pageNumber
    };
    return service({
        url: '/court/infoManage/queryLawCase.jhtml',
        method: 'GET',
        params
    });
}

export function queryProcessNote (lawCaseId) {
    const params = {
        lawCaseId: lawCaseId
    }
    return service({
        url: '/court/process/queryProcessNote.jhtml',
        method: 'GET',
        params
    })
}

export function searchCase (kw) {
    const params = {
        caseNo: kw
    };
    return service({
        url: '/court/infoManage/lawCaseInfo.jhtml',
        method: 'GET',
        params
    });
}

//获取案件状态列表
export function getProgress (params) {
    return service({
        url: '/court/case/getProgress.jhtml',
        method: 'GET',
        params
    });
}


