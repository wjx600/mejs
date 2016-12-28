/**
 * @description 界面上倒计时
 * @author 应雨加
 * @time 2016/03/30
 * @param {{dom:Object,text:String,retryTxt:String,cb:Function}} opts
 */
export default (opts) => {

  let $dom = typeof opts.dom === 'string' ? $(opts.dom) : opts.dom;
  if($dom.length===0){
     //console.log('元素不存在',$dom);
     return;
  }
  let isInput = $dom[0].nodeName.toLowerCase() === 'input';
  let text = opts.text || '{{time}}秒后重新获取...',
    retry = opts.retryTxt || (isInput ? $dom.val() : $dom.text()),
    preDoing = opts.preDoing,
    time;
  var getText = function (time) {
    return text.replace(/\{\{time}}/ig, time.toString())
  };

  $dom.on('click', () => {

    if (!$dom.data('yue-timeout')) {
      if ($.isFunction(preDoing)) {
        if (preDoing() === false) {
            return false;
        }
      }
      time = opts.time || 60;
      $dom.attr('disable', 'disable');

      isInput?$dom.val(getText(time)):$dom.text(getText(time));

      let timer = setInterval(function () {
        time--;
        if (time > 0) {
          isInput ? $dom.val(getText(time)) :
            $dom.text(getText(time));
        }
        else {
          window.clearInterval(timer);
          $dom.data('yue-timeout', false);
          isInput ? $dom.val(retry) : $dom.text(retry);
          if ($.isFunction(opts.cb)) {
            opts.cb();
          }
        }
      }, 1000);
      $dom.data('yue-timeout', timer);
    }

  });
};


