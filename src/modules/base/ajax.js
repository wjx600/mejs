/**
 * @description
 * @author 李林
 * @time 2016/03/28
 */
let ajax = (o,limiTime) => {

    if(o.lock){
        if($(o.lock).hasClass('btn-default')){return;}

        $(o.lock).removeClass('btn-primary');
        $(o.lock).addClass('btn-default');
    }

    if(o.data.tokenid){
        $.ajax({
            type : o.type || "POST",
            url  : me.config.urls('verifytoken_pc'),
            data : {
                tokenid : o.data.tokenid
            },
            'async'   : o.async == false ? o.async : true,
            timeout : limiTime || 120000,
            success : (data) => {
                if(data){
                    //Fun();
                }else{
                    me.cookie.removeItem(o.data.tokenid + 'PHONENUMBER');
                    me.cookie.removeItem(o.data.tokenid + 'userEalDialogWrap');
                    me.cookie.removeItem(me.config.tokenid);
                    localStorage.removeItem('USER_WithDrow_TEL');
                    window.location.reload();
                }
            }
        })
    }
    $.ajax({
        type    : o.type || "POST",
        url     : me.config.urls(o.key) || o.key,
        //data    : JSON.stringify('' || o.data),
        data    : o.data,
        'async'   : o.async == false ? o.async : true,
        timeout : limiTime || 120000,
        success : (data) => {
            if(o.log == 'print'){
                console.log('------------------------------------------');
                console.log(me.config.urls(o.key));
                console.log(data);
                console.log('------------------------------------------');
            }
            
            o.callback && o.callback(typeof data == "object" ? 
                                            data : 
                                            $.parseJSON(data));
            if(o.lock){
                $(o.lock).removeClass('btn-default');
                $(o.lock).addClass('btn-primary');
            }
        },
        error : (error_msg) => {
            if(o.log == 'print'){
                console.log('------------------------------------------');
                console.log(me.config.urls(o.key));
                console.log(error_msg);
                console.log('------------------------------------------');
            }
            let tipsTxt;
            if(error_msg.statusText == "timeout"){
                tipsTxt = "请求超时!";
            }else{
                tipsTxt = "系统错误!";
            }
            o.callback && o.callback(tipsTxt);
            if(o.lock){
                $(o.lock).removeClass('btn-default');
                $(o.lock).addClass('btn-primary');
            }
        }
    });
}

export default ajax;