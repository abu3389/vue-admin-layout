<template>
    <div style="style" class="buttonDiv">
        <Button
        type="ghost"
        icon="ios-cloud-upload-outline"
        @click="zh_uploadFile"
        >选择文件</Button>
        <input type="file" ref='refid' @change="zh_uploadFile_change" style="display:none">
        <!-- input才可以上传，button只是触发 -->
    </div>
</template>

<style lang="less">
    .buttonDiv{
        display: inline-block;
    }
</style>

<script>
    import * as qiniu from 'qiniu-js'
    import {getQiniuToken} from "@/api/setcase.js";

    export default {
        name : 'ZhUpload',
        props : {
            styles: Object,//样式
            refid:{//绑定的id
                type : String,
                default : ''
            },
            uploadType:{//上传类型 0：要素表    1：个人身份文件上传   2：证据文件上传
                type : String,
                default : ''
            }
        },
        data(){
            return {
              totalSize:0,//总量
              loaded:0,//已上传文件大小
              totalTime:0,//总用时/s
              speed:0,//当前速度
              lestTime:0,//剩余时间
              timmer:''//定时器
            }
        },
        methods: {

            //选择上传文件
            zh_uploadFile(){
               this.$refs.refid.click();
            },

            //选择文件后触发的事件
            zh_uploadFile_change(evfile){
                console.log(evfile);
                const that=this;
                //后端获取七牛token
                getQiniuToken({uploadType:this.uploadType}).then(res=>{
                    const uptoken = res.data.data.uptoken;
                    const file = evfile.target.files[0] //Blob 对象，上传的文件
                    this.totalSize=file.size;
                    const key = this.getuuid()+'-'+file.name // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
                    let config = {
                    useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: qiniu.region.z2,     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
                    concurrentRequestLimit: 7, //分片上传的并发请求量，number，默认为3
                    };

                    let putExtra = {
                    fname: "",  //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                    };
                    this.observable = qiniu.upload(file, key, uptoken, putExtra, config);
                    //定时器用来统计上传时间
                    this.timmer=setInterval(() => {
                        //计时
                        that.totalTime+=1;
                        //每秒统计一次速度（已上传大小/总耗时）
                        that.speed=that.loaded/that.totalTime;
                        //计算剩余时间（总大小-已上传大小）/当前速度
                        that.lestTime=(that.totalSize-that.loaded)/that.speed;
                    }, 1000);
                    this.subscription=this.observable.subscribe({
                        next: (result) => {
                            that.loaded=result.total.loaded;
                            that.$emit('next',result,parseInt(this.lestTime));
                        },
                        error: (errResult) => {
                            that.$emit('error',errResult);
                        },
                        complete: (result) => {
                            window.clearInterval(this.timmer);//清除计时
                            that.$emit('complete',result);
                        }
                    })
                    //清除文本值方便下次触发change
                    this.$refs.refid.value = null;
                })
            },
            cancelUpload(){//取消上传
                window.clearInterval(this.timmer);//清除计时
                this.subscription.unsubscribe() // 上传取消
            },
            getuuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";
            
                var uuid = s.join("");
                return uuid;
            }
        }
    }
</script>