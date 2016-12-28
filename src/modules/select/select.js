/*
 * @description
 * @author 王灵聪
 * @time 2016/03/28
 */
 me.select = (function(){
	function Choose(ele,model,options){
			this.options = options;
			if ((typeof this.options !== 'object') || (this.options === null)) {
				this.maxHeight = "200px";  //选项列表高度
				this.width = "300px";
				this.height = "30px";
				this.color = "#e5e6e7";
				this.text = "请选择";
				this.arrow = false;
				this.choosenClass = "sel-selectItem";
				this.ev = "";
				this.callback = "";
			}else{
				this.maxHeight = this.options.maxHeight || "200px";
				this.width = this.options.width || "300px";
				this.height = this.options.height || "30px";
				this.text = this.options.text || "请选择";
				this.arrow = this.options.arrow || false;
				this.choosenClass = this.options.choosenClass || "sel-selectItem";
				this.ev = this.options.ev || "";
				this.callback = this.options.callback || "";
			}
			if((typeof model !== 'number') || (model === null) || model !=1 || model !=0){
				this.model = 0;
	 		}
			this.ele = $(ele);
			this.model = model;
			this.ele.css({"display":"none","width":this.width});
			this.w = this.ele.width();
			this.opt = this.ele.find("option");
			this.sCon = this.ele.parent();
			this.choosen ="<ul class='sel-choosenShowList'><li><input type='text' readonly class='sel-inp' width='"+this.width+"' placeholder='"+this.text+"'></li></ul>";
			this.nSelect ="<div class='sel-chooseListContainer'><ul></ul></div>";
			this.list = "";
			this.chooseData = [];
			this.chooseValue = [];
	}
	Choose.prototype.set = function() {
			this.getSelectList();
			this.init();
			if(this.model == 1){
				this.mutiSelect();
			}else{
				this.singleSelect();
			}
	}
	Choose.prototype.get = function() {
		if(this.model === 1){
			return this.sCon.attr("data-choose");
		}else{
			return this.sCon.attr("data-value");
		}
		
	}
	Choose.prototype.init = function() {
		if($("#selectStyle").size() == 0){
			$("head").append("<style id='selectStyle'>"+"*{margin:0px;padding:0px;} \
													div:after, ul:after, dl:after,.clearfix:after { content:''; display:block; clear:both; height:0; visibility:hidden;} \
													.sel-choosenShowList{margin: 0;padding: 0;cursor: text;overflow: hidden;height: auto !important;position: relative;border:1px solid #e5e6e7;list-style:none} \
													.sel-choosenShowList .sel-selectItem{background-color: #e4e4e4;border: 1px solid #aaa;border-radius: 4px;padding: 3px 3px;margin:3px} \
													.sel-choosenShowList li{float: left;} \
													.sel-choosenShowList .sel-inp{border:0;outline:none;padding-left:5px})} \
													.sel-choosenShowList b{cursor: pointer;} \
													.sel-choosenShowList .sel-delete{ color: #999;cursor: pointer;display: inline-block;font-weight: bold;margin-left: 2px;} \
													.sel-choosenShowList .sel-delete:hover{color:black;} \
													.sel-chooseListContainer{background:#fff;overflow-y:scroll;display:none;listStyle:none;border:1px solid #aaa} \
													.sel-chooseListContainer .sel-list{height:30px;line-height: 30px;cursor: pointer;padding: 0px 7px} \
													.sel-hoverActiveShow{background-color: #3875d7;color:white;} \
													.sel-choosenMouseFocus{border:1px solid #5897fb;boxShadow:0 0 5px rgba(0,0,0,.3)}} \
													.sel-slideDown{display:block;width:10px;height:10px;background: black} \
													.sel-downArrow{width:0; height:0; border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #e5e6e7;position:absolute;right:5px;top:50%;margin-top:-5px} \
													.sel-downArrow:hover{border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #e5e6e7;border-top:10px solid #aaa;}"+"</style>") 
		}
		this.bindEvents();
		this.sCon.css({"width":this.w,"position":"relative","display":"inline-block"});
		this.sCon.find(".sel-choosenShowList").css({"width":this.w,"min-height":this.height});
		this.sCon.find(".sel-inp").css("height",this.sCon.find(".sel-choosenShowList").outerHeight(true));
		this.sCon.find(".sel-chooseListContainer").css({"width":this.w,"max-height":this.maxHeight,"position":"absolute","z-index":65535});
		if(this.arrow){
			this.sCon.append("<div class='sel-arrow sel-downArrow' id='arrow'></div>");
		}
	}
	Choose.prototype.bindEvents = function() {
		var that = this;
		this.sCon.on("click",function(e) {
			if(!$(e.target).hasClass('sel-delete')){
				that.sCon.find(".sel-inp").focus();
			}
			if($(e.target).hasClass('sel-choosenShowList') || $(e.target).hasClass('sel-inp') || $(e.target).hasClass(that.choosenClass)|| $(e.target).hasClass('sel-selectedTxt')|| $(e.target).hasClass('sel-arrow')){
				if(that.sCon.find(".sel-chooseListContainer").css("display") == "none"){
					$(".sel-chooseListContainer").css("display","none");
					$(".sel-choosenShowList").removeClass('sel-choosenMouseFocus');
					that.sCon.find(".sel-chooseListContainer").css("display","block");
					that.sCon.find(".sel-choosenShowList").addClass('sel-choosenMouseFocus');
				}else{
					that.sCon.find(".sel-chooseListContainer").css("display","none");
					that.sCon.find(".sel-choosenShowList").removeClass('sel-choosenMouseFocus');
				}
			}
		});
		$(document).on("click",function(e){
			if($(e.target).hasClass('sel-choosenShowList') || $(e.target).hasClass('sel-inp') || $(e.target).hasClass(that.choosenClass)|| $(e.target).hasClass('sel-arrow') || $(e.target).hasClass('sel-selectedTxt')){
		  		return;
		  }else if(!$(e.target).hasClass("sel-list")){
		  		that.sCon.find(".sel-chooseListContainer").css({"display":"none"});
		  		that.sCon.find(".sel-choosenShowList").removeClass('sel-choosenMouseFocus');
		  	}
		  });
		this.sCon.find(".sel-chooseListContainer").on("mouseover",">ul>li",function(){
		 		$(this).addClass("sel-hoverActiveShow");
		 });
		 this.sCon.find(".sel-chooseListContainer").on("mouseout",">ul>li",function(){
		 		$(this).removeClass("sel-hoverActiveShow");
		 });
	}
	Choose.prototype.mutiSelect = function() {
		var that = this;
		this.sCon.find(".sel-chooseListContainer").on("click","li",function(){
		 		var span = "";
		 		span += "<li class='"+that.choosenClass+"' rel='"+$(this).attr("rel")+"'><span class='sel-selectedTxt'>"+$(this).text()+"</span><b class='sel-delete'>×</b></li>";
		 		that.sCon.find(".sel-inp").parent().before(span);
		 		$(this).remove();
		 		that.sCon.find(".sel-arrow").hide();
		 		that.sCon.find(".sel-inp").focus();
		 		that.chooseData.push($(this).text());
		 		that.sCon.attr("data-choose",that.chooseData);
		 		that.isEmpty();
		 })
		 this.sCon.find(".sel-choosenShowList").on("click",".sel-delete",function(){
		 		var rel = $(this).parent().attr("rel");
		 		that.chooseData.splice(that.chooseData.indexOf($(this).prev().text()),1);
		 		that.sCon.attr("data-choose",that.chooseData);
		 		$(this).parent().remove();
		 		var str="";str="<li class='sel-list' rel='"+rel+"'>"+$(this).prev().text()+"</li>";
		 		var nextLocationArr = [],prevLocationArr = [];
		 		if(rel == 0){
		 			that.sCon.find(".sel-chooseListContainer ul").prepend(str);
		 		}else{
		 			for(var i=0;i<that.sCon.find(".sel-chooseList ul li").length;i++){
						if(+that.sCon.find(".sel-chooseListContainer ul li").eq(i).attr("rel") > +rel){
		 					nextLocationArr.push(that.sCon.find(".sel-chooseList ul li").eq(i));
		 				}else if(+that.sCon.find(".sel-chooseListContainer ul li").eq(i).attr("rel") < +rel){
		 					prevLocationArr.push(that.sCon.find(".sel-chooseListContainer ul li").eq(i));
		 				}
		 			}
			 		if(nextLocationArr.length == 0&&prevLocationArr.length!=0){
			 			prevLocationArr[prevLocationArr.length-1].after(str);
			 		}else if(nextLocationArr.length == 0&&prevLocationArr.length==0){
			 			that.sCon.find(".sel-chooseListContainer ul").prepend(str);
			 		}else if(nextLocationArr.length != 0&&prevLocationArr.length==0){
			 			nextLocationArr[0].before(str);
			 		}else{
			 			prevLocationArr[prevLocationArr.length-1].after(str);
			 		}
		 		}
		 		that.isEmpty();
		 })
	}
	Choose.prototype.singleSelect = function(){
		var that = this;
		this.sCon.find(".sel-chooseListContainer").on("click","li",function(){
		 		var span = "";
		 		that.chooseData = [];
		 		that.chooseValue = [];
		 		span += "<li rel='"+$(this).attr("rel")+"' style='line-height:"+that.height+";margin-left:10px'><span class='sel-selectedTxt'>"+$(this).text()+"</span></li>";
		 		that.sCon.find(".sel-inp").parent().siblings().remove();
		 		that.sCon.find(".sel-inp").parent().before(span);
		 		that.sCon.find(".sel-chooseListContainer").hide();
		 		that.chooseData.push($(this).text());
		 		that.chooseValue.push($(this).attr("value"));
		 		that.sCon.attr("data-choose",that.chooseData);
		 		that.sCon.attr("data-value",that.chooseValue);
		 		that.isEmpty();
		 })
		 this.sCon.find(".sel-choosenShowList").on("click",".sel-delete",function(){
		 		that.chooseData = [];
		 		that.sCon.attr("data-choose",that.chooseData);
		 		$(this).parent().remove();
		 		that.isEmpty();
		 })
	}
	Choose.prototype.getSelectList = function() {
		var that = this;
		for(var i=0;i<this.opt.length;i++){
		 		this.list += "<li class='sel-list' rel='"+i+"' value='"+this.opt[i].value+"'>"+this.opt[i].text+"</li>";
		 }
		 this.sCon.prepend(this.choosen);
		 this.sCon.append(this.nSelect);
		 this.sCon.find(".sel-chooseListContainer ul").append(this.list);
		 //绑定事件
		if(this.options.ev && this.options.callback){
			$.each(this.sCon.find(".sel-chooseListContainer ul li"),function(k,v){
				$(v).bind(that.options.ev,function(){
					that.options.callback($(this));
				})
			})
		} 
	}
	Choose.prototype.isEmpty = function() {
			var isEle = this.sCon.find(".sel-inp").parent().siblings();
			if(isEle.length == 0){
				this.sCon.find(".sel-inp").css({"width":this.width}).attr("placeholder",this.text);
				this.sCon.find(".sel-arrow").show();
			}else{
				this.sCon.find(".sel-inp").css({"height":$("."+this.choosenClass).outerHeight(true),"width":"5px"}).attr("placeholder","");
			}
	}
	Choose.prototype.empty = function(){
		this.sCon.find(".sel-selectedTxt").parent().remove();
		this.sCon.removeAttr('data-value');
		this.sCon.removeAttr("data-choose");
		this.isEmpty();
	}
	return{
		set : function(ele,model,options){
			return new Choose(ele,model,options).set();
		},
		get : function(ele,model,options){
			return new Choose(ele,model,options).get();
		},
		empty	: function(ele,model,options){
			return new Choose(ele,model,options).empty();
		}
	}
})()

 	