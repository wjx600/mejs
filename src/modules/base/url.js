/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */

let url = (url) => {
	let a;
	if(!url){
		a = window.location.search.substr(1).split('&');
	}else{
		let c = url.split('?')[1];
		a = c ? c.substr(1).split('&') : url.substr(1).split('&');
	}
	if (a == "") return {};  
  let b = {};  
  a.forEach((value) => {
  	let p = value.split('=');  
    if (p.length != 2){

    }else{
    	b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
  });
  return b; 
};

export default url;

