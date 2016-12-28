/*
 全站滚动控件 
 调用:
	$(".xxx").meScrollBar({
		btnNext: ".mouseWheelButtons .next",
		btnPrev: ".mouseWheelButtons .prev",
		mouseWheel: true,
		visible:6,
		scroll:3
	});
  Dom结构:
    <a href="#" class="prev">&lsaquo;</a>
	<div class="xxx">
		<ul>
			<li class="siblings"></li>
			<li class="siblings">内容</li>
			<li class="siblings">内容</li>
		</ul>
	</div>
	<a href="#" class="next">&rsaquo;</a> 
*/
(function($) {
    $.fn.meScrollBar = function(options) {
        options = $.extend({}, $.fn.meScrollBar.options, options || {});
        return this.each(function() {
            var running,
                animCss, sizeCss,
                div = $(this), ul, initialLi, li,
                liSize, ulSize, divSize,
                numVisible, initialItemLength, itemLength, calculatedTo, autoTimeout;

            initVariables();
            initStyles();
            initSizes();
            attachEventHandlers(); 

            function go(to) {
				if(div.attr("data-stop") == "false") return false;
                if(!running) {
                    clearTimeout(autoTimeout); 
                    calculatedTo = to;
                    if(options.beforeStart) {
                        options.beforeStart.call(this, visibleItems());
                    }
                    if(options.circular) {
                        adjustOobForCircular(to);
                    } else {
                        adjustOobForNonCircular(to);
                    } 
                    animateToPosition({ 
                        start: function() {
                            running = true;
                        },
                        done: function() {
                            if(options.afterEnd) {
                                options.afterEnd.call(this, visibleItems());
                            }
                            if(options.auto) {
                                setupAutoScroll();
                            }
                            running = false;
                        }
                    });

                    if(!options.circular) {
                        disableOrEnableButtons();
                    }
                }
                return false;
            }

            function initVariables() {
                running = false;
                animCss = options.vertical ? "top" : "left";
                sizeCss = options.vertical ? "height" : "width";
                ul = div.find(">ul");
                initialLi = ul.find("li.siblings");
                initialLi.outerWidth(ul.outerWidth(true));
                initialItemLength = initialLi.size();

                numVisible = initialItemLength < options.visible ? initialItemLength : options.visible;
                if(options.circular) {
                    var $lastItemSet = initialLi.slice(initialItemLength-numVisible).clone(true);
                    var $firstItemSet = initialLi.slice(0,numVisible).clone(true);
                    ul.prepend($lastItemSet).append($firstItemSet);
                    options.start += numVisible; 
                }
				if(options.mouseOver && options.auto){
					div.attr("data-stop",true);
					div.hover(function(){
						$(this).attr("data-stop",false);
						clearTimeout(autoTimeout); 
					},function(){
						$(this).attr("data-stop",true);
						setupAutoScroll()
					})
				}
                li = $("li.siblings", ul);
                itemLength = li.size();
                calculatedTo = options.start;
            }

            function initStyles() {
                div.css("visibility", "visible");
                li.css({
                    overflow: "hidden",
                    "float": options.vertical ? "none" : "left"
                });
                ul.css({
                    margin: "0",
                    padding: "0",
                    position: "relative",
                    "list-style": "none",
                    "z-index": "1"
                });
                div.css({
                    overflow: "hidden",
                    position: "relative",
                    "z-index": "2",
                    left: "0px"
                });
                
                if(!options.circular && options.btnPrev && options.start == 0) {
                    $(options.btnPrev).addClass("disabled");
                }
            }

            function initSizes() {
                liSize = options.vertical ? li.outerHeight(true) : li.outerWidth(true);
                ulSize = liSize * itemLength;       
                divSize = liSize * numVisible; 
                //console.log(liSize);     
                li.css({
                    width: li.width(),
                    height: li.height()
                });
                
                ul.css(sizeCss, ulSize+"px").css(animCss, -(calculatedTo * liSize));
                div.css(sizeCss, divSize+"px");
            }

            function attachEventHandlers() {
                if(options.btnPrev) {
                    $(options.btnPrev).click(function() {
                        return go(calculatedTo - options.scroll);
                    });
                }
                if(options.btnNext) {
                    $(options.btnNext).click(function() {
                        return go(calculatedTo + options.scroll);
                    });
                }
                if(options.btnGo) {
                    $(options.btnGo[0]).addClass(options.currentPage);
                    $.each(options.btnGo, function(i, val) {
                        $(val).click(function() {
							$(this).addClass(options.currentPage).siblings().removeClass(options.currentPage);
                            return go(options.circular ? numVisible + i : i);
                        });
                    });
                }
                if(options.mouseWheel && div.mousewheel) {
                    div.mousewheel(function(e, d) {
                        return d > 0 ?
                            go(calculatedTo - options.scroll) :
                            go(calculatedTo + options.scroll);
                    });
                }
                if(options.auto) {
                    setupAutoScroll();
                }
            }

            function setupAutoScroll() {
                autoTimeout = setTimeout(function() {
                    go(calculatedTo + options.scroll);
                }, options.auto);
            }

            function visibleItems() {
				if(options.btnGo){	
					li.each(function(k,v){
						if(Math.abs($(v).position().left) == Math.abs($(v).parents("ul").position().left)){
							var index = $(v).attr("data-index");
							$("."+options.pagesBox+" ."+index).addClass(options.currentPage).siblings().removeClass(options.currentPage);
						}
					})
				}
                return li.slice(calculatedTo).slice(0,numVisible);
            }

            function adjustOobForCircular(to) {
                var newPosition;
                if(to <= options.start - numVisible - 1) {
                    newPosition = to + initialItemLength + options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition - options.scroll;
                    //console.log("Before - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }else if(to >= itemLength - numVisible + 1) {
                    newPosition = to - initialItemLength - options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition + options.scroll;
                    //console.log("After - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }
            }

            function adjustOobForNonCircular(to) {
                if(to < 0) {
                    calculatedTo = 0;
                }else if(to > itemLength - numVisible) {
                    calculatedTo = itemLength - numVisible;
                }
                //console.log("Item Length: " + itemLength + "; " +"To: " + to + "; " +"CalculatedTo: " + calculatedTo + "; " +"Num Visible: " + numVisible);
            }

            function disableOrEnableButtons() {
                $(options.btnPrev + "," + options.btnNext).removeClass("disabled");
                $( (calculatedTo-options.scroll<0 && options.btnPrev)
                    ||
                    (calculatedTo+options.scroll > itemLength-numVisible && options.btnNext)
                    ||
                    []
                ).addClass("disabled");
            }

            function animateToPosition(animationOptions) {
                running = true;
                ul.animate(
                    animCss == "left" ?
                    { left: -(calculatedTo*liSize) } :
                    { top: -(calculatedTo*liSize) },
                    $.extend({
                        duration: options.speed,
                        easing: options.easing
                    }, animationOptions)
                );
            }
        });
    };

    $.fn.meScrollBar.options = {
        btnPrev: null,              // 上一个按钮的class名, 比如  btnPrev: ".prev"
        btnNext: null,              // 下一个按钮的class名, 比如  btnPrev: ".prev"
        btnGo: null,                // 自定义滚动位置,类似幻灯片效果置有选项卡,按照数组顺序,依次为按钮1按钮2按钮N.,class名为1的按钮是第一个按钮:[".1", ".2"]
        mouseWheel: false,          // 鼠标滑是否可以轮控制上下滚动,可选：false,true,默认false
		mouseOver:true,             // 鼠标放上是否停止自动滚动
        auto: null,                 // 指定多少秒内容定期自动滚动。默认为空(null),是不滚动,如果设定的,单位为毫秒,如1秒为1000
        speed: 200,                 // 滑动的速度,可以尝试800 1000 1500,设置成0将删除效果
        easing: null,               // 缓冲效果名称,如:easing: "bounceout",需要jquery中的easing pluin（缓冲插件实现）
        vertical: false,            // 是否垂直滚动,可选：false,true,默认false
        circular: true,             // 是否循环滚动,默认为true,如果为false,滚动到最后一个将停止滚动
        visible: 3,                 // 可见数量,可以为小数，如2.5为2.5个li
        start: 0,                   // 开始的地方,默认是0
        scroll: 1,                  // 每次滚动的li数量
		currentPage: null,          // 当前"页"className(如果设置了页码的话)
		pagesBox: null,             // 页码的外容器className
        beforeStart: null,          // 滚动开始时回调的函数,可以传入对象参数 beforeStart: function(a) { alert("开始的对象是:" + a)}
        afterEnd: null              // 滚动结束时回调的函数,使用方法同上
    };
})(jQuery);