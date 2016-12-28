(function(me){
  me.endTime = function(obj){
      var ps = obj.endTime.split(" ");
		  var pd = ps[0].split("-");
		  var pt = ps.length>1 ? ps[1].split(":"): [0,0,0];
	    var EndTime = new Date(pd[0],pd[1]-1,pd[2],pt[0],pt[1],pt[2]);
      var NowTime = new Date();
      var t =EndTime.getTime() - NowTime.getTime();
      if(t > 0){
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
        
        $(obj.ele).html(obj.str || d + "天" + h + "时" + m + "分" + s + "秒");
      }else{
        $(obj.ele).html('已结束'); 
      }
  }
})(me);