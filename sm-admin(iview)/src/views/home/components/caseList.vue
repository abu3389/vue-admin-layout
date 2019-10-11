<!-- 自定义 案件列表 组件 -->
<template>
  <div>
    <Row class="tables">
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
    <Row type="flex" justify="end" class="page" style="margin-top:10px;height:30px;">
      <Page
        :current="pageData.pageNumber"
        :total="total"
        :page-size="pageData.pageSize"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        placement="top"
        :page-size-opts="[10,20,50,100]"
        size="small"
        show-total
        show-elevator
        show-sizer
      ></Page>
    </Row>
  </div>
</template>
 
<script>
export default {
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: []
    },
    total:{
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      loading: false,
      selectList: [], //选择的数据
      selectCount: 0, //选择数量
      pageData: {
        pageNumber: 1,
        pageSize: 10,
      },
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
              return h('span',params.row.caseNo ? params.row.caseNo : "暂未分配");
          }
        },
        {
          title: "法庭名称（部门）",
          key: "courtName",
          align: "center",
          render: (h, params) => {
              return h('span',params.row.courtName ? params.row.courtName : "暂无");
          }
        },
        {
          title: "法官名称",
          key: "judgeName",
          align: "center",
          render: (h, params) => {
              return h('span',params.row.judgeName ? params.row.judgeName : "暂无");
          }
        },
        {
          title: "书记员名称",
          key: "clerkName",
          align: "center",
          render: (h, params) => {
              return h('span',params.row.clerkName ? params.row.clerkName : "暂无");
          }
        },
        {
          title: "立案时间",
          key: "filingDate",
          align: "center"
        },
        {
          title: "案件阶段",
          key: "progress",
          align: "center"
        },
        // {
        //   title: "操作",
        //   key: "",
        //   width: 150,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.showBox("edit", params.row.id);
        //             }
        //           }
        //         },
        //         "修改"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.removeInfo(params.row.id);
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
      ],
    };
  },
//   watch: {
//     opinionData(val, oldval) {
//       this.$nextTick(function() {
//         this.drawPie(this.myChartId);
//       });
//     }
//   },
  methods: {
    pageChange(pageNum) {//页码改变
        this.pageData.pageNumber = pageNum;
        this.$emit("getCaseInfo",this.pageData);
    },
    pageSizeChange(pageSize) {//页码大小改变
        this.pageData.pageSize = pageSize;
        this.$emit("getCaseInfo",this.pageData);
    },
    changeSelect(e){
      this.selectList = e;
      this.selectCount = e.length;
    },
  }
};
</script>