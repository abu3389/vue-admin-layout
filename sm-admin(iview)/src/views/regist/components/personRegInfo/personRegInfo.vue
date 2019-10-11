<template>
 <div>
    <div class="zh-plant-div1" v-show="personStep==2">
        <div class="zh-plant-div2">
            <Form ref="personList" :model="personList" :rules="personListRule" label-position="right" :label-width="220" class="formStyle" >
                <!-- 用来防止浏览器自动填充表单 -->
                <input type="password" style="width: 0;position: absolute;border:none"/>
                <input type="text" style="width: 0;position: absolute;border:none"/>
                <!-- 用来防止浏览器自动填充表单 -->
                <!-- <FormItem label="身份类型" class="zh_form zh-plant-chooseType">
                  <div class="reg_groupSelect">
                    <div>
                      <span v-for="(item,index) in typeTabList" :key='index' :class="{'reg_chooseFocus':personList.roleType==item.value}" @click="typeChangeTab(item.value,personList,'roleType')">{{item.name}}</span>
                    </div>
                  </div>
                </FormItem> -->
                <!-- 若开启扫码此部分可注释 -->
                <FormItem label="姓名" class="zh_form zh-plant-chooseType" prop="reg_name">
                    <Input placeholder="请输入与您二代居民身份证登记相符的姓名" v-model="personList.reg_name"></Input>
                </FormItem>
                <!-- 若开启扫码此部分可注释 -->

                <FormItem label="设置账号密码" class="zh_form zh-plant-chooseType" prop="reg_pwd">
                    <Input placeholder="请设置您的账号密码，6-12位；请注意大小写锁定键是否开启" v-model="personList.reg_pwd" type="password"></Input>
                </FormItem>
                <FormItem label="再次输入密码" class="zh_form zh-plant-chooseType" prop="pwd_check">
                    <Input placeholder="再次输入密码以校验" v-model="personList.pwd_check" type="password"></Input>
                </FormItem>

                <!-- 若开启扫码此部分可注释 -->
                <FormItem label="公民身份证号" class="zh_form zh-plant-chooseType" prop="reg_idcard">
                    <Input placeholder="请输入您的公民身份证号（末尾X不区分大小写）" v-model="personList.reg_idcard" @on-change="plant_autoFillId(personList,'reg_idcard','reg_sex','reg_birthday')"></Input>
                </FormItem>
                <FormItem label="出生日期" class="zh_form zh-plant-chooseType" prop="reg_birthday">
                    <DatePicker type="date" placeholder="必填" v-model="personList.reg_birthday"></DatePicker>
                </FormItem>
                <FormItem label="性别" class="zh_form zh-plant-chooseType" prop="reg_sex">
                    <Select v-model="personList.reg_sex" placeholder="必填">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="民族" class="zh_form zh-plant-chooseType" prop="reg_nation">
                    <Select
                      v-model="personList.reg_nation"
                      placeholder="请选择民族"
                      clearable
                      filterable
                    >
                      <Option
                        v-for="(item,index) in nationAry"
                        :value="item.name"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="户籍地址" class="zh_form zh-plant-chooseType" prop="reg_registerAddr">
                    <Input placeholder="必填" v-model="personList.reg_registerAddr"></Input>
                </FormItem>
                <!-- 若开启扫码此部分可注释 -->

                <FormItem label="经常居住地址" class="zh_form zh-plant-chooseType" prop="reg_normalAddr">
                    <Input placeholder="必填" v-model="personList.reg_normalAddr"></Input>
                </FormItem>
                <FormItem label="送达地址" class="zh_form zh-plant-chooseType" prop="reg_sendAddr">
                    <Input placeholder="必填" v-model="personList.reg_sendAddr"></Input>
                </FormItem>
                <FormItem label="电子邮箱" class="zh_form zh-plant-chooseType" prop="reg_email">
                    <Input placeholder="必填" v-model="personList.reg_email"></Input>
                </FormItem>
                <FormItem label="工作单位" class="zh_form zh-plant-chooseType" prop="reg_workCompany">
                    <Input placeholder="选填" v-model="personList.reg_workCompany"></Input>
                </FormItem>
                <FormItem label="单位地址" class="zh_form zh-plant-chooseType" prop="reg_companyAddr">
                    <Input placeholder="选填" v-model="personList.reg_companyAddr"></Input>
                </FormItem>
                <FormItem label="手机号" class="zh_form zh-plant-chooseType" prop="reg_phone">
                    <Input placeholder="必填" v-model="personList.reg_phone"></Input>
                </FormItem>
                <FormItem label="手机验证码" class="zh_form zh-plant-chooseType" prop="phone_code">
                    <Input placeholder="必填" v-model="personList.phone_code"></Input>
                    <Button type="primary" shape="circle" class="zh-getCodeBtn" @click="getPhoneCode('personList')">{{code_states}}</Button>
                </FormItem>
            </Form>
            <div class="textCenter"><a style="color:darkblue">厦门市思明区人民法院《金融和互联网法庭网上诉讼管理办法》</a></div>
            <div class="textCenter">
                <Radio v-model="isAgreet" @click.native="agreetClick" class="agreetDiv"><div class="radioText">我已详细阅读和知悉《注册须知》，接受并遵守厦门市思明区人民法院《金融和互联网法庭网上诉讼管理方法》的规定，依法进行诉讼活动。</div></Radio>
            </div>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep('personList')">下一步</Button>
            </div>
        </div>
    </div>
    <!-- <div class="zh-plant-div" v-show="personStep==2 && isFace">
        <div style="padding: 130px 0px;height: 100%;">
            <Icon type="checkmark-circled" size="80" style="color: #2F60BD"></Icon>
            <p style="padding:50px">您的身份通过验证！</p>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep">下一步</Button>
            </div>
        </div>
    </div> -->
    <div class="zh-plant-div" v-show="personStep==3">
        <div style="padding: 130px 0px;height: 100%;">
            <Icon type="checkmark-circled" size="80" style="color: #22B573"></Icon>
            <p style="padding:50px">注册成功！</p>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep">回到首页</Button>
            </div>
        </div>
    </div>
 </div>
</template>

<style lang='css' scoped>
  @import "./personRegInfo.css";
</style>

<script>
import { personRegist,
   sendPhoneCode,
 } from '@/api/user.js' //提交企业注册
import {
  tools_calcIdentiyInfo
} from "@/libs/tools.js";
import nation from "@/api/nations.js";

import md5 from 'md5';//MD5加密

 export default {
   components: {

   },
   props:{
        personStep:{
            type:Number,
            required:true
        }
   },
   data () {
    //二次密码确认验证方法
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码!'));
        } else if (value !== this.personList.reg_pwd) {
            callback(new Error('两次密码输入不一致!'));
        } else {
            callback();
        }
    };
     return {
        isAgreet:false,
        isFace:false,
        isStep2Show:true,
        code_states:"获取",
        send_open:true,//验证码开关
        typeTabList:[{name:"当事人",value:"1"},{name:"代理人",value:"2"}],
        nationAry:nation,//民族列表
        personList:{
            roleType:"1",//角色类型
            reg_name:"",//姓名
            reg_idcard:"",//身份证
            reg_pwd:"",//密码
            pwd_check:"",//确认密码
            reg_birthday:"",//出生日期
            reg_sex:"",//性别
            reg_nation:"",//民族
            reg_registerAddr:"",//户籍地址
            reg_normalAddr:"",//常居住地
            reg_sendAddr:"",//送达地址
            reg_email:"",//电子邮箱
            reg_workCompany:"",//工作单位
            reg_companyAddr:"",//单位地址
            reg_phone:"",//手机号
            phone_code:"",//手机验证码
        },
        //自然人注册表单规则
        personListRule:{
            reg_name: [
                { required: true, message: '请输入姓名!',trigger: 'blur'},
                { type: "string", pattern: /[\u4e00-\u9fa5]+/, message: '请输入正确姓名!', trigger: 'blur' }
            ],
            reg_idcard: [
                { required: true,type: "string", message: '请输入身份证号!', trigger: 'blur' },
                { type: "string", pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配!', trigger: 'blur' }
            ],
            reg_pwd:[
                { required: true, message: '请输入密码!', trigger: 'blur' },
                { type: "string", pattern: /^[A-Za-z0-9]{6,12}$/, message: '请输入6-12位字母或数字的密码!', trigger: 'blur' }
            ],
            pwd_check: [
                { required: true, validator: validatePassCheck, trigger: 'blur'}
            ],
            reg_birthday:[
                { required: true, type: 'date', message: '请设置日期', trigger: 'change' },
            ],
            reg_sex:[
                { required: true, message: '请设置性别!', trigger: 'blur' },
            ],
            reg_nation:[
                { required: true, message: '请输入民族!',trigger: 'blur'},
                { type: "string", pattern: /[\u4e00-\u9fa5]+/, message: '输入不合法!', trigger: 'blur' }
            ],
            reg_registerAddr:[
                { required: true, message: '请输入户籍地址!',trigger: 'blur'},
            ],
            reg_normalAddr:[
                { required: true, message: '请输入经常居住地址!',trigger: 'blur'},
            ],
            reg_sendAddr:[
                { required: true, message: '请输入送达地址!',trigger: 'blur'},
            ],
            reg_email:[
                { required: true, message: '请输入电子邮箱!',trigger: 'blur'},
                { type: 'string',pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '请正确填写邮箱!', trigger: 'blur'}
            ],
            reg_workCompany:[
                { message: '请输入工作单位!',trigger: 'blur'},
            ],
            reg_companyAddr:[
                { message: '请输入单位地址!',trigger: 'blur'},
            ],
            reg_phone:[
                { required: true, message: '请输入手机号!',trigger: 'blur'},
                { type: 'string',pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,message: '请正确填写手机号!', trigger: 'blur'}
            ],
            phone_code: [
                { required: true,type: "string", message: '请输入验证码!', trigger: 'blur'},
            ],
        },

     }
   },
   methods:{
        agreetClick(){//点击同意条款
            event.preventDefault();//阻止事件冒泡
            if(this.isAgreet==''){
                this.isAgreet=true;
            }else{
                this.isAgreet=false;
            }
        },
        nextStep(name){//下一步点击事件
            //切换步骤状态
            var num=this.personStep+1;
            if(num<=3){
                //检查当前步骤执行对应事件
                console.log(this.personStep);
                switch(this.personStep){
                    case 1://步骤1，扫码认证
                       this.stepEvent1();
                    break
                    case 2://步骤2，完善信息提交
                       this.stepEvent2(name,num);                                          
                    break
                }
            }else if(num==4){
                this.$router.push('/courtfinance/login');
                //重置步骤
                this.$emit('nextStep',2);
            }
        },
        getPhoneCode(name){//获取验证码
           let that=this;
           //发送验证码开关
           if(that.send_open){
                //校验手机号
                that.$refs[name].validateField("reg_phone",(erroMsg) => {
                    if (erroMsg) {
                        this.$Message.error('手机号校验不通过!');
                    } else {
                        //关闭验证码开关
                        that.send_open=false;
                        //发送验证码
                        sendPhoneCode({phone:that.personList.reg_phone,sendType:0}).then(res=>{
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
        stepEvent1(){//步骤1，扫码认证

        },
        stepEvent2(name,num){//步骤2,提交完善注册信息
            this.$refs[name].validate((valid) => {
                // console.log(valid);
                if (valid) {
                    //判断操作者身份
                    let that = this.personList;
                    var data={
                        pass1:md5(that.reg_pwd),
                        pass2:md5(that.pwd_check),
                        // roleType:that.roleType,
                        address:that.reg_registerAddr,
                        offtenAddress:that.reg_normalAddr,
                        sendAddress:that.reg_sendAddr,
                        companyName:that.reg_workCompany,
                        workAddress:that.reg_companyAddr,
                        userName:that.reg_name,
                        phone:that.reg_phone,
                        phoneCode:that.phone_code,
                        birthday:that.reg_birthday,
                        sex:that.reg_sex,
                        nation:that.reg_nation,
                        idCard:that.reg_idcard,
                        email:that.reg_email,
                    }
                    console.log(data)
                    if(this.isAgreet==true){
                        //这里写注册信息提交请求
                        personRegist(data).then(res=>{
                            // console.log(res);
                            if(res.data.state==100){
                                this.$Message.success(res.data.message);
                                //进入下一步
                                this.$emit('nextStep',num);
                            }else{
                                this.$Message.error(res.data.message);
                            }
                        });
                    }else{
                        this.$Message.error('请先同意注册须知!');
                    }
                } else {
                    this.$Message.error('请检查是否填写正确！');
                }
            })
        },
        // 计算出生年月和日期
        plant_autoFillId(data,idcard,sex,birthday) {
            console.log(data)
            let obj = tools_calcIdentiyInfo(data[idcard]);
            data[sex] = obj.sex;
            data[birthday] = obj.birth;
        },
        typeChangeTab(value,that,key){//类型选项卡切换
            // console.log("点击值"+value,"当前值",that)
            that[key]=value;
        },
   },
 }
</script>

<style>

 
</style>
