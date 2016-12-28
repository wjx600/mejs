/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */

let browser = () => {
	
 	let Sys = {};
  let ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/MicroMessenger/i) == 'micromessenger') ? Sys.wx = true :
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
  (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
  (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
  (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
  (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] :0;
  return Sys;
  /*if (Sys.ie) document.write('IE: ' + Sys.ie);
  if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
  if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
  if (Sys.opera) document.write('Opera: ' + Sys.opera);
  if (Sys.safari) document.write('Safari: ' + Sys.safari);*/

};

export default browser;