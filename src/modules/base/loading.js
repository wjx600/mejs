/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */


let loading = (dom,text,callback) => {
	dom.append('<div class="Yue-loading">'+text+'</div>');
	callback && callback();
}

export default loading;