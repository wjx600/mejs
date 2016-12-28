/*
    @弹窗
    @MaskStyle : 弹窗遮罩层样式名,不传使用默认样式;
    @WrapObj : 弹窗DOM结构className;
    @DialogObj : 
		{
			"url/text"        : "dialog.html .dialogTest / 文本内容", //必须
			"simple"     : true/false,                //非必须,ture-精简;不传或者false,非精简
			"title"      : "title",                   //simple为ture是必传,否则不传
			"close"      : true/false,                //simple为ture是必传,否则不传
			"OtherClose" : true/false,                //必须
			"width"      : "500px"                    //simple为ture是必传,否则不传
			"showPoint"  : ".className/#idName"       //弹窗以某个元素为参考点显示
			"showPot"    : "top,left,right,bottom"    //在某个元素的上,左,右,下显示;showPoint传值才有效
		};
*/
me.dialog = (function(WrapObj,MaskStyle) {
    jQuery.extend( jQuery.easing,{
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        }
    })
    var Dialog = {},MaskStyles,WrapDom;
    
	//显示弹窗
	Dialog.ShowDialog = function (DialogObj, callback) {
		me.dialog.closeDialog();
		//遮罩样式
		MaskStyles = MaskStyle ? "class=" + MaskStyle : "style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:25530;overflow:auto;background:#000;opacity:0.3;filter:Alpha(opacity=30)'";

		//弹窗DOM机构
		if (DialogObj.simple) {
			WrapDom = "<div class='" + WrapObj + "'><div data-type='container' class='Dialogcontainer'></div></div>";
		} else {
			WrapDom = "<div class='" + WrapObj + "'><h1 data-type='title'><p class='title'>title</p><p class='closeDialog' title='关闭'>×</p></h1><div data-type='container' class='Dialogcontainer'></div></div>";
		}
		$("head").append("<style id='dislogStyle'>" + ".DialogMaskLayou { bottom: 0;left: 0;position: fixed;right: 0;top: 0;z-index: 25531;} \
							.DialogModalWrap {opacity: 0;position: absolute;z-index: 9999;} \
							.DialogModalWrap h1 { border-radius: 5px 5px 0 0;height: 40px;line-height: 40px;padding: 0 20px;color: #fff;margin:0px;font-size:20px;font-family:'微软雅黑'} \
							.DialogModalWrap .Dialogcontainer {background: #f5f5f5 none repeat scroll 0 0;} \
							.DialogModalWrap h1 .closeDialog {cursor: pointer;float: right;height: 16px;position: absolute;top: 0px;right:10px;}\
						</style>");
		//禁用滚轮
		if ($("body").hasClass("dialogModalOpen")) {
			$("body").removeClass("dialogModalOpen");
			$("#DialogMask,.DialogModalWrap,.DialogMaskLayou").remove();
		} else {
			$("body").addClass("dialogModalOpen");
			$("body").append("<div id='DialogMask' " + MaskStyles + "></div><div class='DialogMaskLayou'></div>");
			Dialog.screenH = document.documentElement.clientHeight;
			Dialog.screenW = document.documentElement.clientWidth;
			$(".DialogMaskLayou").append(WrapDom);

			//非精简模式设置头部颜色
			if (!DialogObj.simple) {
				var color = DialogObj.color || '#1ab394';
				$(".DialogModalWrap h1").css("background", color);
			}

			var Wrap = $("." + WrapObj);
			if ("text" in DialogObj) {
				$("." + WrapObj + " .Dialogcontainer").append("<p>" + DialogObj.text + "</p>");
				oprateDialog();
			} else {
				$("." + WrapObj + " .Dialogcontainer").load(DialogObj.url, oprateDialog);
			}
		}
		function oprateDialog() {
			//先设置提示内容
			if (callback) {
				callback(Dialog);
			}
			//如果提示框的高度超过窗口的高度，提示框最高指导窗口的高度，内容显示不全就出滚动条
			if (DialogObj.width && DialogObj.width.indexOf('%') >= 0) {
				Dialog.WrapDomW = $(window).width() * (DialogObj.width.split("%")[0] / 100);
			} else {
				Dialog.WrapDomW = DialogObj.width || $("." + WrapObj + " .Dialogcontainer").outerWidth(true);
			}
			Wrap.outerWidth(Dialog.WrapDomW);
			//先设置提示的宽度，然后才能使用它的高度（否则高度可能不正确）
			Dialog.WrapDomH = DialogObj.height || Wrap.outerWidth(Dialog.WrapDomW).outerHeight(true);
			Dialog.scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			//计算位置坐标
			if(DialogObj.showPoint){
				Dialog.left = Dialog.targetShow(DialogObj.showPoint).left + "px";
				Dialog.top = Dialog.targetShow(DialogObj.showPoint).top + "px";
			}else{
				Dialog.top = (Dialog.screenH - Dialog.WrapDomH) / 2 + "px";
				Dialog.left = (Dialog.screenW - Dialog.WrapDomW) / 2 + "px";
			}

			//非精简模式添加title及为关闭按钮绑定事件
			if (!DialogObj.simple) {
				Wrap.find(".title").text(DialogObj.title);
				if (!DialogObj.close) {
					Wrap.find(".closeDialog").hide();
				} else {
					Wrap.find(".closeDialog").bind("click", function () {
						Dialog.DialogClose();
					});
				}
			}

			//取消按钮关闭窗口
			Wrap.find("button.cancel,*.DialogCancel").bind("click", function () {
				Dialog.DialogClose();
			});
			//显示
			if(DialogObj.showPoint){
				Wrap.css({ "top": Dialog.top, "left": Dialog.left, "width": DialogObj.width + "px",opacity:'1'});
			}else{
				Wrap.css({ "top": "0px", "left": Dialog.left, "width": DialogObj.width + "px" }).animate({
					top: Dialog.top,
					opacity: '1'
				}, {
					easing: 'easeOutCubic',
					//duration:5000,
					complete: fn
				});
			}
			function fn() {
				if (DialogObj.fadeOut) {
					window.setTimeout(function () {
						$("." + WrapObj).fadeOut("slow", function () {
							Dialog.DialogClose();
						});
					}, DialogObj.fadeOut);
				}
			}
			//在弹窗外区域点击关闭弹窗
			$(".DialogMaskLayou").bind("click", function (e) {
				if (DialogObj.OtherClose && $(e.target).attr("class") === "DialogMaskLayou") {
					Dialog.DialogClose();
				}
			});
		}
	};
	//以参考点元素计算显示坐标
	Dialog.targetShow = function(obj){
		var targetLeft = $(obj).offset().left,
			targetTop  = $(obj).offset().top,
			targetW    = $(obj).outerWidth(true),
			targetH    = $(obj).outerHeight(true);
		return {
			"left":targetLeft - Dialog.WrapDomW + targetW/2,
			"top": targetTop  - Dialog.WrapDomH - Dialog.scrolltop
		}
	}
    //关闭弹窗内容
    Dialog.DialogClose = function(callback){
        $("."+WrapObj+",#DialogMask,.DialogMaskLayou").remove();
        $("#dislogStyle").remove();
        $("body").removeClass("dialogModalOpen");
        if(callback){
            callback();
        }
    }
    return{
        showDialog : Dialog.ShowDialog,
        closeDialog : Dialog.DialogClose
    }
}("DialogModalWrap"));