<template>
 <div>
    <div class="textCenter zh-nextBtnDiv">
        <div class="code_msg">
        <span>摄像头检查正常</span><Icon type="checkmark-circled" style="margin:10px;color:green"></Icon>
        </div>
        <div class="code_img">
        <Upload  multiple type="drag" :show-upload-list="false" action="" class="uploadDiv">
            <div style="padding: 40px 0px;height: 100%;">
                <Icon type="ios-cloud-upload" size="52" style="color: #2F60BD"></Icon>
                <p style="padding:10px">点击上传身份证信息页</p>
            </div>
        </Upload>
        <Upload  multiple type="drag" :show-upload-list="false" action="" class="uploadDiv">
            <div style="padding: 40px 0px;height: 100%;">
                <Icon type="ios-cloud-upload" size="52" style="color: #2F60BD"></Icon>
                <p style="padding:10px">点击上传身份证签发机关页</p>
            </div>
        </Upload>
        </div>
        <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep">下一步</Button>
    </div>
 </div>
</template>

<script>
 export default {
   components: {

   },
   data () {
     return {

     }
   },
   methods:{
        nextStep(){//下一步
            this.$emit('next',2)
        }
   }
 }
</script>

<style>

 
</style>
