<template>
 <div class="registDiv">
    <div class="regist">
      <div class="stepDiv" :class="{'nopacity':myStep>=1}">
        <div class="stepDiv_msg">重置验证</div>
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
      <div class="stepDiv" :class="{'nopacity':myStep>=2}">
        <div class="stepDiv_msg">完成找回</div>
      </div>
    </div>
    <div class="reg_content">
      <Card class="reg_card">
            <!-- 身份验证 -->
            <check-info v-if="myStep==1" @nextStep="nextStep"></check-info>
            <!-- 完成找回 -->
            <finish v-if="myStep==2" @nextStep="nextStep"></finish>
      </Card>
    </div>
 </div>
</template>

<script>
 import checkInfo from "./components/checkInfo.vue";//身份验证
 import finish from "./components/finish.vue";//完成找回
 export default {
   components: {
       checkInfo,
       finish,
   },
   data () {
     return {
       myStep:1,//步骤
     }
   },
   methods: {
     nextStep(num){
       this.myStep=num;
     }
   },
 }
</script>

<style lang='css' src="./forgetPass.css">
</style>
