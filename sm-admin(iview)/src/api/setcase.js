import Util from '@/libs/util.js';

const service = Util.ajax;


/**
 *@description [新增单个案件立案]
 *
 */
export function ftAddCaseSingle (params) {
  return service({
      url: '/court/case/singleAdd.jhtml',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      data:params,
  });
}

/**
 *@description [新增单个暂存案件]
 *
 */
export function single (params) {
  return service({
      url: '/court/case/single.jhtml',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      data:params,
  });
}

/**
 *@description [批量导入案件模板]
 *
 */
export function ftAddkeyInfoMany(params) {
  return service({
    url: '/court/case/batchAdd.jhtml',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      info: params,
    },
  });
}

/**
 *@description [批量提交]
 *
 */
export function ftAddCaseMuti(params) {
  return service({
    url: '/court/case/batchAdd.jhtml',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      info: params,
    },
  });
}

/**
 *@description [下载要素文件模板]
 *@param {type:string,order:string}
 *@returns {stream}
 */
export function downloadFact(params) {
  return service({
    url: '/court/case/downloadFact.jhtml',
    method: 'post',
    data: params,
  });
}

/**
 *@description [批量下载案件模板]
 *@param {type:string,order:string}
 *@returns {stream}
 */
export function ftDowntemplate(params) {
  return service({
    url: '/court/case/downloadDemo.jhtml',
    method: 'post',
    data: params,
  });
}

/**
 *@description [批量下载图片信息模板]
 *@param {type:string,order:string}
 *@returns {stream}
 */
export function downloadPic(params) {
  return service({
    url: '/court/case/downloadPic.jhtml',
    method: 'post',
    data: params,
  });
}
/**
 *@description [批量下载证明文件模板]
 *@param {type:string,order:string}
 *@returns {stream}
 */
export function ftDownMutiProve(params) {
  return service({
    url: '/court/case/proveFileDemo.jhtml',
    method: 'post',
    data: params,
  });
}

/**
 *@description [请求服务器获取上传至七牛云的Token]
 *@returns {stream}
 */
export function getQiniuToken(params) {
  return service({
    url: '/court/case/getToken.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取要素、证明文件、证据信息]
 *@returns {stream}
 */
export function hUpload(params) {
  return service({
    url: '/court/case/hUpload.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取当前用户默认当事人信息]
 *@returns {stream}
 */
export function defLitigantInfo(params) {
  return service({
    url: '/court/person/defLitigantInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取当前用户所有当事人信息]
 *@returns {stream}
 */
export function getLitigantInfo(params) {
  return service({
    url: '/court/person/getLitigantInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [添加当事人信息]
 *@returns {stream}
 */
export function addLitigant(params) {
  return service({
    url: '/court/person/addLitigant.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取单个当事人信息]
 *@returns {stream}
 */
export function backLitigantInfo(params) {
  return service({
    url: '/court/person/backLitigantInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [修改当事人信息]
 *@returns {stream}
 */
export function updateLitigantInfo(params) {
  return service({
    url: '/court/person/updateLitigantInfo.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [删除当事人/代理人信息]
 *@returns {stream}
 */
export function delLawyerInfo(params) {
  return service({
    url: '/court/person/delLawyerInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [批量删除当事人/代理人信息]
 *@returns {stream}
 */
export function deleteAll(params) {
  return service({
    url: '/court/person/deleteAll.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [获取当前用户默认代理人信息]
 *@returns {stream}
 */
export function defLawyerInfo(params) {
  return service({
    url: '/court/person/defLawyerInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取当前用户所有代理人信息]
 *@returns {stream}
 */
export function getLawyerInfo(params) {
  return service({
    url: '/court/person/getLawyerInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [添加代理人信息]
 *@returns {stream}
 */
export function adddLawyer(params) {
  return service({
    url: '/court/person/adddLawyer.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [获取单个代理人信息]
 *@returns {stream}
 */
export function backLawyerInfo(params) {
  return service({
    url: '/court/person/backLawyerInfo.jhtml',
    method: 'get',
    params,
  });
}

/**
 *@description [修改代理人信息]
 *@returns {stream}
 */
export function updateLawyerInfo(params) {
  return service({
    url: '/court/person/updateLawyerInfo.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [删除暂存案件]
 *@returns {stream}
 */
export function delLawCase(params) {
  return service({
    url: '/court/case/delLawCase.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [删除暂存案件]
 *@returns {stream}
 */
export function findLawPlaintiffLawyerName(params) {
  return service({
    url: '/court/litigant/findLawPlaintiffLawyerName.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [清空所有暂存案件]
 *@returns {stream}
 */
export function delLawCaseAll(params) {
  return service({
    url: '/court/case/delLawCaseAll.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [转暂存案件为正常案件并添加送达事项]
 *@returns {stream}
 */
export function changeLawCaseToNormal(params) {
  return service({
    url: '/court/case/changeLawCaseToNormal.jhtml',
    method: 'post',
    data:params,
  });
}

/**
 *@description [获取案由列表]
 *@returns {stream}
 */
export function briefList(params) {
  return service({
    url: '/court/case/briefList.jhtml',
    method: 'get',
    params,
  });
}