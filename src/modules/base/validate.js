/**
 * @description 验证相关
 * @author  应雨加
 * @time 2016/03/28
 * @module base/validate
 */

let validate = {};

//todo 将正则移到外面
let regList = {
  tel: /\d{3}-\d{8}|\d{4}-\{7,8}$/,
  mobile: /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/,
  bankCard: /^\d{16,19}$/,
  IDCard: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
  //chinese: /^([\u4e00-\u9fa5])+$/,
  chinese: /^[\u4e00-\u9fa5]{2,16}$|(^[\u4e00-\u9fa5]{2,16}·[\u4e00-\u9fa5]{2,16})$/,
  email: /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i,
  money: /^\d*(\.\d{0,2})$/
};

/**
 * 内部通用函数绑定事件,执行回调
 * @function
 * @param {String} par
 * @param {{dom:Object,cb:Function}} opts
 * @param reg {}
 * @returns {Boolean|undefined}
 */
let publicFun = (par, opts, reg) => {

  let result = typeof par === 'string' ? reg.test(par) : undefined;

  if ($.isFunction(opts && opts.cb)) {
    if (opts.dom) {
      //todu 判断dom类型（select input）
      opts.dom.on(opts.event || 'input blur', function () {
        var val = $(this).val();
        result = $.trim(val) === '' ? null : reg.test(val);
        opts.cb(result, $(this));
      });
    }
    else {
      opts.cb(reg);
    }
  }

  return result;
};

/**
 * @description 自定义正则验证
 * @function
 * @param {string} str
 * @param reg
 * @param {Object} opts
 * @returns {Boolean|undefined}
 */
validate.custom = (str, reg, opts) => {

  if (typeof str !== 'string') {
    opts = reg;
    reg = str;
  }

  return publicFun(str, opts, reg);
};

/**
 * 表单验证
 * @param  {any} opts
 */
validate.form = (opts) => {

  opts.dom.on(opts.event || 'input blur', function () {
    let _this = $(this);
    let reg = opts.reg,
      result,
      _strReg = _this.data('validate');

    if (_strReg) {//如果在dom中定义了正则
      _strReg = $.trim(_strReg);
      if (_strReg[0] === '/') {//自定义正则
        try {
          reg = new RegExp(_strReg.substr(1, _strReg.length - 2));
        } catch (e) {
          return new Error('正则参数错误');
        }
      }
      else if (regList[_strReg]) {//使用内置的正则
        reg = regList[_strReg];
      }
      else {//
        return new Error('正则参数错误');
      }
    }
    else {
      reg = opts.reg;
    }
    let val = _this.val();
    result = $.trim(val) === '' ? null : reg.test(val);
    opts.cb(result, _this);
  });

};

/**
 * 电话号码验证
 * @param telephone
 * @param opts  {dom, cb}
 * @returns {Boolean|undefined} 取决于第一个参数是不是字符串
 */
validate.tel = (telephone, opts) => {

  if (typeof telephone !== 'string') {
    opts = telephone;
  }

  let reg;

  if (opts && opts.extension) {//带分机号码
    reg = /((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
  }
  else {
    reg = regList.tel;
  }

  return publicFun(telephone, opts, reg);
};

/**
 * 手机号验证
 * @param {string} mobile
 * @param opts {dom, cb}
 * @returns {Boolean|undefined}
 */
validate.mobile = (mobile, opts) => {

  if (typeof mobile !== 'string') {
    opts = mobile;
  }

  let reg = regList.mobile;

  return publicFun(mobile, opts, reg);
};

/**
 * 银行卡验证
 * @param {string} bankCard
 * @param opts {string} {dom, cb}
 * @returns {Boolean|undefined}
 */
validate.bankCard = (bankCard, opts) => {
  opts = opts ? opts : {};
  if (typeof bankCard !== 'string') {
    opts = bankCard;
  }

  let reg = regList.bankCard;

  return publicFun(bankCard, opts, reg);

};

/**
 * 身份证
 * @param IDCard
 * @param opts
 * @returns {Boolean|undefined}
 * @constructor
 */
validate.IDCard = (IDCard, opts) => {

  if (typeof IDCard !== 'string') {
    opts = IDCard;
  }

  let reg = regList.IDCard;

  return publicFun(IDCard, opts, reg);

};

/**
 * 汉字检测
 * @param chinese
 * @param opts
 * @returns {Boolean|undefined}
 */
validate.chinese = (chinese, opts) => {
  opts = opts ? opts : {};
  if (typeof chinese !== 'string') {
    opts = chinese;
  }

  let reg;

  if (opts.max) {
    reg = new RegExp('^([\u4e00-\u9fa5]){' + (opts.min || 1) + ',' + (opts.max) + '}$')
  }
  else {
    //reg = new RegExp('^([\u4e00-\u9fa5]){' + (opts.min || 1) + ',}$')
    reg = regList.chinese;
  }

  return publicFun(chinese, opts, reg);

};

/**
 * 邮箱检测
 * @param {String} [email]
 * @param {Object} [opts]
 * @returns {Boolean|undefined}
 */
validate.email = (email, opts) => {
  opts = opts ? opts : {};
  if (typeof email !== 'string') {
    opts = email;
  }

  let reg = regList.email;

  return publicFun(email, opts, reg);

};

/**
 * 金钱千分位
 * @param money
 * @param opts
 * @returns {String|undefined}
 */
validate.money = (money, opts) => {

  let reg = /(\d{3})/g;
  let getResult = (money, opts) => {

    let limit, integer, decimal = '',
      result;

    if (isNaN(+money)) {
      return 0;
    }

    money += '';

    //是否是带小数
    if ((opts && opts.decimal) || (money.indexOf('.') > -1)) {
      money = (+money).toFixed(2);
      limit = money.indexOf('.');
      integer = money.substr(0, limit);//整数部分
      decimal = money.substr(limit, money.length);//小数部分
    }
    else {
      money = (+money).toFixed(0);
      integer = money;
    }

    integer = integer.split('').reverse().join('')
      .replace(reg, '$1,').replace(/\,$/, '').split('').reverse().join('');

    return integer + decimal;
  };

  if (typeof money !== 'string') {
    opts = money;
  }

  if (typeof opts==='object'&&$.isFunction(opts.cb)) {
    if (opts.dom) {
      opts.dom.on('input', () => {
        result = getResult(opts.dom.val());
        opts.cb(result);
      })
    }
    else {
      opts.cb(reg);
    }
  }

  return typeof money === 'string' ? getResult(money, opts) : undefined;

};


/**
 * 包含多个验证方法
 */
export default validate;
