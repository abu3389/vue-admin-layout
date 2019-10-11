<template>
  <div class="ownInfo">
    <!-- 代理人和当事人登陆 -->
    <!-- 当事人信息 -->
    <div class="bookbuilding-table" v-show="isNatureInfo">
      <Row>
        <Col span="24" class="noemalTb th-header">当事人身份信息</Col>
      </Row>
      <Card>
        <Row class="topline-border right-border">
          <Col span="2" class="noemalTb tb-head textCenter">当事人类型</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.agentType ? personInfo.agentType : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">姓名</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.name ? personInfo.name : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">当事人证件</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>身份证</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">当事人证件号码</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.idcard ? personInfo.idcard : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">性别</Col>
          <Col span="4" class="noemalTb">
            <span>{{personInfo.sex ? personInfo.sex : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">出生日期</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.birthday ? personInfo.birthday : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">民族</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.nation ? personInfo.nation : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">手机号码</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.phone ? personInfo.phone : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">电子邮箱</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.email ? personInfo.email : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">工作单位</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.companyName ? personInfo.companyName : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">单位地址</Col>
          <Col span="10" class="noemalTb textLeft">
            <span>{{personInfo.workAddress ? personInfo.workAddress : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">户籍地址</Col>
          <Col span="22" class="noemalTb textLeft">
            <span>{{personInfo.address ? personInfo.address : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">经常居住地址</Col>
          <Col span="22" class="noemalTb textLeft">
            <span>{{personInfo.offtenAddress ? personInfo.offtenAddress : "暂无"}}</span>
          </Col>
        </Row>
        <!-- <div class="textCenter editBtnDiv">
          <Button type="primary" shape="circle" class="editBtn">编辑</Button>
        </div> -->
        <div class="edit-msg">
          <div>
            <!-- <span>此处的信息编辑不会影响到案件中的当事人信息，该信息仅提供立案时智能填充用。</span> -->
            <span>信息不可删除，除向法院申请账号注销</span>
          </div>
        </div>
      </Card>
    </div>
    <!-- 代理人信息 -->
    <div class="bookbuilding-table" v-show="isAgentInfo">
      <Row>
        <Col span="24" class="noemalTb th-header">代理人身份信息</Col>
      </Row>
      <Card>
        <Row class="topline-border right-border">
          <Col span="2" class="noemalTb tb-head textCenter">代理人类型</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.lawyerType ? agentInfo.lawyerType : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">姓名</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.lawyerName ? agentInfo.lawyerName : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">代理人证件</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>律师证</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">代理人证件号码</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.lawerNum ? agentInfo.lawerNum : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">代理人手机号</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.lawyerPhone ? agentInfo.lawyerPhone : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">代理人邮箱</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.lawyerEmail ? agentInfo.lawyerEmail : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">公民身份证号</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.lawyerIdcard ? personInfo.lawyerIdcard : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">代理授权类型</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{agentInfo.agentType ? agentInfo.agentType : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border" v-for="(item,index) in agentInfo.lawyerAddress">
          <Col span="2" class="noemalTb tb-head textCenter">{{item.addressType}}</Col>
          <Col span="22" class="noemalTb textLeft">
            <span>{{item.address ? item.address : "暂无"}}</span>
          </Col>
        </Row>
        <!-- <div class="textCenter editBtnDiv">
          <Button type="primary" shape="circle" class="editBtn">编辑</Button>
        </div> -->
        <div class="edit-msg">
          <div>
            <!-- <span>此处的信息编辑不会影响到案件中的当事人信息，该信息仅提供立案时智能填充用。</span> -->
            <span>信息不可删除，除向法院申请账号注销</span>
          </div>
        </div>
      </Card>
    </div>
    <!-- 法官登陆 -->
    <!-- 法官信息 -->
    <div class="bookbuilding-table" v-show="isBaseInfo">
      <Row>
        <Col span="24" class="noemalTb th-header">基础信息</Col>
      </Row>
      <Card>
        <Row class="topline-border right-border">
          <Col span="2" class="noemalTb tb-head textCenter">姓名</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.name ? personInfo.name : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">公民身份证号</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.idCard ? personInfo.idCard : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">出生</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.birthday ? personInfo.birthday : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">性别</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.sex ? personInfo.sex : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">民族</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.nation ? personInfo.nation : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">手机号</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.telphone ? personInfo.telphone : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">电子邮箱</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.email ? personInfo.email : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">联系地址</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{personInfo.trueAddress ? personInfo.trueAddress : "暂无"}}</span>
          </Col>
        </Row>
        <!-- <div class="textCenter editBtnDiv">
          <Button type="primary" shape="circle" class="editBtn">编辑</Button>
        </div> -->
        <div class="edit-msg">
          <div>
            <!-- <span>此处的信息编辑不会影响到案件中的当事人信息，该信息仅提供立案时智能填充用。</span> -->
            <span>信息不可删除，除向法院申请账号注销</span>
          </div>
        </div>
      </Card>
    </div>
    <!-- 法官职务信息 -->
    <div class="bookbuilding-table" v-show="isWorkInfo">
      <Row>
        <Col span="24" class="noemalTb th-header">职务信息</Col>
      </Row>
      <Card>
        <Row class="topline-border right-border">
          <Col span="2" class="noemalTb tb-head textCenter">姓名</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{workInfo.name ? workInfo.name : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">所属部门</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{workInfo.court.name ? workInfo.court.name : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">职务/岗位</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{workInfo.judgeType ? workInfo.judgeType : "暂无"}}</span>
          </Col>
          <Col span="2" class="noemalTb tb-head textCenter">办公电话</Col>
          <Col span="4" class="noemalTb textLeft">
            <span>{{workInfo.telephone ? workInfo.telephone : "暂无"}}</span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="2" class="noemalTb tb-head textCenter">工作邮箱</Col>
          <Col span="22" class="noemalTb textLeft">
            <span>{{personInfo.email ? personInfo.email : "暂无"}}</span>
          </Col>
        </Row>
        <!-- <div class="textCenter editBtnDiv">
          <Button type="primary" shape="circle" class="editBtn">编辑</Button>
        </div> -->
        <div class="edit-msg">
          <div>
            <!-- <span>此处的信息编辑不会影响到案件中的当事人信息，该信息仅提供立案时智能填充用。</span> -->
            <span>信息不可删除，除向法院申请账号注销</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { getPersonInfo } from "@/api/ownSpace.js";

export default {
  name: "personInfo",
  components: {},
  data() {
    return {
      personInfo: {
        name: "",
        idCard: "",
        sex: "",
        birthday: "",
        nation: "",
        telphone: "",
        email: "",
        trueAddress: "",
        agentType: "法人",
        cardType: "身份证",
        idcard: "",
        companyName: "",
        workAddress: "",
        offtenAddress: ""
      },
      workInfo: {
        name: "",
        court: "",
        judgeType: "",
        telephone: "",
        identity: ""
      },
      agentInfo: {
        lawyerType: "律师",
        lawyerName: "",
        lawyerTypeId: "律师证",
        lawyerPhone: [],
        lawyerEmail: "",
        lawyerIdcard: "",
        lawyerIdNum: "",
        lawyerAddress: [],
        agentType: "一般授权"
      },
      isBaseInfo: false,
      isWorkInfo: false,
      isNatureInfo: false,
      isAgentInfo: false,
      isDatePickerShow: true
    };
  },
  created() {},
  methods: {
    getPersonContent() {
      //获取个人信息
      getPersonInfo().then(res => {
        if (res.data.state == 100) {
          var data = res.data.data;
          switch (this.$store.getters.roLeName) {
            case "代理人":
              this.isNatureInfo = true; //显示基础信息
              this.isAgentInfo = true; //显示代理人信息
              //自然人信息
              if (data.baseInfo) {
                this.personInfo = {
                  agentType: data.baseInfo.agentType,
                  name: data.baseInfo.name,
                  cardType: data.baseInfo.cardType,
                  idcard: data.baseInfo.idcard,
                  sex: data.baseInfo.sex,
                  birthday: data.baseInfo.birthday,
                  nation: data.baseInfo.nation,
                  phone: data.baseInfo.phone,
                  email: data.baseInfo.email,
                  companyName: data.baseInfo.companyName,
                  workAddress: data.baseInfo.workAddress,
                  address: data.baseInfo.address,
                  offtenAddress: data.baseInfo.offtenAddress
                };
              }

              //代理人信息
              if (data.agentInfo) {
                console.log("123123123",data)
                this.agentInfo = {
                  lawyerType: data.agentInfo.agentType,
                  lawyerName: data.agentInfo.name,
                  lawyerTypeId: data.agentInfo.lawyerTypeId,
                  lawyerIdcard: data.agentInfo.idcard,
                  lawyerPhone: "",
                  lawyerEmail: data.agentInfo.email,
                  lawyerIdNum: data.agentInfo.lawerNum,
                  lawyerAddress: data.agentInfo.personAddresss,
                  agentType: data.agentInfo.agentType
                };
                for (let value of data.agentInfo.personPhone) {
                  if (value.phoneType == "手机") {
                    this.agentInfo.lawyerPhone = value.phone;
                  }
                }
              }
              break;
            case "当事人":
              this.isNatureInfo = true; //显示基础信息
              //自然人信息
              if (data.baseInfo) {
                this.personInfo = {
                  agentType: data.baseInfo.agentType,
                  name: data.baseInfo.name,
                  cardType: data.baseInfo.cardType,
                  idcard: data.baseInfo.idcard,
                  sex: data.baseInfo.sex,
                  birthday: data.baseInfo.birthday,
                  nation: data.baseInfo.nation,
                  phone: data.baseInfo.phone,
                  email: data.baseInfo.email,
                  companyName: data.baseInfo.companyName,
                  workAddress: data.baseInfo.workAddress,
                  address: data.baseInfo.address,
                  offtenAddress: data.baseInfo.offtenAddress
                };
              }
              break;
            default:
              this.isBaseInfo = true; //显示基础信息
              this.isWorkInfo = true; //显示职务信息
              if (data.baseInfo) {
                this.personInfo = {
                  name: data.baseInfo.name,
                  idCard: data.baseInfo.idCard,
                  sex: data.baseInfo.sex,
                  birthday: data.baseInfo.birthday,
                  nation: data.baseInfo.nation,
                  telphone: data.baseInfo.telphone,
                  email: data.baseInfo.email,
                  trueAddress: data.baseInfo.trueAddress
                };
                this.workInfo = {
                  name: data.workInfo.name,
                  court: data.workInfo.court,
                  judgeType: data.workInfo.judgeType,
                  telephone: data.workInfo.telephone,
                  identity: data.workInfo.identity
                };
              }
              break;
          }
        }
      });
    }
  }
};
</script>

<style>
</style>

