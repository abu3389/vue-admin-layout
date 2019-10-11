<template>
    <div>

    </div>
</template>

<script>
import {init_Uk} from "./js/ukey.js";
import {SoftKey3W} from "./js/Syunew3.js";
export default {
    data(){
        return{
            KeyID:"",
            digitArray:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
            bConnect:0,//判断是否安装了客户端
        }
    },
    created () {
        this.init()
    },
    props:{
        /**
         * 参数：
        *   idCard  //用户名
         *  rnd     //后端接口获取的随机数
         *  return_EncData  //js利用rnd产生的随机数需要发送给后端
         */
        frmlogin:Object,
        // bConnect:Number,
        
    },
    methods:{
        init(){
            if(this.KeyID != ''){ return };
            if(navigator.userAgent.indexOf("MSIE")>0 && !navigator.userAgent.indexOf("opera") > -1) return;
            try{
                var s_pnp=new SoftKey3W();
                console.log(s_pnp.Socket_UK)
                let that = this;
                s_pnp.Socket_UK.onopen = function(){
                    console.log(5633)
                    that.bConnect = 1;//代表已经连接，用于判断是否安装了客户端服务
                    // that.$emit('bchange',this.bConnect);
                } 
                
                //在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
                s_pnp.Socket_UK.onmessage =function got_packet(Msg){
                    var PnpData = JSON.parse(Msg.data);
                    console.log(PnpData)
                    if(PnpData.type=="PnpEvent")//如果是插拨事件处理消息
                    {
                        if(PnpData.IsIn) 
                        {
                                alert("UKEY已被插入，被插入的锁的路径是："+PnpData.DevicePath);
                        }
                        else
                        {
                                alert("UKEY已被拨出，被拨出的锁的路径是："+PnpData.DevicePath);
                                s_pnp.Socket_UK.onclose = function(){}
                        }
                    }
                } 
                s_pnp.Socket_UK.onclose = function(){}
            }
            catch(e){  
                alert(e.name + ": " + e.message);
                return false;
            }
            console.log(this.bConnect)
        },
        toHex(n){
            var result = ''
            var start = true;
            for ( var i=32; i>0; ) {
                    i -= 4;
                    var digit = ( n >> i ) & 0xf;

                    if (!start || digit != 0) {
                            start = false;
                            result += digitArray[digit];
                    }
            }
            return ( result == '' ? '0' : result );
        },
        //获取key
        getKey(){
            //如果是IE10及以下浏览器，则使用AVCTIVEX控件的方式
            if(navigator.userAgent.indexOf("MSIE")>0 && !navigator.userAgent.indexOf("opera") > -1) return this.Handle_IE10();
            //判断是否安装了服务程序，如果没有安装提示用户安装
            if(this.bConnect == 0){
                // window.alert ( "未能连接服务程序，请确定服务程序是否安装。");
                this.$emit('loginLiti');
                return false;
            }
            var DevicePath,ret,n,mylen,Pin,ChipID;
            let that = this;
            try{
                //由于是使用事件消息的方式与服务程序进行通讯，
                //好处是不用安装插件，不分系统及版本，控件也不会被拦截，同时安装服务程序后，可以立即使用，不用重启浏览器
                //不好的地方，就是但写代码会复杂一些
                var s_simnew1=new SoftKey3W(); //创建UK类
                    
                s_simnew1.Socket_UK.onopen = function() {
                    s_simnew1.ResetOrder();//这里调用ResetOrder将计数清零，这样，消息处理处就会收到0序号的消息，通过计数及序号的方式，从而生产流程
                } 
                 //写代码时一定要注意，每调用我们的一个UKEY函数，就会生产一个计数，即增加一个序号，较好的逻辑是一个序号的消息处理中，只调用我们一个UKEY的函数
                s_simnew1.Socket_UK.onmessage =function got_packet(Msg) {
                    var UK_Data = JSON.parse(Msg.data);
                    if(UK_Data.type!="Process")return ;//如果不是流程处理消息，则跳过
                    //alert(Msg.data);
                    switch(UK_Data.order) {
                        case 0:
                            {   
                                s_simnew1.FindPort(0);//查找加密锁
                            }
                            break;//!!!!!重要提示，如果在调试中，发现代码不对，一定要注意，是不是少了break,这个少了是很常见的错误
                        case 1:
                            {
                                if( UK_Data.LastError!=0)
                                {
                                    // window.alert ( "未发现加密锁，请插入加密锁");s_simnew1.Socket_UK.close();
                                    that.$emit('loginLiti');
                                return false;} 
                                DevicePath=UK_Data.return_value;//获得返回的UK的路径
                                
                                s_simnew1.GetChipID(DevicePath);//返回芯片唯一ID
                            }
                            break;
                        case 2:
                            {
                                if( UK_Data.LastError!=0){window.alert("返回芯片唯一ID时出现错误，错误码为："+UK_Data.LastError.toString());s_simnew1.Socket_UK.close();return false;} 
                                // frmlogin.KeyID.value = UK_Data.return_value;
                                this.KeyID = UK_Data.return_value;
                                //从锁中取出用户身份，与签名后的数据一并送到服务端进行验证。以验证用户身份
                                s_simnew1.GetSm2UserName(DevicePath); 
                            }
                            break;	
                        case 3:
                            {
                                console.log(that.frmlogin.rnd)
                                if( UK_Data.LastError!=0){window.alert("返回用户身份时出现错误，错误码为："+UK_Data.LastError.toString());s_simnew1.Socket_UK.close();return false;} 
                                // frmlogin.UserName.value = UK_Data.return_value;
                                that.frmlogin.idCard = UK_Data.return_value;
                                
                                //使用默认的PIN码
                                Pin="ptnetwork"
                                //这里使用锁中的私钥对身份-用户名及消息-随机数的进行数字签名,使用默认的PIN码，返回签名后的数据
                                s_simnew1.YtSign(that.frmlogin.rnd,Pin,DevicePath);
                                console.log(s_simnew1.YtSign(that.frmlogin.rnd,Pin,DevicePath))
                            }
                            break;
                        case 4:
                            {
                                console.log(4)
                                if( UK_Data.LastError!=0){window.alert("进行签名时出现错误，错误码为："+UK_Data.LastError.toString());s_simnew1.Socket_UK.close();return false;} 
                                that.frmlogin.return_EncData=UK_Data.return_value;

                                //!!!!!注意，这里一定要主动提交，
                                // that.frmlogin.submit(); 
                                that.$emit('loginLiti',that.frmlogin);
                                //所有工作处理完成后，关掉Socket
                                s_simnew1.Socket_UK.close();
                            }
                            break;	    
                        }
                }
                console.log(this.frmlogin)
                s_simnew1.Socket_UK.onclose = function(){
                }
                return true;

            }
            catch(e){  
                alert(e.name + ": " + e.message);
                return false;
            }
        },
        Handle_IE10(){

        }
    }
}
</script>

