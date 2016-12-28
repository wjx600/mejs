
(function(me){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		fillHtml:function(obj,args){
			if (args.pageCount == 1) {
				return function () {
					obj.empty();
				}();
			} else {
				return (function(){
					obj.empty();

					if(args.current > 1){
						obj.append('<li class="prevPage">上一页</li>');
					}else if(args.pageCount){
						obj.remove('.prevPage');
						obj.append('<li class="disabled" style="background:#dcdcdc;color:#fff;border:1px solid #dcdcdc;">上一页</li>');
					}
					if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
						obj.append('<li class="tcdNumber">'+1+'</li>');
					}
					if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
						obj.append('<li>...</li>');
					}
					var start = args.current -2,end = args.current+2;
					if((start > 1 && args.current < 4)||args.current == 1){
						end++;
					}
					if(args.current > args.pageCount-4 && args.current >= args.pageCount){
						start--;
					}
					for (;start <= end; start++) {
						if(start <= args.pageCount && start >= 1){
							if(start != args.current){
								obj.append('<li class="tcdNumber">'+ start +'</li>');
							}else{
								obj.append('<li class="m_active">'+ start +'</li>');
							}
						}
					}
					if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
						obj.append('<li>...</li>');
					}
					if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
						obj.append('<li class="tcdNumber">'+args.pageCount+'</li>');
					}
					if(args.current < args.pageCount){
						obj.append('<li class="nextPage">下一页</li>');
					}else if(args.pageCount){
						obj.remove('.nextPage');
						obj.append('<li class="disabled" style="background:#dcdcdc;color:#fff;border:1px solid #dcdcdc;">下一页</li>');
					}
				})();
			}
		},
		bindEvent:function(obj,args){
			return (function(){
				obj.off('click');
				$('.tcdNumber,.prevPage,.nextPage').off('click');
				obj.on("click",".tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current,true,args.ele);
					}
				});
				obj.on("click",".prevPage",function(){
					var current = parseInt(obj.children(".m_active").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1,true,args.ele);
					}
				});
				obj.on("click",".nextPage",function(){
					var current = parseInt(obj.children(".m_active").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1,true,args.ele);
					}
				});
			})();
		}
	}
  var oldOptions = '';
  var isTrue = false;
  var _this = '';
	var pagesArr = {};
	me.pages = function(options){
		//console.log('options-----------  ' + options)
    oldOptions = options;
		//if(!pagesArr[options.ele]){
		pagesArr[options.ele] = options;
		//}
		
    //_this = this;
    oldOptions.backFn(1);
	}
  me.pages.init = function(pageCount,isInit,ele){

		/*if(ele){
			if(ele){
				oldOptions = pagesArr[ele];
			}else{
				oldOptions = oldOptions;
			}
      oldOptions.pageCount = pageCount;
			console.log(oldOptions.ele)
      ms.init($(oldOptions.ele),oldOptions);
		}*/

    if(!isTrue && !ele){
      isTrue = true;
			if(ele){
				oldOptions = pagesArr[ele];
			}else{
				oldOptions = oldOptions;
			}
      oldOptions.pageCount = pageCount;
			//console.log(oldOptions.ele)
      ms.init($(oldOptions.ele),oldOptions);
    }

		if(isInit || ele){
			//isTrue = false;
			if(ele){
				oldOptions = pagesArr[ele];
			}else{
				oldOptions = oldOptions;
			}
      oldOptions.pageCount = pageCount;
			//console.log(oldOptions.ele)
      ms.init($(oldOptions.ele),oldOptions);
		}
  }
})(me);