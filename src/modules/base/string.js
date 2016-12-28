/**
 * @description 字符串相关
 * @author 应雨加
 * @time 2016/03/29
 */

if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count   = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (; ;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    // Could we try:
    // return Array(count + 1).join(this);
    return rpt;
  }
}

let str = {};

/**
 * 替换子字符串
 * @param {string} str - 原始字符串
 * @param {int} [start=3] - 替换的开始位置
 * @param {int} [length=4] - 要替换的长度
 * @param {string} [char=*] - 要替换的字符,默认星号*
 */
str.str2char = (str, start = 3, length = 4, char = '*')=> {

  let result, strLen;
  if (typeof str !== 'string') {
    return '';
  }

  strLen = Math.min(str.length, start + length);//最大字符长度

  result = str.substr(0, start)
      + char.repeat(length)
      + (strLen > str.length ? '' : str.substr(start + length, str.length));

  return result;
};

/**
 * 获取 查询字符串
 * @param name 可选,不写,返回一个包含所有参数的对象
 * @param url 要查询的url
 * @returns {*} 对象或者字符串
 */
str.queryString = (name, url = window.location.href)=> {

  if (name !== undefined) {
    name        = name.replace(/[\[\]]/g, "\\$&");
    var regex   = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  else {
    let pairs = location.search.slice(1).split('&');

    let result = {};
    if(pairs===['']){return {};}
    for(let i=pairs.length-1,pair;i>-1;i--){
      pair = pairs[i].split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    }

    return JSON.parse(JSON.stringify(result));
  }
};

export default str;
