 
 $(function(){
    var lists = {
      'me.ajax' : 'ajax.html',
      'me.browser' : 'browser.html',
      'me.dataStorage' : 'dataStorage.html',
      //sessionStorage : dataStorage.sessionStorage,
      'me.loading' : 'loading.html',
      'me.modal' : 'modal.html',
      'me.require' : 'require.html',
      'me.str' : 'string.html',
      'me.timeout' : 'timeout.html',
      'me.url' : 'url.html',
      'me.validate' : 'validate.html',
      'me.post_yb' : 'post_yb.html'
    }

    var arr = [];
    for(var n in lists){
      arr.push('<li><a href="'+lists[n]+'"><i class="icon-chevron-right"></i>'+n+'</a></li>');
    }
    $('#lists').html(arr.join(''));
 })
 