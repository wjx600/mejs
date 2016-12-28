/**
 * @description
 * @author 李林
 * @time 2016/04/8
 */

me.replaceTpl = (function(me){
  
  function _replaceTpl(o){
    //console.log('mustache1')
    me.require(['mustache'],function(){
      //console.log('mustache2')
      if($(o.tpl).attr('type') != 'text/tpl'){
        o.callback('模板type类型应该为：text/tpl');
        return false;
      }

      var template = $(o.tpl).html();
      me.Mustache.parse(template);   // optional, speeds up future uses
      var rendered = me.Mustache.render(template, o.data);

      //ajax.callback(data);
      o.callback(rendered);

    });

  }

  return _replaceTpl;

})(me)