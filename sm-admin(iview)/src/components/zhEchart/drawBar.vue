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
      default: "myChartBarId"
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
    //是否包含坐标轴的刻度标签
    containLabel: {
      type: Boolean,
      default: false
    },
    // 条形图数据
    opinionData: {
      type: Object,
      default() {
        return {};
      }
    },
    //条形图颜色
    barColor: {
      type: String,
      default: ""
    },
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
      this.charts.setOption({
        title: {
          text: this.titleText, // 标题文本
          subtext: this.subText, //副标题文本
          x: '55%',//文字距离左边大小
          textAlign: 'center'
        },
        tooltip: {
            // trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
        },
        grid: [{
            top: 50,//组件离容器上侧的距离。
            left: 10,//组件离容器左侧的距离。
            containLabel: this.containLabel//是否包含坐标轴的刻度标签。
        }],
        xAxis: [{
            type: 'value',//数值轴类型
            splitLine: {//是否显示轴线
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: Object.keys(this.opinionData),//条形图y轴标签数据
            axisLabel: {
                interval: 0,//坐标轴刻度标签的显示间隔,设置成 0 强制显示所有标签
                rotate: 30//y轴标签旋转角度
            },
            splitLine: {//是否显示轴线
                show: false
            }
        }],
        series: [
            {
                type: 'bar',//数据条
                stack: 'chart',//堆叠
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true,
                    }
                },
                itemStyle: {
                    normal: {
                        color: this.barColor
                    }
                },
                data: this.changeOpinionData(this.opinionData)
            },
            {
                type: 'bar',//背景条
                stack: 'chart',//堆叠
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#EEEEEE'
                    }
                },
                data: this.getRest(this.opinionData)
            }
        ],
      });
    },
    changeOpinionData(ary){//取条形数据值
        var newAry=Object.keys(ary).map(function (key) {
            return ary[key];
        })
        return newAry;
    },
    getTotol(ary){//统计总数
        var totol=Object.keys(ary).reduce(function (all, key) {
            return all + ary[key];
        }, 0)
        return totol;
    },
    getRest(ary){//统计余量
        var that=this;
        var rest=Object.keys(ary).map(function (key) {
            return that.getTotol(ary) - ary[key];
        })
        return rest;
    }
  }
};
</script>