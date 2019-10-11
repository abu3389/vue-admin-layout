<template>
 <div>
    <Form ref="checkForm" :model="checkForm" :rules="checkFormRule" label-position="right" :label-width="220" class="formStyle" style="width: 820px;">
      <FormItem label="身份证" class="zh_form zh-plant-chooseType" prop="idCard">
          <Input placeholder="必填" v-model="checkForm.idCard"></Input>
      </FormItem>
      <FormItem label="手机号" class="zh_form zh-plant-chooseType" prop="phone">
          <Input placeholder="必填" v-model="checkForm.phone"></Input>
      </FormItem>
      <FormItem label="获取手机验证码" class="zh-plant-chooseType" prop="imgCode" style="margin: 20px 100px 20px 20px;">
          <span class="code-wrapper" @click="changeUserCode">
            <img height="32px" style="vertical-align: middle;" :src="imgCodeSrc" alt="图片验证码">
          </span>
          <Input placeholder="请输入图片验证码" v-model="checkForm.imgCode" style="width: 150px"></Input>
          <Button type="primary" shape="circle" class="zh-getCodeBtn" @click="getPhoneCode('checkForm')">{{code_states}}</Button>
      </FormItem>
      <FormItem label="手机验证码" class="zh_form zh-plant-chooseType" prop="phoneCode">
          <Input placeholder="请输入手机验证码" v-model="checkForm.phoneCode"></Input>
      </FormItem>
      <FormItem label="新密码" class="zh_form zh-plant-chooseType" prop="newPassWord">
          <Input placeholder="重置密码" type="password" v-model="checkForm.newPassWord"></Input>
      </FormItem>
    </Form>
    <div class="textCenter zh-nextBtnDiv">
      <Button type="primary" shape="circle" class="nextBtn" @click="nextStep('checkForm')">提交</Button>
    </div>
 </div>
</template>

<script>
  import {sendPhoneCodefindPw,forgetPassword} from '@/api/user.js'
  export default {
   components: {

   },
   data () {
      return {
        checkForm:{
          idCard:"",//身份证
          phone:"",//手机号
          phoneCode:"",//手机短信验证码
          imgCode:"",//图片验证码
          newPassWord:""//新密码
        },
        code_states:"获取",//短信验证码状态
        send_open:true,//短信验证码开关
        imgCodeSrc:"/api/court/register/code.jhtml",//图片验证码地址
        checkFormRule: {
          idCard: [
            { required: true,type: "string", message: '请输入身份证号!', trigger: 'blur' },
            { type: "string", pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配!', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号!',trigger: 'blur'},
            { type: 'string',pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,message: '请正确填写手机号!', trigger: 'blur'}
          ],
          phoneCode: [
            { required: true,type: "string", message: '请输入短信验证码!', trigger: 'blur'},
          ],
          imgCode: [
            { type: "string", message: '请输入图片验证码!', trigger: 'blur'},
          ],
          newPassWord:[
            { required: true, message: '请输入密码!', trigger: 'blur' },
            { type: "string", pattern: /^[A-Za-z0-9]{6,12}$/, message: '请输入6-12位字母或数字的密码!', trigger: 'blur' }
          ],
        },
      }
   },
   methods: {
    getPhoneCode(name){//获取验证码
      //发送验证码开关
      if(this.send_open){
        //校验手机号
        this.$refs[name].validateField("phone",(erroMsg) => {
          if (erroMsg) {
            return
          }
        })
        //校验图片验证码
        this.$refs[name].validateField("imgCode",(erroMsg) => {
          if (erroMsg) {
            return
          }
        })
        //关闭验证码开关
        this.send_open=false;
        //发送验证码
        sendPhoneCodefindPw({code:this.checkForm.imgCode,phone:this.checkForm.phone,sendType:'2'}).then(res=>{
          console.log(res);
          if(res.data.state==100){
            this.$Message.success(res.data.message);
            //刷新验证码
            this.changeUserCode();
            //设置初始时间
            var time=60;
            //设置定时器
            var timmer=setInterval(()=>{
                time--;
                this.code_states=time+"秒后重新获取";
                if(time==0){
                  clearInterval(timmer);
                  this.code_states="重新获取";
                  this.send_open=true;//开启验证码开关
                }
            },1000);
          }else{
            this.$Message.error(res.data.message);
            this.send_open=true;
          }
        });
      }
    },
    nextStep(name){//提交
      this.$refs[name].validate((valid) => {
          if (valid) {
            //提交修改密码请求
            forgetPassword(this.checkForm).then((res)=>{
              console.log(res)
              if(res.data.state==100){
                this.$Message.success('重置成功！');
                this.$emit('nextStep',2)
              }else{
                this.$Message.error('手机号不一致!');
              }
            })
          } else {
            this.$Message.error(res.data.message);
          }
      })
    },
    changeUserCode(){
      this.checkForm.imgCode='';//清空图片验证码填写区域
      this.imgCodeSrc = '/api/court/register/code.jhtml?tm=' + Math.random();//刷新
    },
   },
 }
</script>