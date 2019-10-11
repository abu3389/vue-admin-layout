<!-- 自定义 echart 组件 -->
<template>
  <div>
    <!-- echart表格 -->
    <div :id="myChartId" :style="echartStyle"></div>
    <Spin size="large" fix v-if="isLoadding"></Spin>
  </div>
</template>
 
<script>
import echarts from "echarts";
export default {
  props: {
    // ID
    myChartId: {
      type: String,
      default: "myChartPieId"
    }, 
    // 样式
    echartStyle: {
      type: String,
      default: ""
    }, 
    // 标题文本
    titleText: {
      type: String,
      default: ""
    }, 
    // 标题文本
    subText: {
      type: String,
      default: ""
    }, 
    // 提示框键名
    tooltipFormatter: {
      type: String,
      default: ""
    }, 
    // 扇形区域名称
    opinion: {
      type: Array,
      default() {
        return [];
      }
    }, 
    // 提示框标题
    seriesName: {
      type: String,
      default: ""
    },
     // 扇形区域数据
    opinionData: {
      type: Object,
      default() {
        return {}
      }
    },
    //饼图多大
    pieRadius: {
      type: String,
      default: "50%"
    },
    //饼图距离顶部文字多远
    pieDistance: {
      type: String,
      default: "30%"
    }
  },
  data() {
    return {
      isLoadding:true
    };
  },
  watch: {
    opinionData(val, oldval) {
      this.$nextTick(function() {
        this.isLoadding=false;
        this.drawPie(this.myChartId);
      });
    }
  },
  methods: {
    // 监听扇形图点击
    eConsole(param) {
      // 向父组件传值
      this.$emit("echarEvent", param);
    }, // 绘制饼状图
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.on("click", this.eConsole);
      console.log(this.opinion, this.opinionData);
      this.charts.setOption({
        title: {
          text: this.titleText, // 标题文本
          subtext: this.subText, //副标题文本
          x: '25%',//文字距离左边大小
          left: "center"
        },
        tooltip: {
            // trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
        },
        legend: {
          bottom: 20,
          left: "center",
          data: this.opinion // 底部标签名称
        },
        series: [
          {
            name: this.seriesName, // 提示框标题
            type: "pie",
            radius: this.pieRadius,
            center: ["50%", this.pieDistance],
            data: this.changeOpinionData(this.opinionData), // 扇形区域数据
            label: {
              normal: {
                formatter: "{b}：{d}%",//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: [
          "#96DEE8",
          "#FF6666",
          "#3FB1E3",
          "#6BE6C1",
          "#626C91",
          "#A0A7E6",
          "#C4EBAD",
        ]
      });
    },
    changeOpinionData(ary){//转化为扇形需要的数据格式
        var newAry=Object.keys(ary).map(function (key) {
            return {
                name: key,
                value: ary[key]//获取扇形数据
            }
        });
        return newAry;
    },
  }
};
</script>