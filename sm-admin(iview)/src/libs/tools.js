
import VueRouter from 'vue-router';

/**
 *  @description 清空对象属性的值，如果使用iview表单请使用自带清空方法
 *  @param {object}
 *  @returns {object}
 * */
export function tools_resetObjectKeys (obj) {
  let receiveObj = obj
  Object.keys(receiveObj).forEach((key) => {
    if (typeof (receiveObj[key]) === 'string') {
      obj[key] = '';
    } else if (typeof (receiveObj[key]) === 'number') {
      obj[key] = 0;
    } else if (typeof (receiveObj[key]) === 'object') {
      Array.isArray(receiveObj[key]) ? receiveObj[key] = [] : receiveObj[key] = {};
    }
  })
  return receiveObj
}

/**
 *@description YYYY月MM月DD日转换为YYYY-MM-DD
 * @param {string}
 * @returns {string}
 */
export function tools_transDate (str) {
  return str.replace('年', '-').replace('月', '-').replace('日', '');
}

/**
 *@description 秒转化成时分秒
 * @param {string}
 * @returns {string}
 */
export function formatSeconds(value) {
  var secondTime = parseInt(value);// 秒
  var minuteTime = 0;// 分
  var hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
      }
  }
  var result = "" + parseInt(secondTime) + "秒";

  if(minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分" + result;
  }
  if(hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}

/**
 * @description 解决iview的DatePicker时间带T带Z格式问题（转化为时间戳）
 */
export function changeDatePicker(dateA) {
  var dateee = new Date(dateA).toJSON();
  var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
  return date;
};

/**
 * @description 判断一个纯字符串对象是否为空,如若为空返回null
 */
export function tools_objHasStr (obj) {
  Object.keys(obj).forEach(key =>{
    if(typeof obj[key] !== '') {
      return true
    }
  })
  return false
}

/**
 * @description 身份证算出出生年月和性别
 * @param [string] 身份证号码
 */

 export function tools_calcIdentiyInfo (str) {
  //获取性别
  let sex = parseInt(str.substr(16, 1)) % 2 == 1?'男':'女';
  let brith = str.substring(6, 10) + "-" + str.substring(10, 12) + "-" + str.substring(12, 14);
  let obj = {
    sex: sex,
    birth: brith,
  }
  return obj;
 }



 /**
 * @description 下载文件
 * 
 * @param [string] path 路径
 */

export function tools_downLoad (path) {
      let str1 = path.substr(0, 1);
      let pathN = '';
      if(str1 == '/'){
        pathN = path;
      }else{
        pathN ='/' + path;
      }
      var eleLink = document.createElement("a");
      var strs = pathN.split("/");
      for (var i = 0; i < strs.length; i++) {
          if (i == strs.length - 1) {
          var filename = strs[i];
          }
      }
      eleLink.download = filename;
      eleLink.style.display = "none";
      eleLink.href = pathN;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
 }


  /**
 * @description 深拷贝
 * 
 * @param [object] obj 拷贝对象
 */

export function deepClone(obj){
  let _obj = JSON.stringify(obj),
      objClone = JSON.parse(_obj);
  return objClone
} 

/**
 * 数组去重
 */
export function uniq(array){
  array.sort();
  var temp=[array[0]];
  for(var i = 1; i < array.length; i++){
      if( array[i] !== temp[temp.length-1]){
          temp.push(array[i]);
      }
  }
  return temp;
}


/**
 *
 *
 * @export
 * @param {String} 获取链接的文件名
 */
export function getFileName(str) {
  console.log(str)
  if(str!=null){
    let pos=str.lastIndexOf("/");
    let strFileName=str.substring(pos+1);//文件名带后缀
    return strFileName;
  }else{
    return '';
  }
}

/**
 *
 *
 * 删除字符串多余的空格
 * @param {str} //要替换的字符串
 * @param {is_global}//有写"g"代表去除全部空格，否则只去除两边的空格
 */
export function delSpace(str,is_global){
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");
  if(is_global.toLowerCase()=="g"){
    result = result.replace(/\s/g,"");
  }
  return result;
}


/**
 * 重置iview表单的错误提示
 * @param {refsName} 表单from绑定的ref
 */
export function resetField(refsName){
  this.$refs [refsName].fields.forEach(function (e) {
    e.resetField()
  })
}