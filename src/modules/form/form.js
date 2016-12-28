/**
 * @description form 相关
 * @author yyj
 */
let form = {};

form.toJson = function (form) {
  var obj = {};
  form = typeof form === 'string' ? $(form) : form;
  form = form.serializeArray();

  for (var i = 0, len = form.length; i < len; i++) {
    obj[form[i].name] = form[i].value;
  }
  return obj;
}


export default form;