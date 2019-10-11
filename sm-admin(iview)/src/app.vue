<template>
    <div id="main" class="app-main">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    provide(){
        return {
           reload:this.reload 
        }
    },
    data () {
        return {
            theme: this.$store.state.app.themeColor,
            isRouterAlive:true
        };
    },
    mounted () {},
    beforeDestroy () {},
    methods: {
        reload(){
            this.isRouterAlive=false
            //等待DOM更新完成之后再显示页面
            this.$nextTick(()=>{
                this.isRouterAlive=true
            })
        }
    }
};
</script>

<style>
html,
body {
  min-width: 1440px;
  height: 100%;
  background: #f0f0f0;
  overflow: auto;
}

.app-main {
  width: 100%;
  height: 100%;
}
.ivu-card{
    /* background: url("./images/bg.jpg") no-repeat; */
    height:100%;
    width:100%;
    overflow: hidden;
    background-size:cover;
}
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
    position: relative;
    top: -3px;
}
.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner{
    position: relative;
    top: -3px;
}
.ivu-table-cell{
    padding-left: 0px; 
   padding-right: 0px; 
}
.ivu-select{
    position: relative;
}
</style>
