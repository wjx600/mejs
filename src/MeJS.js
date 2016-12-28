import ajax from './modules/base/ajax.js';
import browser from './modules/base/browser.js';
import dataStorage from './modules/base/dataStorage.js';
import loading from './modules/base/loading.js';
import modal from './modules/base/modal.js';
import require from './modules/base/require.js';
import str from './modules/base/string.js';
import timeout from './modules/base/timeout.js';
import url from './modules/base/url.js';
import validate from './modules/base/validate.js';
import cookie from './modules/base/cookie.js';
import post_yb from './modules/base/postOpen.js';
import jquery from 'jquery/dist/jquery.js';

window.jQuery = window.$ = jquery;

window.me = {
	ajax : ajax,
	browser : browser,
	localStorage : dataStorage.localStorage,
	sessionStorage : dataStorage.sessionStorage,
	loading : loading,
	modal : modal,
	require : require,
	str : str,
	timeout : timeout,
	url : url,
	post_yb : post_yb,
	validate : validate,
	cookie:cookie
};
