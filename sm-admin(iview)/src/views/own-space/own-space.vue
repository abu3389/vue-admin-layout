<template>
  <div>
      <Row>
        <Col span="24" class="ft-tabs-style1">
          <Tabs type="card" @on-click="changeTab" v-model="nowTab">
            <TabPane label="个人信息" name="personInfo">
              <personInfo ref="personInfo"></personInfo>
            </TabPane>
            <TabPane label="账号安全设置" name="accuntInfo" >
              <accountInfo ref="accuntInfo"></accountInfo>
            </TabPane>
            <!-- <TabPane label="历史委托人信息" name="historyClientInfo">
              <historyClientInfo ref="historyClientInfo"></historyClientInfo>
            </TabPane> -->
            <TabPane class="dbSet-main" label="常用当事人信息" name="litigantInfo" v-if='this.$store.getters.roLeName=="代理人" || this.$store.getters.roLeName=="当事人"'>
              <litigantInfo ref="litigantInfo"></litigantInfo>
            </TabPane>
            <TabPane class="dbSet-main" label="常用代理人信息" name="agentInfo" v-if='this.$store.getters.roLeName=="代理人" || this.$store.getters.roLeName=="当事人"'>
              <agentInfo ref="agentInfo"></agentInfo>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
  </div>
</template>

<script>
import "./own-space.less"; //导入样式
//个人信息
import personInfo from "./components/personInfo/personInfo.vue";
//账号安全设置
import accountInfo from "./components/accountInfo/accountInfo.vue";
//历史委托人信息
import historyClientInfo from "./components/historyClientInfo/historyClientInfo.vue";
//常用当事人信息
import litigantInfo from "./components/litigantInfo/litigantInfo.vue";
//常用代理人信息
import agentInfo from "./components/agentInfo/agentInfo.vue";

export default {
  name: "ownspace_index",
  components: {
    personInfo,
    accountInfo,
    historyClientInfo,
    litigantInfo,
    agentInfo
  },
  data() {
    return {
      nowTab:"personInfo"
    };
  },
  methods: {
    //切换的时候初始化表格
    changeTab(e){
        console.log(e);
      switch(e){
          case "personInfo":
            this.$refs.personInfo.getPersonContent();
          break;
          case "accuntInfo":
          break;
          case "litigantInfo":
            this.$refs.litigantInfo.getNowPageContent();
          break;
          case "agentInfo":
            this.$refs.agentInfo.getNowPageContent();
          break;
      }
    }
  },
  created() {
  },
  mounted() {
    //初始化默认获取的选项卡内容
    this.$refs.personInfo.getPersonContent();
    console.log(this.$route.params.name)
    switch (this.$route.params.name) {
      case "personInfo":
          this.nowTab = 'personInfo'
          this.$refs.personInfo.getPersonContent();
      break;
      case "accuntInfo":
          this.nowTab = 'accuntInfo'
      break;
      case "litigantInfo":
          this.nowTab = 'litigantInfo'
          this.$refs.litigantInfo.getNowPageContent();
      break;
      case "agentInfo":
          this.nowTab = 'agentInfo'
          this.$refs.agentInfo.getNowPageContent();
      break;
    }
  },
};
</script>

