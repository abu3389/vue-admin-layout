<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="loginEnter">
        <div class="login-con">
          <Card :bordered="false" style="background: rgba(255,255,255,.6);box-shadow: 0 1px 6px rgba(0,0,0,.2);">
                <!-- 选择登陆角色 -->
                <div class="tabs">
                    <h3 class="litigant-tab">
                        <a class="log-in" :class="userType == 'judge' ? 'active' : ''" @click="userType = 'judge'">
                        <span>司法工作人员</span>
                        </a>
                    </h3>
                    <h3 class="judge-tab">
                        <a class="sign-up" :class="userType == 'admin' ? 'active' : ''" @click="userType = 'admin'">
                        <span>系统管理员</span>
                        </a>
                    </h3>
                </div>
                <div class="form-con">
                    <!-- 司法工作人员登陆 -->
                    <Form ref="loginForm" :model="userInfo1" :rules="rules" v-show="userType == 'judge'">
                        <FormItem prop="idCard">
                            <Input v-model="userInfo1.idCard" placeholder="请输入用户名" @click.native="changeCode">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                                <Input type="password"  v-model="userInfo1.password" placeholder="请输入密码">
                                    <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Input v-model="userInfo1.code"  placeholder="请输入验证码" style="width:245px;" />
                                <span class="code-wrapper" @click="changeCode">
                                    <img height="32px" style="vertical-align: middle;" :src="userCodeSrc" alt="验证码">
                                </span>
                            </FormItem>
                        <FormItem>
                            <Button @click="phoneSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!-- 系统管理员登陆 -->
                    <Form ref="loginForm2" :model="userInfo" :rules="rules" v-show="userType == 'admin'">
                        <FormItem prop="userName">
                            <Input v-model="userInfo.userName" placeholder="请输入用户名" @click.native="changeCode">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="userInfo.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input v-model="userInfo.authCode"  placeholder="请输入验证码" style="width:245px;" />
                            <span class="code-wrapper" @click="changeCode">
                                <img height="32px" style="vertical-align: middle;" :src="userCodeSrc" alt="验证码">
                            </span>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">
                        没有账号？<a href="javascript:;" @click="gotoResiter" style="margin-right:20px">立即注册</a>
                        忘记密码？<a href="javascript:;" @click="forgetPass">找回密码</a>
                    </p>
                </div>
            </Card>
        </div>
        <!-- 首页轮播图 -->
        <div class="swiper-pic">
            <Carousel autoplay v-model="value2" loop>
                <CarouselItem>
                    <img src="../../images/banner2.png" alt="banner" width="100%">
                </CarouselItem>
                <CarouselItem>
                    <img src="../../images/banner3.png" alt="banner" width="100%">
                </CarouselItem>
                <CarouselItem>
                    <img src="../../images/banner1.png" alt="banner" width="100%">
                </CarouselItem>
            </Carousel>
        </div>
        <!-- 修改密码模态框 -->
        <Modal
            v-model="PwdModel"
            title="修改密码"
            :loading="loading"
            width="450px"
            @on-ok="asyncOK('addFormItem')">
            <h3 style="text-align:center;margin-bottom:10px">当前登陆密码为初始密码，请修改后再登录</h3>
              <Form :model="addFormItem" ref="addFormItem" :rules='ruleValidate' :label-width="100" inline>
                  <FormItem label="当前登录密码:" style="width: 400px;">
                      <Input v-model="addFormItem.oldpwd" type="password" placeholder="请输入当前登录密码"></Input>
                  </FormItem>
                  <FormItem label="新密码:" style="width: 400px;" prop="newpwd1">
                      <Input v-model="addFormItem.newpwd1" type="password" placeholder="请输入新密码"></Input>
                  </FormItem>
                  <FormItem label="确认新密码:" style="width: 400px;" prop="newpwd2">
                      <Input v-model="addFormItem.newpwd2" type="password" placeholder="请输入新密码"></Input>
                  </FormItem>
              </Form>
        </Modal>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import store from '@/store';
import util from "@/libs/util.js";
import {optionRole,changePassword,login} from '@/api/user.js';
import md5 from 'md5';
var path = window.location.host;
export default {
    components:{
    },
    data () {
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
            userCodeSrc: '/api/court/login/code.jhtml',
            PwdModel:false,
            loading:true,
            //司法工作人员登陆数据
            userInfo1: {
                idCard: '',
                password: '',
                code: ''
            },
            //管理员登陆数据
            userInfo: {
                userName: '',
                password: '',
                authCode: '',
                loginType:"court",
            },
            //用户密码修改数据
            addFormItem:{
                oldpwd:"",
                newpwd1:"",
                newpwd2:""
            },
            loginId:'',
            value2:0,
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                idCard: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            },
            ruleValidate:{
                newpwd1:[{validator:validatepsw, trigger:'blur' },{min:8,message:'请输入最少8位'}],  
            },
            getCodeText: '获取验证码',
            canGetCode: true,
            userType: 'judge'
        };
    },
    created () {
    },
    methods: {
        loginEnter(){
            //如果是司法工作人员登陆
            if(this.userType == 'judge'){
                this.phoneSubmit();
            }else{//管理员登陆
                this.handleSubmit();
            }
        },
        // 管理员登陆
        handleSubmit () {
            this.$refs.loginForm2.validate(valid => {
                if (valid) {
                    store.dispatch('Login', this.userInfo).then(res => {
                        this.handelLogin(res)//处理登陆数据
                    })
                }
            });
        },
        // 司法工作人员登陆
        phoneSubmit () {   
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    login(this.userInfo1.idCard, md5(this.userInfo1.password), this.userInfo1.code,'court').then(res => {
                        this.handelLogin(res)//处理登陆数据
                    });
                }
            });
        },
        handelLogin(res){//处理登陆返回数据的逻辑
            let ele = res.data.data;
            if (res.data.state == 100) {
                //判断是否为初始密码，
                if(res.data.isOriginalPass){
                    this.PwdModel = true;//弹框强制修改密码才可登录
                }else{//不是初始密码的情况
                    if(ele.roles){//登陆后有角色信息的情况
                        if(ele.roles.length == 1){
                            //根据角色信息获取对应的权限
                            optionRole(ele.roles[0].roleType,"").then(resp => {
                                if(res.data.state == 100){
                                    Cookies.set("user", this.userInfo1.idCard);
                                    localStorage.setItem('roleIdToken',ele.roles[0].roleType);
                                    // 加载菜单
                                    util.initRouter(this);
                                    // 跳转我的案件
                                    this.$router.push({
                                        name: 'home_index'
                                    });
                                }else{
                                    this.$Message.info(res.data.message)
                                }
                            })
                        }
                    }else{//登陆后没有角色信息的情况
                        that.$Message.error("暂无权限,登录失败");
                    }
                }
            }else {
                this.$Message.error(res.data.message);//显示错误信息
                this.userCodeSrc = "/api/court/login/code.jhtml?tm=" + Math.random();//刷新验证码
            }
        },
        //修改密码的校验
        asyncOK(name){
            //表单校验
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
            //校验成功发送修改密码请求
            changePassword(md5(this.addFormItem.oldpwd),md5(this.addFormItem.newpwd1),md5(this.addFormItem.newpwd2)).then(res => {
                var that = this;
                if(res.data.state == 100){
                    this.PwdModel=false
                    this.$Message.success(res.data.message); 
                    this.changeLoading ();
                    this.$router.push({
                        name: "login"
                    });
                    this.changeLoading ();
                }else{
                    this.$Message.info(res.data.message);
                    this.changeLoading ();
                }
            })
        },
        //改变加载状态
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        changeCode () {//验证码改变
            this.userCodeSrc = '/api/court/login/code.jhtml?tm=' + Math.random();
        },
        gotoResiter(){//注册
            this.$router.push({
                name: 'regist_index'
            });
        },
        forgetPass(){//找回密码
            this.$router.push({
                name: 'forgetPass_index'
            });
        },
    }
};
</script>

<style>

</style>
