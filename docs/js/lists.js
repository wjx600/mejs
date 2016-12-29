
$(function () {
  //  导航列表
  var lists = {
    'me.ajax': 'ajax.html',
    'me.browser': 'browser.html',
    'me.dataStorage': 'dataStorage.html',
    //sessionStorage : dataStorage.sessionStorage,
    'me.loading': 'loading.html',
    'me.modal': 'modal.html',
    'me.require': 'require.html',
    'me.str': 'string.html',
    'me.timeout': 'timeout.html',
    'me.url': 'url.html',
    'me.validate': 'validate.html',
    'me.post_yb': 'post_yb.html',
    'me.pages': 'pages.html',
    'me.replaceTpl': 'replaceTpl.html',
    'me.errTips': 'errTips.html',
    'me.dialog': 'dialog.html'
  }

  var arr = [];
  for (var n in lists) {
    arr.push('<li><a href="' + lists[n] + '"><i class="icon-chevron-right"></i>' + n + '</a></li>');
  }
  $('#lists').html(arr.join(''));
  console.log(1)
  // 通用头部尾部提取
  var basicUrl = (location.href.indexOf("pages") > -1 ) ? '../' : "";
  $("<div/>").load(basicUrl + "pages/header.html",function(rep){
    $(rep).prependTo($("body"))
  })
  $("<div/>").load(basicUrl + "pages/footer.html",function(rep){
    $(rep).appendTo($("body"))
  })
})
