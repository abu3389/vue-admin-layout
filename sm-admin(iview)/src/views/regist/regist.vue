<template>
  <div class="registDiv">
    <div class="regist">
      <!-- <div class="stepDiv" :class="{'nopacity':myStep>=1}">
        <div class="stepDiv_msg">身份认证</div>
        <div>
          <span class="stepDiv_span span_color1"></span>
        </div>
        <div>
          <span class="stepDiv_span span_color2"></span>
        </div>
        <div>
          <span class="stepDiv_span span_color3"></span>
        </div>
      </div> -->
      <div class="stepDiv" :class="{'nopacity':myStep>=2}">
        <div class="stepDiv_msg">信息完善</div>
        <div>
          <span class="stepDiv_span span_color1"></span>
        </div>
        <div>
          <span class="stepDiv_span span_color2"></span>
        </div>
        <div>
          <span class="stepDiv_span span_color3"></span>
        </div>
      </div>
      <div class="stepDiv" :class="{'nopacity':myStep>=3}">
        <div class="stepDiv_msg">完成注册</div>
      </div>
    </div>
    <div class="reg_content">
      <Card class="reg_card">
        <div class="zh-plant-div" v-show="myStep==1">
            <div class="reg_choose">
                <div>
                    <span v-for="(item,index) in tabList1" :key='index' :class="{'reg_chooseFocus':clicked1==index}" @click="changeTab1(index)">{{item}}</span>
                </div>
            </div>
            <div class="choose_content">
              <div v-show="clicked1==0">
                <!-- 注册人基础信息手机扫描辅助注册方式 -->
                <div>
                  <div class="code_msg">
                    <span>请使用您的微信扫描下方二维码<br/>完成您的账号使用主体身份认证</span>
                  </div>
                  <div class="code_img">
                      <img :src="mainCodeImg" >
                  </div>
                  <div class="textCenter zh-nextBtnDiv">
                      <Button type="primary" shape="circle" class="zh-nextBtn">请等待微信端身份验证结果回传</Button>
                  </div>
                </div>
              </div>
              <div v-show="clicked1==1">
                <!-- 注册人基础信息网页注册方式 -->
                <baseRegInfo @next="nextStep"></baseRegInfo>
              </div>
            </div>
        </div>
        <div class="reg_choose" v-if="myStep==2">
           <div>
             <span v-for="(item,index) in tabList" :key='index' :class="{'reg_chooseFocus':clicked==index}" @click="changeTab(index)">{{item}}</span>
           </div>
        </div>
        <div class="choose_content">
           <div v-if="clicked==0">
              <personRegInfo :personStep="myStep" v-on:nextStep="nextStep"></personRegInfo>
           </div>
           <div v-if="clicked==1">
              <groupRegInfo :groupStep="myStep" v-on:nextStep="nextStep"></groupRegInfo>
           </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style lang='css' scoped src="./regist.css">
</style>

<script>
//二维码
import { get2CodeImg, getScanRes,} from '@/api/user.js'
//注册人身份基础信息
import baseRegInfo from "./components/baseRegInfo/baseRegInfo.vue";
//自然人注册
import personRegInfo from "./components/personRegInfo/personRegInfo.vue";
//企业注册
import groupRegInfo from "./components/groupRegInfo/groupRegInfo.vue";

export default {
  components: {
    baseRegInfo,
    personRegInfo,
    groupRegInfo
  },
  data() {
    return {
      tabList:["自然人注册","单位组织注册"],
      tabList1:["手机端身份认证","网页端身份认证"],
      // tabList1:["网页端身份认证"],
      regType:'phone',//phone 手机注册、web 网页注册
      clicked:0,
      clicked1:0,
      mainCodeImg:"",//二维码
      registerNo:"",//随机数
      myStep:2,
    };
  },
  methods:{
    changeTab(index){//注册类型选项卡切换
      this.clicked=index;
      this.myStep=2;
    },
    changeTab1(index){//验证方式选项卡切换
      this.clicked1=index;
    },
    nextStep(val){//下一步切换
      this.myStep=val;
    },
    finishScan(){//获取扫描结果
        getScanRes({registerNo:this.registerNo}).then(res=>{
            console.log(res);
            if(res.data.state==100){
                this.$Message.success("校验成功!");
                //进入下一步
                this.nextStep(2);
            }else{
                this.$Message.error(res.data.message);
            }
        });
    },
    initWebSocket() {//webSocket初始化
      let path = window.location.host;
      if(process.env.NODE_ENV === 'development') {
        path =  'courtfinancedev.ptnetwork001.com';
      } else {
        path = window.location.host;
      }
      const wsuri = 'wss://' + path + "/api/scanJump/ws.jhtml";
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = function(event) {
        console.log("WebSocket:已连接");
        console.log(event);
      };
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = function(event) {
        console.log("WebSocket:发生错误 ");
        console.log(event);
      };
      this.websock.onclose = function(event) {
        console.log("WebSocket:已关闭");
        console.log(event);
      };
    },

    websocketonmessage() {//webSocket接收消息
      var data = JSON.parse(event.data);
      console.log(data)
      if(data.allow=='true'){
         this.finishScan()//获取扫描结果
      }
    },
  },
  mounted() {
    //获取二维码
    get2CodeImg().then(res=>{
        this.mainCodeImg = `${window.location.protocol}//${window.location.host}${res.data.data.url}`;
        this.registerNo=res.data.data.registerNo;
        //初始化WebSocket
        this.initWebSocket();
    })
  },
};
</script>

