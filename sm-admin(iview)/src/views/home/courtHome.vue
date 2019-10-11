<!--法院端首页-->
<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div>
    <Row>
      <Col span="6" offset="1">
        <Form>
          <FormItem label="筛选法官">
            <Select
              v-model="selectInfo.selected"
              multiple
              style="width:250px;"
              placeholder="请选择或输入关键词搜索"
              clearable
              filterable
              @on-change="judgeChange"
            >
              <Option
                v-for="(item,index) in selectInfo.selectList"
                :value="item.judgeId"
                :key="index"
                @on-change="judgeChange"
              >{{ item.judgeName+"（"+item.courtName+"）" }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row>
      <!-- 饼图 -->
      <Col span="9" style="text-align:center">
        <draw-pie
          :myChartId="'mychart1'"
          :echartStyle="'width:450px;height:300px;margin:auto'"
          :pieRadius="'50%'"
          :pieDistance="'55%'"
          :titleText="drawPieInfo.titleText"
          :subText="drawPieInfo.subText"
          :opinionData="drawPieInfo.opinionData"
          @echarEvent="echarEvent($event,'案件状态')"
        ></draw-pie>
      </Col>
      <!-- 条形图 -->
      <Col span="9">
        <draw-bar
          :myChartId="'mychart4'"
          :echartStyle="'width:450px;height:300px;margin:auto'"
          :titleText="drawPieInfo3.titleText"
          :subText="drawPieInfo3.subText"
          :containLabel="drawPieInfo3.containLabel"
          :barColor="drawPieInfo3.barColor"
          :opinionData="drawPieInfo3.opinionData"
          @echarEvent="echarEvent($event,'案由统计')"
        ></draw-bar>
      </Col>
      <Col span="6">
        <Card style="/*height:550px*/height:280px;background-color: #f4f8ff;">
          <div :class="searchInfo.searchStyle">
            <div class="divson">
              <div style="display:flex">
                <span style="color:#2083D8;font-size:1.4vw;">
                  <Icon type="ios-search"/>请输入案号查看案件时间轴
                </span>
              </div>
              <div style="display:flex;margin: 10px 0px;">
                <Input
                  search
                  enter-button
                  placeholder="请输入案号"
                  @on-change="searchCase"
                  v-model="searchInfo.searchContent"
                />
                <Button slot="append" type="primary" icon="ios-search" style="margin-left:10px" @click="searchCase">搜索</Button>
              </div>
            </div>
          </div>
          <div v-show="searchInfo.show" class="searchDiv" style="height: 200px/*height: 444px*/">
            <div v-show="!searchInfo.hasContent" style="font-size:20px">暂无数据</div>
            <div style="padding:10px 0;overflow:auto;height: 200px/*height: 444px*/">
              <Timeline style="font-size:15px">
                <TimelineItem v-for="(item,index) in searchInfo.searchResult" :key="index">{{item}}</TimelineItem>
              </Timeline>
            </div>
            <Spin size="large" fix v-if="searchInfo.isloading"></Spin>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Row>
        <Col span="22" offset="1">
          <h1 style="text-align: center;padding:10px">案件列表</h1>
        </Col>
      </Row>
      <Row>
        <Col span="22" offset="1">
          <Dropdown
            trigger="custom"
            placement="bottom-end"
            :visible="dropDownInfo.visible"
            style="margin-left: 20px;float:right"
          >
            <a href="javascript:void(0)" style="font-size:20px;" @click="handleState('open')">
              <Icon type="ios-search"/>
              <span>快速检索</span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" style="width:300px">
              <Form :label-width="60" style="margin:15px">
                <FormItem label="案号">
                  <Input v-model="tableCondition.caseNo" placeholder="请输入案号"></Input>
                </FormItem>
                <FormItem label="法官">
                  <div class="mySelectHeight">
                    <Select v-model="tableCondition.judgeId" clearable filterable  placeholder="请选择或输入关键词搜索">
                      <Option
                        v-for="(item,index) in selectInfo.selectList"
                        :value="item.judgeId"
                        :key="index"
                      >{{ item.judgeName+"（"+item.courtName+"）" }}</Option>
                    </Select>
                  </div>
                </FormItem>
                <FormItem label="案件状态">
                  <Select v-model="tableCondition.progress">
                    <Option
                      v-for="(item,index) in  getLawcaseType(lawCaseCount)"
                      :value="item.name"
                      :key="index"
                    >{{ item.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="立案时间">
                  <DatePicker
                    v-model="tableCondition.startTime"
                    format="yyyy年MM月dd日"
                    type="date"
                    placeholder="选择起始时间"
                  ></DatePicker>
                  <P>到</P>
                  <DatePicker
                    v-model="tableCondition.endTime"
                    format="yyyy年MM月dd日"
                    type="date"
                    placeholder="选择结束时间"
                  ></DatePicker>
                </FormItem>
              </Form>
              <div style="text-align: right;margin:10px;">
                <Button type="primary" @click="handleState('close')">关闭</Button>
                <Button type="primary" @click="clearBtn()">重置</Button>
                <Button type="primary" @click="searchBtn()">查询</Button>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col span="22" offset="1">
          <case-list
            @getCaseInfo="getCaseInfo"
            :tableData="tableInfo.data"
            :total="tableInfo.total"
          ></case-list>
        </Col>
      </Row>
    </Row>
  </div>
</template>

<script>
import drawPie from "@/components/zhEchart/drawPie.vue";
import drawBar from "@/components/zhEchart/drawBar.vue";
import caseList from "./components/caseList.vue";
import {
  countLawCase,
  indexJudgeList,
  indexCourtLawCaseList,
  processNote
} from "@/api/homeDate";
import { changeDatePicker } from "@/libs/tools.js";
export default {
  name: "courtHome",
  components: {
    drawPie,
    drawBar,
    caseList
  },
  data() {
    return {
      drawPieInfo: {
        titleText: "案件状态",
        subText: "总计",
        opinionData: {} //扇形数据
      },
      drawPieInfo3: {
        titleText: "案由统计",
        subText: "总计",
        containLabel: true,
        barColor: "#3FB1E3",
        opinionData: {} //条形数据
      },
      selectInfo: {
        selected: [],
        selectList: []
      },
      tableInfo: {
        //表格数据
        total: 0,
        data: []
      },
      tableCondition: {
        //表格筛选条件
        judgeId: "",
        progress: "",
        caseNo: "",
        startTime: "",
        endTime: ""
      },
      dropDownInfo: {
        visible: false
      },
      searchInfo: {
        searchStyle: "searchDiv",
        searchContent: "", //搜索内容
        searchResult: "",
        show: false,
        hasContent: true, //是否有数据
        isloading: false //加载状态
      },
      lawCaseCount: {}, //案件状态
      briefCount: {}, //案由统计
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.initChart(); //获取数据
  },
  methods: {
    initChart() {
      //初始化chart数据
      //获取图表数据
      this.getCourtBigData();
      //获取法院工作人员数据
      indexJudgeList().then(res => {
        if (res.data.state == 100) {
          let data = res.data.data;
          this.selectInfo.selectList = data;
          console.log(this.selectInfo.selectList);
        } else {
          this.$Message.error(res.data.message);
        }
      });
      //获取案件列表
      this.getCaseInfo();
    },
    echarEvent(e, name) {
      this.tableCondition.progress = "";
      switch (name) {
        case "案件状态":
          this.tableCondition.progress = e.name;
          break;
      }
      console.log(e, name);
      this.getCaseInfo();
    },
    getTotol(ary) {
      //统计总数
      var totol = Object.keys(ary).reduce(function(all, key) {
        return all + ary[key];
      }, 0);
      return totol;
    },
    judgeChange() {
      //法官筛选改变
      //重新获取法院数据统计
      let ids = this.selectInfo.selected;
      this.getCourtBigData(ids);
    },
    getCourtBigData(data) {
      //获取图表数据
      countLawCase(data).then(res => {
        if (res.data.state == 100) {
          let data = res.data.data;
          //案件状态
          this.lawCaseCount = data.lawCaseCount;
          this.drawPieInfo.opinionData = this.lawCaseCount; //设置扇形数据
          this.drawPieInfo.subText =
            "总计：" + this.getTotol(this.lawCaseCount); //设置总数
          //案由统计
          this.briefCount = data.briefCount;
          this.drawPieInfo3.opinionData = this.briefCount; //设置扇形数据
          this.drawPieInfo3.subText = "总计：" + this.getTotol(this.briefCount); //设置总数
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getCaseInfo(pageData) {
      //获取案件信息
      //转换时间戳
      this.tableCondition.startTime =
        this.tableCondition.startTime == ""
          ? ""
          : new Date(changeDatePicker(this.tableCondition.startTime)).getTime();
      this.tableCondition.endTime =
        this.tableCondition.endTime == ""
          ? ""
          : new Date(changeDatePicker(this.tableCondition.startTime)).getTime();
      //合并数据
      let data = Object.assign({}, this.tableCondition, pageData);
      console.log(data);
      indexCourtLawCaseList(data).then(res => {
        if (res.data.state == 100) {
          let data = res.data.data;
          this.tableInfo.data = data.content; //获取内容
          this.tableInfo.total = data.total; //获取总条数
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    handleState(type) {
      //下拉菜单关闭
      switch (type) {
        case "open":
          this.dropDownInfo.visible = true;
          break;
        case "close":
          this.dropDownInfo.visible = false;
          // this.clearBtn();
          break;
      }
    },
    getLawcaseType(ary) {
      //获取案件状态类型
      var newAry = Object.keys(ary).map(function(key) {
        return {
          name: key,
          value: ary[key]
        };
      });
      return newAry;
    },
    searchBtn() {
      //检索搜索按钮
      this.getCaseInfo();
    },
    clearBtn() {
      //检索清空按钮
      this.tableCondition = {
        //表格筛选条件
        judgeId: "",
        progress: "",
        caseNo: "",
        startTime: "",
        endTime: ""
      };
      this.getCaseInfo();
    },
    searchCase() {
      //搜索案件时间轴
      if (this.searchInfo.searchContent != "") {
        this.searchInfo.searchStyle = "searchDiv1"; //搜索框置顶
        this.searchInfo.show = true; //显示搜索内容
      } else {
        this.searchInfo.searchStyle = "searchDiv"; //搜索框置顶
        this.searchInfo.show = false; //显示搜索内容
      }
      //获取案件信息
      this.searchInfo.isloading = true;
      indexCourtLawCaseList({ caseNo: this.searchInfo.searchContent }).then(
        res => {
          if (res.data.state == 100) {
            let data = res.data.data;
            if(data.content.length==0){
                this.searchInfo.isloading = false;
                this.searchInfo.hasContent = false;
                return;
            }
            let lawCaseId = data.content[0].lawCaseId;
            this.searchInfo.hasContent = true;
            //获取案件时间轴
            processNote({ lawCaseId: lawCaseId }).then(res => {
              if (res.data.state == 100) {
                this.searchInfo.isloading = false;
                let data = res.data.data;
                this.searchInfo.searchResult = data;
              } else {
                this.$Message.error(res.data.message);
                this.searchInfo.hasContent = false;
                this.searchInfo.isloading = false;
              }
            });
          } else {
            this.$Message.error(res.data.message);
            this.searchInfo.hasContent = false;
            this.searchInfo.isloading = false;
          }
        }
      );
    }
  },
  filters: {}
};
</script>
<style lang="less">
@deep: ~'>>>';
.searchDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 550px;
  height: 280px;
  .ivu-timeline-item-content{
    font-size: 15px;
  }
  .divson{
    margin-top: -100px;
  }
}
.searchDiv1 {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .ivu-timeline-item-content{
    font-size: 15px;
  }
}

.mySelectHeight .ivu-select .ivu-select-dropdown{
    overflow: auto!important;
    height: 100px!important;
  
}
</style>