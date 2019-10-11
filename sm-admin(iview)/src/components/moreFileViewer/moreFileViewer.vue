<template>
    <Carousel
    :dots="setting.dots"
    :radius-dot="setting.radiusDot"
    :id="viewerId"
    v-if="fileUrls.length>0 && showBox"
    v-model="nowIndex"
    @on-change="carouselChange"
    >
        <CarouselItem v-for="(item,index) in PTFurls " :key="index">
            <div style="text-align: center;">
                <!-- <iframe
                    scrolling="auto"
                    :src="item.url"
                    class="scrollStyle"
                    frameborder="0"
                    style="height:470px"
                    width="100%"
                    height="100%"
                    :id="item.id"
                    @load = "cardFinish($event,item.id,'pdf')"
                >该浏览器暂不支持PDF浏览，您可以下载该文件进行查看:
                    <a :src="item.url" rel="external nofollow">下载PDF文件</a>
                </iframe> -->
                <!-- <pdf ref="pdf" :url="item.url" :canvasid="index.toString()"></pdf> -->
                <iframe :id='"previewPdf"+index.toString()' :src="allHost+'/static/pdf/web/viewer.html?file=' + encodeURIComponent(item.url)" @load = "cardFinish($event,item.id,'pdf')" style="height:500px;width:100%"></iframe>
                <Spin size="large" fix v-if="item.loading"></Spin>
            </div>
        </CarouselItem>
        <CarouselItem v-for="(item,index) in DOCurls" :key="index">
            <div style="text-align: center;">
                <iframe
                    scrolling="auto"
                    :src="'http://view.officeapps.live.com/op/view.aspx?src='+item.url"
                    class="scrollStyle"
                    frameborder="0"
                    style="height:470px"
                    width="100%"
                    height="100%"
                >该浏览器暂不支持文档浏览，您可以下载该文件进行查看:
                    <a :src="item.url" rel="external nofollow">下载文档文件</a>
                </iframe>
            </div>
        </CarouselItem>
        <CarouselItem v-for="(item,index) in Imgurls" :key="index">
            <div style="text-align: center;">
                <img
                    :src="item.url"
                    style="height:430px;cursor: pointer;"
                    alt="点击查看"
                    @click="imgShow(viewerId)"
                >
                <div style="margin-top: 10px;text-align: center;">
                    <Button @click="plaintiffDown(item.url)">下载到电脑</Button>
                </div>
            </div>
        </CarouselItem>
    </Carousel>
    <div v-else style="height:500px;text-align: center;">暂无数据</div>
</template>
<<script>
import "@static/viewer/viewer.css";
import Viewer from "@/libs/viewer";
import JSBase64 from 'js-base64'
// import pdf from "@/components/moreFileViewer/component/PDF.vue";
export default {
    name : 'ZhViewer',
    props : {
        fileUrls:{
            type:Array,
            default:[],
        },
        viewerId:{
            type:String,
        }
    },
    components:{
        // pdf,
    },
    data(){
        return {
            setting: {
                dots: "outside",
                radiusDot: true
            },
           nowIndex:0,//当前显示第几张
           allHost:'',//域名
           PTFurls:[],//PTF文件
           Imgurls:[],//IMG文件
           DOCurls:[],//DOC文件
           showBox: true
        }
    },
    methods: {
        imgShow(name) {
            console.log(document.getElementById(name))
            let gallery = new Viewer(document.getElementById(name), {});
            gallery.show();
        },
        init(){
            console.log(this.fileUrls)
        },
        plaintiffDown(item) {
            //必须同源才能下载
            var alink = document.createElement("a");
            alink.href = item;
            console.log("item", item);
            let type = item.split(".")[1];
            let name = item.split(".")[0];
            alink.download = name + "." + type; //图片名
            alink.click();
        },
        cardFinish(e,id,type){//判断iframe是否加载完毕
            console.log("22",e)
            switch (type) {
                case "pdf":
                    this.PTFurls.forEach((item,index) => {
                        if(item.id==id){
                            item.loading=false;
                            this.$set(item,"loading",false);
                        }
                    });
                break;
            }
            //未加载的页面，宽度可能还没计算好，需重新设置当前页相当于重新计算宽高
            setTimeout(() => {
                this.nowIndex=0;
            }, 2000);
        },
        carouselChange(oldValue, value){//轮播图切换
           //按顺序合并打印数组
           let fileAry=[...this.PTFurls,...this.DOCurls,...this.Imgurls]//顺序按照上面渲染循序来不能乱，否则找不到当前页的文件路径
           console.log("carouselChange",oldValue, value)
           console.log("fileAry",fileAry[value])
           //获取当前页文件路径
           this.$emit("setNowItem",fileAry[value].url)
        }
    },
    mounted() {
    },
    computed: {
    },
    watch: {
      fileUrls: {
        immediate: true,
        handler(val){
            //获取当前域名
            let protocolStr = window.location.protocol;
            let k_host = window.location.host;
            this.allHost = protocolStr + "//" + k_host + "/";
            if(this.PTFurls.length!=0){//只加载一次
                return
            }
            this.PTFurls=[];
            this.DOCurls=[];
            this.Imgurls=[];
            console.log(this.fileUrls)
            //筛选文件分别显示
            this.fileUrls.forEach((item,index) => {
                let fileType=item.split('.')[item.split('.').length-1];//获取文件类型
                // let url=item.indexOf('http://')>=0 || item.indexOf('https://')>=0 ? item : this.allHost+item;//过滤文件路径
                let url=item;
                switch (fileType) {
                    case 'pdf':
                        this.PTFurls.push({url:url,loading:true,id:Math.random().toString(36).substr(2)});
                    break;
                    case 'xlsx':
                    case 'docx':
                        this.DOCurls.push({url:url,loading:false,id:Math.random().toString(36).substr(2)});
                    break;
                    case 'jpg':
                    case 'png':
                    case 'jpeg':
                        this.Imgurls.push({url:url,loading:false,id:Math.random().toString(36).substr(2)});
                    break;
                }
            });
            // 显示隐藏重新计算宽高
            this.showBox = false
            setTimeout(() => {
                this.showBox = true
            }, 800);
            //先到最后一页，最后在cardFinish回到第一页，确保异步加载页面重新计算宽度
            this.nowIndex=this.fileUrls.length-1;
            console.log(this.PTFurls,this.DOCurls,this.Imgurls);
        }
      }
    }
}
</script>