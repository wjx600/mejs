var basicLibrary = (function(){
  document.body.addEventListener('touchstart', function (){},false);
  /*
   验证用户名
   */
  function checkUser(str,callback){
    var re = /^[a-zA-z]\w{3,15}$/;
    if(re.test(str)){
      callback && callback(true);
    }else{
      callback && callback(false,'用户名输入错误，请重新输入');
    }
  }
  /*
   验证手机号
   */
  function checkMobile(str,callback) {
    var re = /^1(([3|5|7|8][\d]{9})|(47|45)[\d]{8})$/;
    if(re.test(str)) {
      callback && callback(true);
    }else{
      callback && callback(false,'请输入正确的手机号码');
    }
  }
  function checkPwd(str,callback){
    var re =/^[0-9a-zA-Z]+$/;
    if('' == str){
      callback && callback(false,'请输入密码');
    }else if(!re.test(str)){
      callback && callback(false,'密码输入错误，请输入6-10位数字或字母');
    }else if(str.length<6){
      callback && callback(false,'密码输入错误，长度为6-10位');
    }else{
      callback && callback(true);
    }

  }
  //验证支付密码
  function checkPayPwd(str,callback){
    var re =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if('' == str){
      callback && callback(false,'请输入密码');
    }else if(!re.test(str)){
      callback && callback(false,'密码输入错误，请输入6-12位数字加字母');
    }else if(str.length<6||str.length>12){
      callback && callback(false,'密码输入错误，长度为6-12位');
    }else{
      callback && callback(true);
    }

  }
  /*
   验证电话号码
   */
  function checkPhone(str,callback){
    var re = /^0\d{2,3}-?\d{7,8}$/;
    if(re.test(str)){
      callback && callback(true);
    }else{
      callback && callback(false,'电话号码输入错误，请重新输入');
    }
  }
  /*
   验证邮箱
   */
  function checkEmail(str,callback){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(re.test(str)){
      callback && callback(true);
    }else{
      callback && callback(false,'邮箱输入错误，请重新输入');
    }
  }
  /*
   验证真实姓名
   */
  function checkName(str,callback){
    var re = /^([\u4e00-\u9fa5]){2,7}$/;
    if(re.test(str)){
      callback && callback(true);
    }else{
      callback && callback(false,'请输入正确的姓名');
    }
  }
  /*
   验证身份证
   */
  function checkId(str,callback){
    var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(re.test(str)){
      callback && callback(true);
    }else{
      callback && callback(false,'请输入正确的身份证号码');
    }
  }
  /*
   验证银行卡
   */
  function checkCard(str,callback){
    var old = str.replace(/\s*/g, "");
    if(str == ''){
      callback && callback(false,'请输入银行卡号');
    }else if(isNaN(old)){
      callback && callback(false,'银行卡信息有误');
    }else if(str.length < 13){
      callback && callback(false,'银行卡号不能少于13位');
    }else{
      callback && callback(true);
    }
  }
  function checkCardType(obj){
    var v = obj.val().replace(/\s*/g, "");
    if (v != "") {
      var reg = /^(\d{4})(\d{4})?(\d{4})?(\d{4})?(\d*)$/; //16 ~ 19位银行卡
      var arr = [];
      if(reg.test(v)){
        arr = [RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4,RegExp.$5];
        var str = arr[0];
        for(var i = 1,len = arr.length;i < len; i ++){
          if(arr[i]){
            str += " " + arr[i];
          }
        }
        obj.val(str);
      }
    }
  }
  /*
   错误提示
   */
  function errorTip(o){
    if($("#J-pageErrorTips").length > 0){
      $("#J-pageErrorTips").remove();
    }
    $("body").append("<div id='J-pageErrorTips' class='u-error-tips' style='display:none'><span></span></div>");
    var errorTip = $("#J-pageErrorTips");
    var callback = o.callback;
    errorTip.find('span').text(o.text);
    errorTip.show();
    var fromY = 0,toY = 80;
    errorTip.css({top: fromY}).animate({top:toY});
    errorTip.fadeOut(1000,function(){
      $(this).css({top:fromY});
      callback && callback();
    });
  }
  /*
   锁屏
   */
  function lockWindow(zIndex){
    var z = zIndex || 25535;
    $("<div class='f-wndmask'></div>").appendTo("body");
  }
  /*
   解锁
   */
  function unlockWindow(){
    $(".f-wndmask").remove();
  }

  function localSetItem(key,value){
    /*
     存储数据需要把json对象转换成字符串：JSON.stringify
     */
    if(window.localStorage){
      localStorage.setItem(key,JSON.stringify(value));
    }
  }

  function localGetItem(key){
    /*
     获取数据需要把json字符串转换成对象：JSON.parse
     */
    if(window.localStorage){
      return JSON.parse(localStorage.getItem(key));
    }
  }

  //倒计时
  function countDown(obj,_countDownTime){
    _countDownTime = _countDownTime || 60;
    var countDownTime = _countDownTime;
    (function(){
      var o = typeof obj == "string" ? $(obj) : obj,Times = null;
      var callee = arguments.callee;
      if (countDownTime == 0) {
        clearCountDown(o);
      } else {
        if(o[0]){
          o.attr("disabled", true).addClass("u-Bg-grey");
          if(o[0].tagName == 'INPUT'){
            o.val(countDownTime+"秒后重发");
          }else{
            o.html(countDownTime+"秒后重发");
          }
          countDownTime--;
          Times = setTimeout(function() {
            callee(obj);
          },1000);
          o.data("countDownId",Times);
        }
      }
    })();
  }
  /*清除倒计时的效果
   * */
  function clearCountDown(obj){
    var o = typeof obj == "string" ? $(obj) : obj;
    if(o[0]){
      if(o[0].tagName == 'INPUT'){
        o.val("获取验证码");
      }else{
        o.html("获取验证码");
      }
      clearTimeout(o.data("countDownId"));
      o.attr("disabled",false).removeClass("u-Bg-grey").removeData("countDownId");
    }
  }
  /*是否正处于倒计时中
   * */
  function isCountingDown(obj){
    var o = typeof obj == "string" ? $(obj) : obj;
    return Boolean(o.data("countDownId"));
  }
  /*获取浏览器地址里面的参数值*/
  function getLocationStr(url){
    url = (url || window.location.search).replace(/^\?/,"");
    var reg = new RegExp("([^=&#]+)(?:[=])([^=&#]+)(?:#.*)?","g"), result, pageParam = {};
    while((result = reg.exec(url))!=null){
      pageParam[result[1]] = result[2];
    }
    return pageParam;
  }
  //协议阅读状态切换
  function getStatus(obj,bnt){
    if(bnt){
      var bnt = typeof bnt == "string" ? $(bnt) : bnt;
    }
    if(obj.attr("class") == "selects"){
      obj.attr("class","no-selects");
      obj.attr("flag",true);
      bnt.addClass("u-Bg-grey").attr("disabled",true);
    }else{
      obj.attr("class","selects");
      obj.attr("flag",false);
      bnt.removeClass("u-Bg-grey").attr("disabled",false);
    }
  }

  /*获取滚动条当前的位置*/
  function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop){
      scrollTop = document.documentElement.scrollTop;
    }else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }
  /*获取当前可视范围的高度*/
  function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight){
      clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    }else{
      clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
  }

  function setStringSyle(str,startNum,endNum,mask){

    var len = str.length, tempMask;
    startNum = startNum === undefined ? 2 : startNum;
    endNum = endNum === undefined ? 2 : endNum;
    mask = mask || "***";//掩码
    return str.replace(/./g,function(match, index){
      //保留前2位字符和后2位字符，中间使用固定长度的掩码
      return (index < startNum || index >= len - endNum) ? match : (tempMask = mask, mask = "", tempMask);
    });
  }

  return {
    checkForm : { //表单验证
      checkUser : checkUser,
      checkMobile : checkMobile,
      checkPhone : checkPhone,
      checkEmail : checkEmail,
      checkPwd : checkPwd,
      checkPayPwd:checkPayPwd,
      checkName : checkName,
      checkId : checkId,
      checkCard : checkCard,
      checkCardType : checkCardType
    },
    errorTip : errorTip,
    lock : lockWindow,
    unlock : unlockWindow,
    localSetItem : localSetItem,
    localGetItem : localGetItem,
    countDown       : countDown,
    clearCountDown : clearCountDown,
    isCountingDown : isCountingDown,
    getStatus:getStatus,
    getLocationStr : getLocationStr,
    getScrollTop : getScrollTop,
    getClientHeight : getClientHeight,
    setStringSyle : setStringSyle
  }
})();