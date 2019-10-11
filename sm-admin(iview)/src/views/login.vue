<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="header-con">
            <div class="navicon-con">
                    <div slot="top" class="logo-con">
                        <img style="height:105px;margin-left:5px"  src="../images/logoH.png" key="max-logo" />
                    </div>
            </div>
            <div class="rightSelect">
                <div id="courtSel" class="selOne" @click="changeLogin('court')">
                    <span>法院司法工作平台</span>
                </div>
                <div id="litigantSel" class="selOne on" @click="changeLogin('litigant')">
                    <span>互联网诉讼服务平台</span>
                </div>
            </div>
        </div>
        <div class="login-body" >
            <div style="position: absolute;top: 110px;;width:100%"> 
                <div class="single-page" style="height:100%;background: #fff;">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <div class="leftC">
                <p style="font-size:16px;line-height:35px;padding-top: 5px;">厦门市思明区人民法院</p>
            </div>
            <div class="rightC">
                <p style="font-size:15px;line-height:35px;padding-top: 5px;">
                    &nbsp;
                    <span><a href="http://218.5.2.1:18080/" target="_blank" style="color:white">法务云盘</a></span>
                    <span><a href="http://courtapp.chinacourt.org/" target="_blank" style="color:white">最高人民法院</a></span>
                    <span><a href="https://www.fjcourt.gov.cn/" target="_blank" style="color:white">福建省高级人民法院</a></span>
                    <span><a href="https://www.xmcourt.gov.cn/" target="_blank" style="color:white">厦门市中级人民法院</a></span>
                    <span><a href="http://tingshen.court.gov.cn/" target="_blank" style="color:white">中国庭审公开网</a></span>
                </p>
                <p  style="line-height:25px;padding-bottom: 5px;">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return{

        }
    },
    created () {

    },
    watch: {
		'$route' (to, from) {
            console.log(to.name)
            let ob1 =  document.getElementById('courtSel');
            let ob2 =  document.getElementById('litigantSel');
            if(to.name == 'login_court'){
                ob1.classList.add('on')
                ob2.classList.remove('on')
            }else if(to.name == 'login_index'){
                ob2.classList.add('on')
                ob1.classList.remove('on')
            }
		},
    },
    methods: {
        handleSubmit(){

        },
        changeLogin(el){
            console.log(el)
            if(el=='litigant'){
                this.$router.push({
                    name: 'login_index'
                });
            }else{
                this.$router.push({
                    name: 'login_court'
                });
            }
        }
    }
}
</script>