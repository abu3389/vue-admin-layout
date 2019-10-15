<style lang="less">
@import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{
            width: shrink?'0px':'200px',
            overflow: shrink ? 'visible' : 'auto',
            borderRight: shrink ? 'none' : 'auto',
            color: '#fff',
            }">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <!-- <div slot="top" class="menu-logo-con">
                        <Icon type="md-arrow-dropleft-circle" ></Icon>
                        <span> 
                          <Icon type="ios-arrow-dropright"></Icon>
                          简略菜单视图
                        </span>
                    </Button>
                </div> -->
            </shrinkable-menu>
        </div>
        <div class="main-header-con">
            <div class="main-header">
                <div class="navicon-con">
                    <div slot="top" class="logo-con">
                        <img src="../images/logoH.png" key="max-logo" />
                    </div>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb" style="line-height: 44px;float:left">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <!-- <div style="display:inline-block;line-height: 44px;float:right">
                      <Input placeholder="全局查找" style="width: 180px" class="searchD">
                          <Icon type="ios-search" slot="suffix" />
                      </Input>
                    </div> -->
                    <div style="display:inline-block;line-height: 44px;margin-right: 55px;">
                        <span class="card-user-infor-name" :style="{width: '100%',color: '#38B3FF',fontWeight: '100',fontSize: '1rem', color: 'white'}">
                          <b :style="{marginRight: '15px'}">{{nowLoginDay}}</b>
                          <b :style="{marginRight: '15px'}">{{weekStr}}</b>
                          <b :style="{}">{{nowClock}}</b>
                        </span>
                    </div>
                </div>
                <div class="header-avator-con">
                  <!-- v-model="mesCount" -->
                    
                    <div class="user-dropdown-menu-con"  style="position: absolute;right: 50px;width: 180px;">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="changePwd">修改密码</DropdownItem> -->
                                    <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <message-tip  :value="mesCount"></message-tip>
                            <Icon type="ios-contact-outline" style="font-size: 34px;margin-left: 10px;"></Icon>
                             <!-- <Icon type="ios-person-outline" ></Icon> -->
                             <!-- <Icon type="md-person"></Icon> -->
                            <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
                        </Row>
                    </div>
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"  style="position: absolute;right: 20px;"></full-screen>
                </div>
            </div>
            <div class="tags-con" :style="{paddingLeft: shrink?'0px':'200px'}">
                <tags-page-opened @toggleClick="toggleClick" :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'0px':'200px'}">
            <div class="single-page" style="height:100%">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <Modal
            v-model="PwdModel"
            title="修改密码"
            :loading="loading"
            width="450px"
            @on-ok="asyncOK('addFormItem')">
              <Form :model="addFormItem" ref="addFormItem" :rules='ruleValidate' :label-width="100" inline>
                  <FormItem label="当前登录密码:" style="width: 400px;">
                      <Input v-model="addFormItem.oldpwd" type="password" placeholder="请输入当前登录密码"></Input>
                  </FormItem>
                  <FormItem label="新密码:" style="width: 400px;" prop="newpwd1">
                      <Input v-model="addFormItem.newpwd1" type="password" placeholder="请输入新密码"  
                      :rules="{type: 'String',required:true,pattern:/[0-9A-Za-z]{6,10}/,message:'密码必须同时包含字母和数字',trigger:'change'}"></Input>
                  </FormItem>
                  <FormItem label="确认新密码:" style="width: 400px;" prop="newpwd2">
                      <Input v-model="addFormItem.newpwd2" type="password" placeholder="请输入新密码"></Input>
                  </FormItem>
              </Form>
        </Modal>
    </div>
</template>
<script>
import shrinkableMenu from "../components/main/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "../components/main/tags-page-opened.vue";
import breadcrumbNav from "../components/main/breadcrumb-nav.vue";
import fullScreen from "../components/main/fullscreen.vue";
import messageTip from "../components/main/message-tip.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import store from "@/store";
import { formatDate } from "@/libs/date";
import md5 from 'md5';
import {
    changePassword,
} from '@/api/user';
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    messageTip
  },
  data() {
    var  validatepsw = function(rule, value, callback){
      let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if(!value){
          return callback(new Error("请输入密码"));
      }else if(!reg.test(value)){
          return callback(new Error("密码必须同时包含字母和数字"))
      }else{
          callback();
      }
    };

    return {
      websock: null,
      PwdModel:false,
      loading:true,
      shrink: false,
      userName: "",
      nowLoginDay: "",
      nowClock:"",
      weekStr:"",
      newlength:10,
      isPass:false,
      addFormItem:{
        oldpwd:"",
        newpwd1:"",
        newpwd2:""
      },
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      ruleValidate:{
        newpwd1:[{validator:validatepsw,trigger:'blur' },{min:8,message:'请输入最少8位'}],
      }
    };
  },
  created() {},
  computed: {
    
    menuList() {
      console.log(this.$store.getters.roLeName)
      let menuListsARR = this.$store.state.app.menuList;
      console.log(menuListsARR)
      if(!menuListsARR){
        return [];
      }else{
        let menuLists = this.$store.state.app.menuList;      
        for(let i=0;i<menuLists.length;i++){
          if(menuLists[i].title == "我的案件" && this.$store.getters.roLeName == '代理人'){
            menuLists[i].title = '我代理的案件'
            menuLists[i].children[0].title = '我代理的案件'
          }else if(menuLists[i].title == "我代理的案件" && this.$store.getters.roLeName == '当事人'){
            menuLists[i].title = '我的案件'
            menuLists[i].children[0].title = '我的案件'
          }
        }
        return menuLists;
      }
      
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      if(this.$store.getters.new){
        return this.$store.getters.new.length;
      }else{
        return 0;
      }
      
    }
  },
  methods: {
    audio() {
      var audio = new Audio(
        "/static/3424.mp3"
      );
      audio.play();
    },
     asyncOK(name){
        this.$refs[name].validate((valid) => {
                if (!valid) {
                    this.isPass = false;
                    this.$Message.error('密码长度必须大于8且同时包含字母和数字!');     
                }else{
                  this.isPass =true;
                } 
           })
       if(!this.isPass){
         this.changeLoading ();
         return false;
       }   
      if(this.addFormItem.oldpwd == ""){
        this.$Message.info("请输入当前登录密码");
        this.changeLoading ();
        return false;
      }
      if(this.addFormItem.newpwd1 != this.addFormItem.newpwd2){
        this.$Message.info("密码不一致");
        this.changeLoading ();
        return false;
      }
      changePassword(md5(this.addFormItem.oldpwd),md5(this.addFormItem.newpwd1),md5(this.addFormItem.newpwd2)).then(res => {
        if(res.data.state == 100){
          this.$Message.success(res.data.message);
          this.$store.commit("logout", this);
          this.$store.commit("clearOpenedSubmenu");
          this.$store.dispatch("Logout").then(res => {
            this.$router.push({
              name: "login"
            });
          });
        }else{
          this.$Message.info(res.data.message);
          this.changeLoading ();
        }
      })
    },
    changeLoading () {
        this.loading = false;
        this.$nextTick(() => {
            this.loading = true;
        });
    },
    initWebSocket() {
      let path = window.location.host;
      const wsuri = "wss://" + path + "/api/sendNotice/ws.jhtml";
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
    websocketonmessage() {
      var data = JSON.parse(event.data);
      let newList = [];
      if(data['false']){
         newList = data['false']
      }
      
      let readList = [];
      if(data['true']){
        readList = data['true'];
      }
      this.$store.commit("SET_NEW", newList);
      this.$store.commit("SET_READ", readList);
      if (newList.length != 0) {
        this.$Notice.info({
          title: "你有新消息，请注意查收",
          desc: "信箱中共有" + newList.length + "条未读消息"
        });
        this.audio();
      }
      console.log(data['true'])
    },
    init() {
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
      var dataStr = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.nowLoginDay =
        dataStr.slice(0, 4) +
        "年" +
        dataStr.slice(5, 7) +
        "月" +
        dataStr.slice(8, 10) +
        "日";
        this.nowClock = 
        dataStr.slice(11, 13) +
        ":" +
        dataStr.slice(14, 16) +
        ":" +
        dataStr.slice(17, 19);
        let that = this;
        window.setInterval(function(){
          var dataStr = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
          that.nowClock = 
          dataStr.slice(11, 13) +
          ":" +
          dataStr.slice(14, 16) +
          ":" +
          dataStr.slice(17, 19);
        },1000)
        var str = "星期";  
        var week = new Date().getDay();  
        switch (week) {  
                case 0 :  
                        str += "日";  
                        break;  
                case 1 :  
                        str += "一";  
                        break;  
                case 2 :  
                        str += "二";  
                        break;  
                case 3 :  
                        str += "三";  
                        break;  
                case 4 :  
                        str += "四";  
                        break;  
                case 5 :  
                        str += "五";  
                        break;  
                case 6 :  
                        str += "六";  
                        break;  
        }
        this.weekStr = str;
    },
    toggleClick() {
      this.shrink = !this.shrink;
      this.$store.commit("SET_ISDRAW", this.shrink);
      
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        this.$store.dispatch("Logout").then(res => {
          this.$router.push({
            name: "login_index"
          });
        });
      }else if(name == "changePwd"){
        console.log(this.$store.state.app.menuList)
        // return false;
        this.addFormItem.oldpwd ="";
        this.addFormItem.newpwd1 ="";
        this.addFormItem.newpwd2 = "";
        this.PwdModel = true;
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    }
  },
  watch: {
    $route(to) {
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      // 在切换语言时
    }
  },
  mounted() {
    this.init();
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
    this.initWebSocket();
  }
};
</script>