/**
 * @description 存储相关
 * @author 应雨加
 * @time 2016/03/29
 */

if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) {
        return null;
      }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if (!sKey) {
        return;
      }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) {
        return;
      }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

let dataStorage = {
  localStorage: {},
  sessionStorage: {}
};
let prefix = '';
let toStr = (value) => {
  if (value === null||value===undefined) {
    return null;//
  }
  return typeof value === 'string' ? value : prefix + JSON.stringify(value);
};
let toObj = (value) => {
  let result;
  if (value === null||value===undefined) {
    return null;
  }
  var real_val=value.substr(prefix.length, prefix.length + 1);
	if (real_val!==''&& '[{'.indexOf(real_val) > -1) {
    return JSON.parse(value.substr(prefix.length, value.length));
  }
  else{
    return value.substr(prefix.length,value.length);
  }
};
/**
 * 
 * @param  {String} key
 * @param  {String} value
 */
dataStorage.localStorage.setItem = function (key, value) {
  window.localStorage.setItem(key, toStr(value));
};
/**
 * 
 * @param  {String} key
 */
dataStorage.localStorage.getItem = function (key) {
  return toObj(window.localStorage.getItem(key));
};
dataStorage.localStorage.clear=()=>{
  window.localStorage.clear();
};

/**
 * 
 * @param  {String} key
 * @param  {String} value
 */
dataStorage.sessionStorage.setItem = function (key, value) {
  window.sessionStorage.setItem(key, toStr(value));
};
/**
 * 
 * @param  {String} key
 */
dataStorage.sessionStorage.getItem = function (key) {
  return toObj(window.sessionStorage.getItem(key));
};

dataStorage.sessionStorage.clear=()=>{
  window.localStorage.clear();
};
export default dataStorage;
