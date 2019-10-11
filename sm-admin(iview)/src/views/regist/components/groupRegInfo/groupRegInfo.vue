<template>
 <div>
    <div class="zh-plant-div1" v-show="groupStep==2">
        <div class="zh-plant-div2">
            <Form ref="groupList" :model="groupList" :rules="groupListRule" label-position="right" :label-width="220" class="formStyle">
                <FormItem label="组织类型" class="zh_form zh-plant-chooseType">
                  <div class="reg_groupSelect">
                    <div>
                      <span v-for="(item,index) in typeTabList" :key='index' :class="{'reg_chooseFocus':typeClicked==index}" @click="typeChangeTab(index)">{{item}}</span>
                    </div>
                  </div>
                </FormItem>
                <FormItem label="主体名称" class="zh_form zh-plant-chooseType" prop="reg_groupname">
                    <Input placeholder="请输入营业执照注册的主体名称（不区分中英文括号）" v-model="groupList.reg_groupname"></Input>
                </FormItem>
                <FormItem label="社会统一信用代码" class="zh_form zh-plant-chooseType" prop="reg_creditCode">
                    <Input placeholder="请输入社会统一信用代码" v-model="groupList.reg_creditCode"></Input>
                </FormItem>
                <FormItem label="设置账号密码" class="zh_form zh-plant-chooseType" prop="reg_pwd">
                    <Input placeholder="请设置您的账号密码，6-12位；请注意大小写锁定键是否开启" v-model="groupList.reg_pwd" type="password"></Input>
                </FormItem>
                <FormItem label="再次输入密码" class="zh_form zh-plant-chooseType" prop="pwd_check">
                    <Input placeholder="再次输入密码以校验" v-model="groupList.pwd_check" type="password"></Input>
                </FormItem>
                <FormItem label="法定代表人姓名" class="zh_form zh-plant-chooseType" prop="reg_legalname">
                    <Input placeholder="必填" v-model="groupList.reg_legalname"></Input>
                </FormItem>
                <FormItem label="法定代表人公民身份证号" class="zh_form zh-plant-chooseType" prop="reg_legalidcard">
                    <Input placeholder="必填" v-model="groupList.reg_legalidcard"></Input>
                </FormItem>
                <FormItem label="单位电子邮箱" class="zh_form zh-plant-chooseType" prop="reg_email">
                    <Input placeholder="必填" v-model="groupList.reg_email"></Input>
                </FormItem>
                <FormItem label="单位证明文件" class="zh_form zh-plant-chooseType" prop="reg_groupfile">
                    <Input placeholder="请上传文件" v-model="groupList.reg_groupfile" :disabled="true"></Input>
                    <Upload action="/api/court/register/addProvePath.jhtml" :data="{imgAddress:''}" accept="image/*" :show-upload-list="false" :on-success="upGroupfileSuccess" style="display:inline">
                        <Button type="primary" shape="circle" class="zh-getCodeBtn">上传文件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="注册操作者身份" class="zh_form zh-plant-chooseType">
                  <div class="reg_groupSelect">
                    <div>
                      <span v-for="(item,index) in contrTypeTabList" :key='index' :class="{'reg_chooseFocus':contrTypeClicked==index}" @click="contrTypeChangeTab(index)">{{item}}</span>
                    </div>
                  </div>
                </FormItem>
                <div>
                  <div v-if="contrTypeClicked==0">
                    <FormItem label="手机号" class="zh_form zh-plant-chooseType" prop="reg_phone">
                        <Input placeholder="必填" v-model="groupList.reg_phone"></Input>
                    </FormItem>
                    <FormItem label="手机验证码" class="zh_form zh-plant-chooseType" prop="phone_code">
                        <Input placeholder="必填" v-model="groupList.phone_code"></Input>
                        <Button type="primary" shape="circle" class="zh-getCodeBtn" @click="getPhoneCode('groupList')">{{code_states}}</Button>
                    </FormItem>
                  </div>
                  <div v-if="contrTypeClicked==1">
                    <FormItem label="被委托人姓名" class="zh_form zh-plant-chooseType" prop="reg_clientname">
                        <Input placeholder="必填" v-model="groupList.reg_clientname"></Input>
                    </FormItem>
                    <FormItem label="被委托人公民身份证号" class="zh_form zh-plant-chooseType" prop="reg_clientidcard">
                        <Input placeholder="必填" v-model="groupList.reg_clientidcard"></Input>
                    </FormItem>
                    <FormItem label="法定代表人委托书" class="zh_form zh-plant-chooseType" prop="reg_clientfile">
                        <Input placeholder="请上传文件" v-model="groupList.reg_clientfile" :disabled="true"></Input>
                        <Upload action="/api/court/register/addPrincipalPath.jhtml" :data="{imgAddress:''}" accept="image/*" :show-upload-list="false" :on-success="upClientfileSuccess" style="display:inline">
                            <Button type="primary" shape="circle" class="zh-getCodeBtn">上传文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="手机号" class="zh_form zh-plant-chooseType" prop="reg_phone">
                        <Input placeholder="必填" v-model="groupList.reg_phone"></Input>
                    </FormItem>
                    <FormItem label="手机验证码" class="zh_form zh-plant-chooseType" prop="phone_code">
                        <Input placeholder="必填" v-model="groupList.phone_code"></Input>
                        <Button type="primary" shape="circle" class="zh-getCodeBtn" @click="getPhoneCode('groupList')">{{code_states}}</Button>
                    </FormItem>
                  </div>
                </div>
            </Form>
            <div class="textCenter"><a style="color:darkblue">厦门市思明区人民法院《金融和互联网法庭网上诉讼管理办法》</a></div>
            <div class="textCenter">
                <Radio v-model="isAgreet" @click.native="agreetClick" class="agreetDiv"><div class="radioText">我已详细阅读和知悉《注册须知》，接受并遵守厦门市思明区人民法院《金融和互联网法庭网上诉讼管理方法》的规定，依法进行诉讼活动。</div></Radio>
            </div>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep('groupList')">下一步</Button>
            </div>
        </div>
    </div>
    <!-- <div class="zh-plant-div" v-show="groupStep==2 && isFace">
        <div style="padding: 130px 0px;height: 100%;">
            <Icon type="checkmark-circled" size="80" style="color: #2F60BD"></Icon>
            <p style="padding:50px">您的身份通过验证！</p>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep">下一步</Button>
            </div>
        </div>
    </div> -->
    <div class="zh-plant-div" v-show="groupStep==3">
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
  @import "./groupRegInfo.css";
</style>

<script>
import { groupRegist,
        sendPhoneCode,
 } from '@/api/user.js' //提交企业注册
import md5 from 'md5';//MD5加密


 export default {
   components: {

   },
   props:{
        groupStep:{
            type:Number,
            required:true
        }
   },
   data () {
    //二次密码确认验证方法
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码!'));
        } else if (value !== this.groupList.reg_pwd) {
            callback(new Error('两次密码输入不一致!'));
        } else {
            callback();
        }
    };
     return {
        isAgreet:false,
        typeTabList:["法人","非法人组织"],
        contrTypeTabList:["法定代表人本人","法定代表人委托人"],
        typeClicked:0,
        contrTypeClicked:0,
        isFace:false,
        isStep2Show:true,
        code_states:"获取",
        send_open:true,//验证码开关
        groupList:{
            reg_grouptype:"法人组织",//组织类型
            reg_groupname:"",//主体名称
            reg_creditCode:"",//统一信用代码
            reg_pwd:"",//账号密码
            pwd_check:"",//密码确认
            reg_legalname:"",//法定代表人姓名
            reg_legalidcard:"",//法定代表人身份证
            reg_email:"",//单位电子邮箱
            reg_groupfile:"",//单位证明文件
            reg_controllertype:"",//注册操作者身份
            reg_phone:"",//手机号
            phone_code:"",//手机验证码
            reg_clientname:"",//被委托人姓名
            reg_clientidcard:"",//被委托人身份证
            reg_clientfile:"",//法定代表人委托书
        },
        //自然人注册表单规则
        groupListRule:{
            reg_groupname:[
                { required: true,type: "string", message: '请输入主体名称!', trigger: 'blur' },
            ],
            reg_creditCode:[
                { required: true,type: "string", message: '请输入社会统一信用代码!', trigger: 'blur' },
                { type: "string", pattern: /^[A-Za-z0-9]+$/, message: '输入格式有误!', trigger: 'blur' }
            ],
            reg_pwd:[
                { required: true, message: '请输入密码!', trigger: 'blur' },
                { type: "string", pattern: /^[A-Za-z0-9]{6,12}$/, message: '请输入6-12位字母或数字的密码!', trigger: 'blur' }
            ],
            pwd_check: [
                { required: true, validator: validatePassCheck, trigger: 'blur'}
            ],
            reg_legalname: [
                { required: true, message: '请输入法定代表人姓名!',trigger: 'blur'},
                { type: "string", pattern: /[\u4e00-\u9fa5]+/, message: '请输入正确姓名!', trigger: 'blur' }
            ],
            reg_legalidcard: [
                { required: true,type: "string", message: '请输入身份证号!', trigger: 'blur' },
                { type: "string", pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配!', trigger: 'blur' }
            ],
            reg_email:[
                { required: true, message: '请输入电子邮箱!',trigger: 'blur'},
                { type: 'string',pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '请正确填写邮箱!', trigger: 'blur'}
            ],
            reg_groupfile:[
                { required: true,type: "string", message: '请上传单位证明文件!', trigger: 'blur' },
            ],
            reg_clientname: [
                { required: true, message: '请输入委托人人姓名!',trigger: 'blur'},
                { type: "string", pattern: /[\u4e00-\u9fa5]+/, message: '请输入正确姓名!', trigger: 'blur' }
            ],
            reg_clientidcard: [
                { required: true, message: '被委托人公民身份证号!',trigger: 'blur'},
                { type: "string", pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配!', trigger: 'blur' }
            ],
            reg_clientfile:[
                { required: true,type: "string", message: '请上传法定代表人委托书!', trigger: 'blur' },
            ],
            reg_phone:[
                { required: true, message: '请输入手机号!',trigger: 'blur'},
                { type: 'string',pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,message: '请正确填写手机号!', trigger: 'blur'}
            ],
            phone_code: [
                { required: true,type: "string", message: '请输入验证码!', trigger: 'blur'}
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
            // //切换步骤状态
            var num=this.groupStep+1;
            if(num<=3){
                //检查当前步骤执行对应事件
                console.log(this.groupStep);
                switch(this.groupStep){
                    case 1://步骤1扫码认证
                       
                    break
                    case 2://步骤2执行事件
                        this.stepEvent2(name,num);                      
                    break
                }
            }else if(num==4){
                this.$router.push('/courtfinance/login');
                //重置步骤
                this.$emit('nextStep',2);
            }
        },
        changeTab(index){//身份验证选项卡切换
            this.clicked=index;
        },
        typeChangeTab(index){//组织类型选项卡切换
            this.typeClicked=index;
            switch(index){
              case 0:
                this.groupList.reg_grouptype="法人组织";
              break;
              case 1:
                this.groupList.reg_grouptype="非法人组织";
              break;
            }
        },
        contrTypeChangeTab(index){//操作者类型选项卡切换
            this.contrTypeClicked=index;
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
                        sendPhoneCode({phone:that.groupList.reg_phone,sendType:0}).then(res=>{
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
        stepEvent2(name,num){//步骤1
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //判断操作者身份
                    let that = this.groupList;
                    switch(this.contrTypeClicked){
                        case 0:
                            var data={
                                OrganizationType:that.reg_grouptype,
                                companyName:that.reg_groupname,
                                uniformCreditCode:that.reg_creditCode,
                                password1:md5(that.reg_pwd),
                                password2:md5(that.pwd_check),
                                legalManName:that.reg_legalname,
                                legalManCode:that.reg_legalidcard,
                                email:that.reg_email,
                                provePath:that.reg_groupfile,
                                isLegalMan:"false",
                                phone:that.reg_phone,
                                phoneCode:that.phone_code,
                            }
                        break
                        case 1:
                            var data={
                                OrganizationType:that.reg_grouptype,
                                companyName:that.reg_groupname,
                                uniformCreditCode:that.reg_creditCode,
                                password1:md5(that.reg_pwd),
                                password2:md5(that.pwd_check),
                                legalManName:that.reg_legalname,
                                legalManCode:that.reg_legalidcard,
                                email:that.reg_email,
                                provePath:that.reg_groupfile,
                                isLegalMan:"true",
                                phone:that.reg_phone,
                                phoneCode:that.phone_code,
                                principalName:that.reg_clientname,
                                principalCode:that.reg_clientidcard,
                                principalPath:that.reg_clientfile,
                            }
                        break
                    }
                    console.log(data)
                    if(this.isAgreet==true){
                        //这里写单位注册信息提交请求
                        groupRegist(data).then(res=>{
                            // console.log(res);
                            if(res.data.state==100){
                                this.$Message.success(res.data.message);
                                //进入下一步
                                this.$emit('nextStep',num);
                                //获取二维码
                                get2CodeImg().then(res=>{
                                    console.log(res);
                                    this.mainCodeImg=res.data.data;
                                })
                            }else{
                                this.$Message.error(res.data.message);
                            }
                        });
                    }else{
                        this.$Message.error('请先同意注册须知!');
                    }
                } else {
                    this.$Message.error('提交失败！');
                }
            })
        },
        upGroupfileSuccess(res){//单位证明文件上传成功
            if(res.state==100){
                this.$Message.success("文件上传成功!");
                this.groupList.reg_groupfile=res.data;
            }else{
                this.$Message.error("文件上传失败!");
            }
        },
        upClientfileSuccess(res){//代表人委托书上传成功
            if(res.state==100){
                this.$Message.success("文件上传成功!");
                this.groupList.reg_clientfile=res.data;
            }else{
                this.$Message.error("文件上传失败!");
            }
        },
   },
 }
</script>

<style>

 
</style>
