/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */

 /*
	锁屏
*/
let modal = {}

modal.show = ( zIndex=25535,callback ) => {
	$("<div class='f_wndmask' style='position:fixed;top:0px;left:0px;width:100%;height:100%;padding:0px;margin:0px;z-index:"+zIndex+";background:rgba(0, 0, 0, 0);'></div>").appendTo("body");
	callback && callback();
}
/*
	解锁
*/
modal.hide = () => {
	$(".f_wndmask").remove();
}

export default modal;

