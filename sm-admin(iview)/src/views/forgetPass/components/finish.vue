<template>
 <div>
    <div class="zh-plant-div">
        <div style="padding: 130px 0px;height: 100%;">
            <Icon type="checkmark-circled" size="80" style="color: #22B573"></Icon>
            <p style="padding:50px">重置成功！</p>
            <div class="textCenter zh-nextBtnDiv">
                <Button type="primary" shape="circle" class="zh-nextBtn" @click="nextStep">回到首页</Button>
            </div>
        </div>
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
    methods: {
        nextStep(){//下一步点击事件
            this.$router.push('/courtfinance/login');
            //重置步骤
            this.$emit('nextStep',1);
        },
    },
 }
</script>

<style>
.zh-plant-div{
    width: 100%;
    text-align: center;
}
.textCenter {
    text-align: center;
}
.zh-nextBtnDiv {
    margin-top: 10px !important;
    margin-bottom: 10px;
}

.zh-nextBtn {
    width: 400px;
    height: 45px;
    background-color: #3162BE;
    font-size: 14px;
}
 
</style>
