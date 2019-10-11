<!--当事人端首页-->
<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div style="height:735px">
    <Row style="height: 85%;">
      <Col span="15" offset="1" style="height: 100%;">
        <Card style="overflow:auto">
          <Row class="tables">
            <div class="myPannel"><span class="title">我代理的案件</span><span class="more" @click="moreCase"><Icon type="ios-list"/> 查看更多</span></div>
            <Table
              size="small"
              stripe
              style="min-height:350px"
              :loading="loading"
              border
              :columns="columns"
              :data="tableData"
              ref="table"
              sortable="custom"
              @on-selection-change="changeSelect"
            ></Table>
          </Row>
          <Row type="flex" class="page" style="margin-top:15px;min-height:30px;">
            <RadioGroup v-model="pageData.sort" @on-change="sortChange" style="position: absolute;">
                <Radio label="true"><span>正序</span></Radio>
                <Radio label="false"><span>倒序</span></Radio>
            </RadioGroup>
            <Page
              :current="pageData.pageNumber"
              :total="pageData.total"
              :page-size="pageData.pageSize"
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              placement="top"
              :page-size-opts="[10,20,50,100]"
              size="small"
              show-total
              show-elevator
              show-sizer
              style="margin: auto;"
            ></Page>
          </Row>
        </Card>
      </Col>
      <Col span="7" style="margin-left:20px;height:100%">
        <Card>
          <Row class="tables">
            <div class="myPannel"><span class="title">待办/消息</span><span class="more" @click="moreMsg"><Icon type="ios-list"/> 查看更多</span></div>
            <div class="myPannelContent">
                <div v-for="(item,index) in noticeList.false" :key="index" style="padding:10px 15px;"><span class="msg">{{item.noticeContent}}</span></div>
            </div>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px">
      <Col span="7" offset="1">
        <Card style="min-height:125px">
            <div>
              <span class="Ico_img">
                <Icon type="ios-compose"></Icon>
              </span>
              <a class="Ico_name" style="color:whrite" href="/setcase/index/setcase">立案申请</a>
            </div>
            <div style="margin-left:50px">
                <div style="padding-left:10px">
                  <a style="padding-right:20px" @click="goToRouter('setcase_index','Singlecase')">单案件立案</a>
                  <a style="padding-right:20px" @click="goToRouter('setcase_index','SingleNewcase')"  v-if='this.$store.getters.roLeName=="代理人"'>批量案件填写立案</a>
                  <a style="padding-right:20px" @click="goToRouter('setcase_index','Muticase')"  v-if='this.$store.getters.roLeName=="代理人"'>批量案件模板立案</a>
                </div>
            </div>
        </Card>
      </Col>
      <Col span="7" style="margin:0px 2.7%;">
        <Card style="min-height:125px">
            <div>
              <span class="Ico_img">
                <Icon type="ios-paper"></Icon>
              </span>
              <a class="Ico_name" style="color:whrite" href="/courtfinance/mycase">我代理的案件</a>
            </div>
            <div style="margin-left:50px">
                <div style="padding-left:10px">
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '预立案'}}">预立案</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '立案申请'}}">待审核</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '排班'}}">待排期</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '送达'}}">待送达</router-link>
                </div>
                <div style="padding-left:10px">
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '退回'}}">被退回</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '已开庭'}}">已开庭</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '已调解'}}">已调解</router-link>
                  <router-link style="padding-right:20px" :to="{path: '/courtfinance/mycase', query: {progress: '已结案'}}">已结案</router-link>
                </div>
            </div>
        </Card>
      </Col>
      <Col span="7">
        <Card style="min-height:125px">
            <div>
              <span class="Ico_img">
                <Icon type="person"></Icon>
              </span>
              <a class="Ico_name" style="color:whrite" href="/courtfinance/ownspace">个人中心</a>
            </div>
            <div style="margin-left:50px">
                <div style="padding-left:10px">
                  <a style="padding-right:20px" @click="goToRouter('ownspace_index','personInfo')">个人信息</a>
                  <a style="padding-right:20px" @click="goToRouter('ownspace_index','accuntInfo')">账号安全</a>
                  <a style="padding-right:20px" @click="goToRouter('ownspace_index','litigantInfo')">常用当事人</a>
                  <a style="padding-right:20px" @click="goToRouter('ownspace_index','agentInfo')">常用代理人</a>                  
                </div>
            </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
   indexLawCaseList,
   noticeList
} from "@/api/homeDate";
export default {
  name: "litigantHome",
  components: {
  },
  data() {
    return {
      loading: false,
      selectList: [], //选择的数据
      selectCount: 0, //选择数量
      tableData:[],//表格数据
      pageData: {
        pageNumber: 1,
        pageSize: 10,
        total:0,
        sort:"true",//正序 true 倒序 false
      },
      noticeList:[],//消息列表
      columns: [
        {
          title: "序号",
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index +(this.pageData.pageNumber - 1) * this.pageData.pageSize +1
            );
          }
        },
        {
          title: "网申号",
          key: "netApplicationNo",
          align: "center"
        },
        {
          title: "案号",
          key: "caseNo",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.caseNo ? params.row.caseNo : "暂未分配"
            );
          }
        },
        {
          title: "原告",
          key: "plaintiffName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.plaintiffName ? params.row.plaintiffName : "暂无"
            );
          }
        },
        {
          title: "被告",
          key: "defendantName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.defendantName ? params.row.defendantName : "暂无"
            );
          }
        },
        {
          title: "案由",
          key: "briefName",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.briefName ? params.row.briefName : "暂无"
            );
          }
        },
        {
          title: "当前状态",
          key: "progress",
          align: "center"
        },
        {
          title: "操作",
          key: "",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: function () {
                      window.open('https://'+  window.location.host + '/rtc/?caseId='+params.row.lawCaseId)
                    }
                  }
                },
                "进入庭审室"
              ),
            ]);
          }
        }
      ],
    };
  },
  mounted() {
    this.init(); //获取数据
  },
  methods: {
    init(){//初始化数据
      this.getIndexLawCaseList(this.pageData)//获取当事人案件数据
      this.getCaseMsg();//获取案件消息列表
    },
    pageChange(pageNum) {//页码改变
        this.pageData.pageNumber = pageNum;
        this.getIndexLawCaseList(this.pageData);
    },
    pageSizeChange(pageSize) {//页码大小改变
        this.pageData.pageSize = pageSize;
        this.getIndexLawCaseList(this.pageData);
    },
    sortChange(val){//排序改变
      this.pageData.sort = val;
      this.getIndexLawCaseList(this.pageData);
    },
    goToRouter(routerName,params){//跳转相关页面
      this.$router.push({
          name: routerName,
          params:{name:params}
        });
    },
    changeSelect(e){
      this.selectList = e;
      this.selectCount = e.length;
    },
    getIndexLawCaseList(pageData){//获取当事人案件数据
      let pageDataNew=Object.assign({},pageData);
      pageDataNew.sort= pageDataNew.sort === 'true'
      indexLawCaseList(pageDataNew).then(res => {
        if (res.data.state == 100) {
          let data = res.data.data;
          this.tableData = data.content;
          this.pageData.total=data.total;
          console.log(this.tableData);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    moreCase(){//获取更多案件
      this.$router.push({name:'mycase_index'})
    },
    moreMsg(){//获取更多案件
      this.$router.push({name:'message_index'})
    },
    getCaseMsg(){//获取案件消息列表
      noticeList().then(res => {
        if (res.data.state == 100) {
          let data = res.data.data;
          this.noticeList = data;
          console.log(this.noticeList);
        } else {
          // this.$Message.error(res.data.message);
        }
      });
    }
  },
  filters: {}
};
</script>
<style lang="less" src='./home.less'>
</style>