<template>
  <div class="ownInfo">
    <div class="bookbuilding-table">
      <Row>
        <Col span="24" class="noemalTb th-header">修改密码</Col>
      </Row>
      <Card>
        <div class="zh-plant-div1">
          <div class="zh-plant-div2">
            <Form ref='pwdList' :model="pwdList" :rules="pwdListRule" label-position="right" :label-width="180" style="margin:0 auto" >
              <FormItem label="旧密码" class="zh_form zh-plant-chooseType" prop="old_pwd">
                <Input placeholder="必填" v-model="pwdList.old_pwd" type="password"></Input>
              </FormItem>
              <FormItem label="新密码" class="zh_form zh-plant-chooseType" prop="new_pwd">
                <Input placeholder="必填" v-model="pwdList.new_pwd" type="password"></Input>
              </FormItem>
              <FormItem label="新密码校验" class="zh_form zh-plant-chooseType" prop="pwd_check">
                <Input placeholder="必填" v-model="pwdList.pwd_check" type="password"></Input>
              </FormItem>
            </Form>
            <div class="textCenter editBtnDiv">
              <Button type="primary" shape="circle" class="editBtn" @click="sureChangePwd('pwdList')">确认修改</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div class="bookbuilding-table">
      <Row>
        <Col span="24" class="noemalTb th-header">手机绑定修改</Col>
      </Row>
      <Card>
        <div class="zh-plant-div1">
          <div class="zh-plant-div2">
            <Form ref='phoneList' :model="phoneList" :rules="phoneListRule" label-position="right" :label-width="180" style="margin:0 auto" >
              <FormItem label="旧手机号" class="zh_form zh-plant-chooseType" prop="old_phone">
                <Input placeholder="必填" v-model="phoneList.old_phone"></Input>
              </FormItem>
              <FormItem label="账号密码" class="zh_form zh-plant-chooseType" prop="user_pwd">
                <Input placeholder="必填" v-model="phoneList.user_pwd" type="password"></Input>
              </FormItem>
              <FormItem label="新手机号" class="zh_form zh-plant-chooseType" prop="new_phone">
                <Input placeholder="必填" v-model="phoneList.new_phone"></Input>
              </FormItem>
              <FormItem label="新手机号短信验证码" class="zh_form zh-plant-chooseType" prop="phone_check">
                <Input placeholder="必填" v-model="phoneList.phone_check" class="getCodeInput"></Input>
                <Button type="primary" shape="circle" class="zh-getCodeBtn" @click="getPhoneCode('phoneList')">{{code_states}}</Button>
              </FormItem>
            </Form>
            <div class="textCenter editBtnDiv">
              <Button type="primary" shape="circle" class="editBtn" @click="sureChangePhone('phoneList')">确认修改</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import "./accountInfo.css";
import  accountInfo from "./accountInfo.js";
import {changePwd,changePhone,sendPhoneCode} from '@/api/ownSpace.js'
import md5 from 'md5';//MD5加密
export default {
  name:"accuntInfo",
  components: {},
  data() {
    //二次密码确认验证方法
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码!'));
        } else if (value !== this.pwdList.new_pwd) {
            callback(new Error('两次密码输入不一致!'));
        } else {
            callback();
        }
    };
    return {
      pwdList:accountInfo.pwdList,//密码表单
      phoneList:accountInfo.phoneList,//手机表单
      code_states:"获取",
      send_open:true,//验证码开关
      //账户密码表单规则
      pwdListRule:{
        old_pwd: [{
            required: true,
            message: '请输入旧密码!',
            trigger: 'blur',
        }],
        new_pwd: [{
            required: true,
            message: '请输入新密码!',
            trigger: 'blur'
        }],
        pwd_check: [{
            required: true,
            validator: validatePassCheck,
            trigger: 'blur'
        }],
      },
      //手机表单规则
      phoneListRule:{
        old_phone: [
          {
            required: true,
            message: '请输入旧手机号码!',
            trigger: 'blur',
          },
          {
            type: 'string',
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '请正确填写手机号!',
            trigger: 'blur'
          }
        ],
        user_pwd: [{
            required: true,
            message: '请输入账号密码!',
            trigger: 'blur'
        }],
        new_phone: [
          {
            required: true,
            message: '请输入新手机号码!',
            trigger: 'blur',
          },
          {
            type: 'string',
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '请正确填写手机号!',
            trigger: 'blur'
          }
        ],
        phone_check: [
          {
            required: true,
            message: '请输入短信验证码!',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods:{
      sureChangePwd(name){//修改密码
        //校验密码
        this.$refs[name].validate((valid) => {
            // console.log(valid);
            if (valid) {
              var data={
                oldpassword:md5(this.pwdList.old_pwd),
                newpassword1:md5(this.pwdList.new_pwd),
                newpassword2:md5(this.pwdList.pwd_check),
              }
              changePwd(data).then(res=>{
                  console.log(res);
                  if(res.data.state==100){
                    this.$Message.success('修改成功！');
                    this.$router.push("/send/login");
                  }else{
                    this.$Message.error(res.data.message);
                  }
              });
            } else {
              this.$Message.error('请检查是否填写正确！');
            }
        })
      },
      sureChangePhone(name){//修改手机号
         this.$refs[name].validate((valid) => {
            // console.log(valid);
            if (valid) {
              var data={
                oldPhone:this.phoneList.old_phone,
                newPhone:this.phoneList.new_phone,
                password:md5(this.phoneList.user_pwd),
                phoneCode:this.phoneList.phone_check,
              }
              changePhone(data).then(res=>{
                  console.log(res);
                  if(res.data.state==100){
                    this.$Message.success('修改成功！');

                  }else{
                    this.$Message.error(res.data.message);
                  }
              });
            } else {
              this.$Message.error('请检查是否填写正确！');
            }
        })
      },
      getPhoneCode(name){//获取验证码
           let that=this;
           //发送验证码开关
           if(that.send_open){
                //校验手机号
                that.$refs[name].validateField("new_phone",(erroMsg) => {
                    if (erroMsg) {
                        this.$Message.error('手机号校验不通过!');
                    } else {
                        //关闭验证码开关
                        that.send_open=false;
                        //发送验证码
                        sendPhoneCode({phone:that.phoneList.new_phone,sendType:1}).then(res=>{
                            console.log(res);
                            if(res.data.state==100){
                                this.$Message.success(res.data.message);
                                //设置初始时间
                                var time=60;
                                //设置定时器
                                var timmer=setInterval(function(){
                                    time--;
                                    that.code_states=time+"秒后重新获取";
                                    if(time==0){
                                        clearInterval(timmer);
                                        that.code_states="重新获取";
                                        that.send_open=true;//开启验证码开关
                                    }
                                },1000);
                            }else{
                                this.$Message.error(res.data.message);
                            }
                        });
                    }
                })
           }
        },

  },
  mounted() {
  },
};
</script>

<style>
</style>

