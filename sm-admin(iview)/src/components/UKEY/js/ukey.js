require ('./Syunew3.js');

/**
 * @description 身份证算出出生年月和性别
 * @param [string] 身份证号码
 */

export function init_Uk (KeyID,bConnect) {
    console.log(bConnect)
    // if(KeyID == ''){ return };
    if(navigator.userAgent.indexOf("MSIE")>0 && !navigator.userAgent.indexOf("opera") > -1) return;
    try{
        var s_pnp=new SoftKey3W();
        console.log(s_pnp.Socket_UK)
        s_pnp.Socket_UK.onopen = function(){
            bConnect=1;//代表已经连接，用于判断是否安装了客户端服务
        } 
        
        //在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
        s_pnp.Socket_UK.onmessage =function got_packet(Msg){
            var PnpData = JSON.parse(Msg.data);
            if(PnpData.type=="PnpEvent")//如果是插拨事件处理消息
            {
                if(PnpData.IsIn) 
                {
                        alert("UKEY已被插入，被插入的锁的路径是："+PnpData.DevicePath);
                }
                else
                {
                        alert("UKEY已被拨出，被拨出的锁的路径是："+PnpData.DevicePath);
                }
            }
        } 
        s_pnp.Socket_UK.onclose = function(){}
    }
    catch(e){  
        alert(e.name + ": " + e.message);
        return false;
    }
    return bConnect;
    
}

