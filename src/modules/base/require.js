/**
 * @description
 * @author 李林
 * @time 2016/03/29
 */
 
let fileMap = {};
let require = (pathArr, callback) => {
		pathArr.forEach((value) => {
			let path = value;
			if (!fileMap[path]) { //errtips,dailog
				let head = document.getElementsByTagName('head')[0];
				let node = document.createElement('script');
				node.type = 'text/javascript';
				node.async = 'true';
				if (window.location.host.indexOf('www.mejinrong.com') > -1) {
						node.src = window.location.protocol + '//static.mejinrong.com/MeAssest/MeJS/' + 'modules/' + value + '/' + value + '.js';
				} else {
					/*
		http://10.10.21.70:8097/MeAssest/    
		https://10.10.21.61:448/MeAssest/   
		https://teststatic.mejinrong.com:4430/MeAssest/
		*/
					if (window.location.protocol == 'http:') {
						node.src = window.location.protocol + '//10.10.21.70:8097/MeAssest/MeJS/' + 'modules/' + value + '/' + value + '.js';
					} else if (window.location.protocol == 'https:') {
						node.src = window.location.protocol + '//teststatic.mejinrong.com:4430/MeAssest/MeJS/' + 'modules/' + value + '/' + value + '.js';
					}
				}
				node.onload = () => {
					fileMap[path] = true;
					head.removeChild(node);
					checkAllFiles();
				};
				head.appendChild(node);
			}else{
				callback();
			}
	});

	function checkAllFiles(){
		let allLoaded = true;
		pathArr.forEach((value) => {
			if (!fileMap[value]) {
				allLoaded = false;
				//break;
				return;
			}
		});

		allLoaded && callback();
	}
};

export default require;