<!--法院端首页-->
<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div>
     <court-home v-if="courtAllowName.indexOf(this.$store.getters.roLeName)>-1"></court-home>
     <litigant-home v-if="litigantAllowName.indexOf(this.$store.getters.roLeName)>-1"></litigant-home>
  </div>
</template>

<script>
import courtHome from "./courtHome.vue";
import litigantHome from "./litigantHome.vue";
export default {
  name: "home",
  components: {
    courtHome,
    litigantHome,
  },
  data() {
    return {
      courtAllowName:["超级管理员", "庭长", "审判长", "法官", "书记员", "法官助理", "代书记员", "陪审员", "分配专员", "工作人员", "送达专员","调解员","法院调解员","机构调解员"],
      litigantAllowName:["当事人", "代理人"],
    };
  },
  methods: {

  }
};
</script>