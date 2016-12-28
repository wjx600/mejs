/*
@ o  对象
@ o.callback  回调函数
@ o.text 提示文本
@ o.time 运行时间,默认3秒（3000）
@ o.from 开始的位置,默认0
@ o.to   结束的位置,默认80 
@ o.width tips的宽度,默认50%
@ o.left  tips的left定位值,默认50%
@ 示例：
	me.errorTips({
		text:"请输入正确的姓名!",
		time:3000,
		form:20,
		to  :150,
		width:300px,
		left:300px,
		callback:function(){
			//----
		}
	});
*/
me.errorTips = (function () {
    return function (o) {
		var width   = o.width || '50%',
			left    = o.left  || '50%',
			screenW = document.documentElement.clientWidth,
			styles  = ".u-error-tips{ \
                        display:none;position:fixed;top:0;left:"+left+";width:"+width+";border-radius:4px;padding:10px 8px;color:#fff;filter:Alpha(opacity=70);opacity:0.7;background:#000;z-index:25535; \
                    } \
                    .u-error-tips span{ \
                        display:block;text-align:center;min-height:25px;font-size:1.5em;line-height:25px;background-size:25px 25px; \
                    }";
					
        $("head").append("<style id='errtipStyle'>"+styles+"</style>")
        if ($("#J-pageErrorTips").length > 0) {
            $("#J-pageErrorTips").remove();
        }
        $("body").append("<div id='J-pageErrorTips' class='u-error-tips' style='display:none'><span></span></div>");
        
        var errorTip = $("#J-pageErrorTips");
        var callback = o.callback;
        var showTime = o.time || 3000;
        var fromY = o.from || 0;
        var toY = o.to || 80;
        errorTip.find('span').text(o.text);
        errorTip.show();
		if(!o.left){
			errorTip.css({"left":(screenW - errorTip.outerWidth(true)) / 2 + "px"});
		}
        errorTip.css({ top: fromY }).animate({ top: toY });
        errorTip.fadeOut(showTime, function () {
            $(this).css({ top: fromY });
            $("#errtipStyle").remove();
            callback && callback();
        });
    }
})()

