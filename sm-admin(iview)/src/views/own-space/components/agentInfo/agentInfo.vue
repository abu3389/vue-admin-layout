<template>
  <div class="dbSet-reviewsCase fde" style="height:100%">
    <Row>
        <Col span="24" style="min-height:100%">
            <Card style="min-height:95%" class="">     
                <Row class="operation" style="margin-bottom:15px;">
                    <span class="addDepartment" @click="showAgentBox('add')">
                      <Icon type="plus-circled" color="#4873C5" size="25"></Icon>
                      <span>添加代理人信息</span>
                    </span>
                    <Dropdown  class="dropMenu"  @on-click="handleDropdown">
                      <Button size='large' type="primary">
                        更多操作
                        <Icon type="ios-arrow-down"></Icon>
                      </Button>
                      <DropdownMenu size='large' slot="list">
                        <DropdownItem size='large' name="refresh">刷新</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button class="dropMenu" size='large' type="error" @click="delSlect">批量删除</Button>
                </Row>
                <Row>
                    <Alert show-icon>
                        已选择 <span class="select-count">{{selectCount}}</span> 项
                        <a class="select-clear" @click="clearSelectAll">清空</a>
                    </Alert>
                </Row>
                <Row class="tables">
                    <Table size="small" stripe style="min-height:350px" :loading="loading" border :columns="columns" :data="tableData" @on-row-click="rowClick" ref="table" sortable="custom"  @on-selection-change="changeSelect"></Table>
                </Row>
                <!-- <Row type="flex" justify="end" class="page" style="margin-top:10px;height:30px;">
                    <Page :current="pageData.pageNumber" :total="pageData.total" :page-size="pageData.pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement='top' :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                </Row> -->
            </Card>

            <!-- 原告代理人信息模态框 -->
            <Modal v-model="agPlantBox.show" :mask-closable="false" width="600">
              <p slot="header" style="color:black;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>{{agPlantBox.title}}</span>
              </p>
              <div style="text-align:center">
                <Form :label-width="80" class="box_form">
                  <FormItem label="代理人类型" :label-width="80" class="reg_groupSelect2">
                    <span v-for="(item,index) in agPlantBox.agentTypeList" :key='index' :class="{'reg_chooseFocus':agPlantBox.nowType==item.value}" @click="typeChangeTab(item.value)">{{item.name}}</span>
                  </FormItem>
                </Form>

                <!-- 律师类型 -->
                <Form v-show="agPlantBox.nowType=='律师'" :label-width="120" class="box_form" :model="lawyerList" :rules="lawyerRule" :ref="'律师'">
                    <FormItem label="姓名" prop="agentName">
                        <Input v-model="lawyerList.agentName" placeholder="请输入姓名"></Input>
                    </FormItem>

                    <FormItem label="公民身份证号" prop="agentIdentiCard">
                      <Input v-model="lawyerList.agentIdentiCard" placeholder="请输入公民身份证号"></Input>
                    </FormItem>

                    <FormItem label="律师执业资格" prop="lawyerType">
                      <div class="reg_groupSelect2">
                        <div style="text-align:left">
                          <span v-for="(item,index) in agPlantBox.lawyerTypeList" :key='index' :class="{'reg_chooseFocus':agPlantBox.lawyerType==item}" @click="typeChangeTab4(item)">{{item}}</span>
                        </div>
                      </div>
                    </FormItem>

                    <FormItem label="授权类型" prop="empowerType">
                      <div class="reg_groupSelect2">
                        <div style="text-align:left">
                          <span v-for="(item,index) in agPlantBox.empowerTypeList" :key='index' :class="{'reg_chooseFocus':agPlantBox.empowerType==item}" @click="typeChangeTab5(item)">{{item}}</span>
                        </div>
                      </div>
                    </FormItem>

                    <FormItem label="律师执业证号" prop="lawerNum">
                        <Input v-model="lawyerList.lawerNum" placeholder="请输入律师执业证号"></Input>
                    </FormItem>

                    <FormItem label="手机号" prop="agentMobile">
                        <Input v-model="lawyerList.agentMobile" placeholder="请输入手机号"></Input>
                    </FormItem>

                    <FormItem label="联系地址" prop="agentAddress">
                        <Input v-model="lawyerList.agentAddress" placeholder="请输入联系地址"></Input>
                    </FormItem>

                    <FormItem label="邮箱地址" prop="agentMail">
                        <Input v-model="lawyerList.agentMail" placeholder="请输入代理人邮箱地址"></Input>
                    </FormItem>

                    <FormItem label="律所名称/住处" prop="lawFirm">
                        <Input v-model="lawyerList.lawFirm" placeholder="请输入律师所,普通用户请填写住处名称"></Input>
                    </FormItem>

                    <!-- <FormItem label="律所函" class="ft_form zh-plant-upload" prop="businessLicenseUp1">
                        <Input v-model="lawyerList.businessLicenseUp1"></Input>
                        <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'律所函',id:agPlantBox.plantiffId}">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem class="sexType">
                        <div v-for="item in agPlantBox.businessFileName"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"律所函")'>删除</a></div>
                    </FormItem> -->

                    <FormItem label="律师执业证" class="ft_form zh-plant-upload" prop="businessLicenseUp2">
                        <Input v-model="lawyerList.businessLicenseUp2"></Input>
                        <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'律师执业证',id:agPlantBox.plantiffId}">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                            <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                        </Upload>
                    </FormItem>
                    <FormItem class="sexType">
                        <div v-for="item in agPlantBox.businessFileName1"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"律师执业证")'>删除</a></div>
                    </FormItem>

                    <!-- <FormItem label="委托书" class="ft_form zh-plant-upload" prop="businessLicenseUp3">
                        <Input v-model="lawyerList.businessLicenseUp3"></Input>
                        <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'委托书',id:agPlantBox.plantiffId}">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem class="sexType">
                        <div v-for="item in agPlantBox.businessFileName2"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"委托书")'>删除</a></div>
                    </FormItem> -->
                </Form>

                <!-- 职工类型 -->
                <Form v-show="agPlantBox.nowType=='职工'" :label-width="120" class="box_form" :model="workerList" :rules="workerRule" :ref="'职工'">
                    <FormItem label="姓名" prop="agentName">
                        <Input v-model="workerList.agentName" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="公民身份证号" prop="agentIdentiCard" >
                        <Input v-model="workerList.agentIdentiCard" placeholder="必填" clearable @on-change="plant_autoFillId(workerList,'职工')"></Input>
                    </FormItem>
                    <FormItem label="出生日期" prop="birthday">
                      <DatePicker
                      type="date"
                      :editable="false"
                      placeholder="请选择出生年月"
                      :clearable="false"
                      format="yyyy年MM月dd日"
                      style="width: 100%"
                      :value="workerList.birthday"
                      @on-change="ft_plant_chgBirth($event,workerList)"></DatePicker>
                    </FormItem>
                    <FormItem label="性别"  prop="sex" class="sexType">
                      <RadioGroup v-model="workerList.sex">
                          <Radio label="男">男</Radio>
                          <Radio label="女">女</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="民族" prop="nation">
                      <Select
                        v-model="workerList.nation"
                        placeholder="请选择民族"
                        clearable
                        filterable
                      >
                        <Option
                          v-for="(item,index) in nationAry"
                          :value="item.name"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="户籍地址" prop="agentAddress">
                        <Input v-model="workerList.agentAddress" placeholder="请输入户籍地址"></Input>
                    </FormItem>
                    <FormItem label="常住地址" prop="agentAddress1">
                        <Input v-model="workerList.agentAddress1" placeholder="请输入常住地址"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="agentMobile">
                        <Input v-model="workerList.agentMobile" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="邮箱地址" prop="agentMail">
                        <Input v-model="workerList.agentMail" placeholder="请输入邮箱地址"></Input>
                    </FormItem>
                </Form>


                <!-- 公民类型 -->
                <Form v-show="agPlantBox.nowType=='公民'" :label-width="120" class="box_form" :model="citizenList" :rules="citizenRule" :ref="'公民'">
                    <FormItem label="姓名" prop="agentName">
                        <Input v-model="citizenList.agentName" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="公民身份证号" prop="agentIdentiCard" >
                        <Input v-model="citizenList.agentIdentiCard" placeholder="必填" clearable @on-change="plant_autoFillId(citizenList,'公民')"></Input>
                    </FormItem>
                    <FormItem label="出生日期" prop="birthday">
                      <DatePicker
                      type="date"
                      :editable="false"
                      placeholder="请选择出生年月"
                      :clearable="false"
                      format="yyyy年MM月dd日"
                      style="width: 100%"
                      :value="citizenList.birthday"
                      @on-change="ft_plant_chgBirth($event,citizenList)"></DatePicker>
                    </FormItem>
                    <FormItem label="性别"  prop="sex" class="sexType">
                      <RadioGroup v-model="citizenList.sex">
                          <Radio label="男">男</Radio>
                          <Radio label="女">女</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="民族" prop="nation">
                      <Select
                        v-model="citizenList.nation"
                        placeholder="请选择民族"
                        clearable
                        filterable
                      >
                        <Option
                          v-for="(item,index) in nationAry"
                          :value="item.name"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="户籍地址" prop="agentAddress">
                        <Input v-model="citizenList.agentAddress" placeholder="请输入户籍地址"></Input>
                    </FormItem>
                    <FormItem label="常住地址" prop="agentAddress1">
                        <Input v-model="citizenList.agentAddress1" placeholder="请输入常住地址"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="agentMobile">
                        <Input v-model="citizenList.agentMobile" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="邮箱地址" prop="agentMail">
                        <Input v-model="citizenList.agentMail" placeholder="请输入邮箱地址"></Input>
                    </FormItem>
                    <FormItem label="与委托人关系" prop="litigatRelation">
                        <Input v-model="citizenList.litigatRelation" placeholder="请输入与委托人关系"></Input>
                    </FormItem>
                </Form>
              </div>
              <div slot="footer">
                  <Button v-show='agPlantBox.nowState=="add"' style="background-color:#4873C5;color:white" size="large" long :loading="agPlantBox.addLoading" @click="editAgentInfo('save','add')">{{agPlantBox.footerBtn1}}</Button>
                  <Button v-show='agPlantBox.nowState=="edit"' style="background-color:#4873C5;color:white" size="large" :loading="agPlantBox.editLoading" @click="editAgentInfo('save','edit')">{{agPlantBox.footerBtn2}}</Button>
              </div>
            </Modal>
        </Col>
    </Row>
  </div>
</template>

<script>
import agentInfo from './agentInfo.js';
import nation from "@/api/nations.js";
import {tools_transDate,tools_resetObjectKeys,tools_calcIdentiyInfo,deepClone,getFileName}  from '@/libs/tools.js';
import {getLawyerInfo,backLawyerInfo,updateLawyerInfo,adddLawyer,delLawyerInfo,deleteAll} from '@/api/setcase.js' //提交事件
export default {
  name: "agentInfo",
  components: {

  },
  data() {
    return {
      loading:false,
      selectList:[],  //选择的数据
      selectCount:0,   //选择数量
      nationAry:nation,//民族列表
      pageData: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span',params.index + (this.pageData.pageNumber- 1) * this.pageData.pageSize + 1);
          }
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "代理人类型",
          key: "agentType",
          align: "center"
        },
        {
          title: "公民身份证号",
          key: "idcard",
          align: "center",
        },
        {
          title: "律师执业资格",
          key: "lawyerType",
          align: "center",
          render: (h, params) => {
            return h('span',params.row.lawyerType ? params.row.lawyerType : "无");  
          }
        },
        {
          title: "授权类型",
          key: "empowerType",
          align: "center",
          render: (h, params) => {
            return h('span',params.row.empowerType ? params.row.empowerType : "无");  
          }
        },
        {
          title: "律师执业证号",
          key: "lawerNum",
          align: "center",
          render: (h, params) => {
            return h('span',params.row.lawerNum ? params.row.lawerNum : "无");  
          }
        },
        {
          title: "代理人手机号",
          key: "phone",
          width: 130,
          align: "center",
          render: (h, params) => {
            let data=params.row;
            for(let value of data.personPhone){
              if(value.phoneType=="手机"){
                return h('span',value.phone);
              }
            }    
          }
        },
        {
          title: "操作",
          key: "",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                          this.stopPropagation()//阻止事件冒泡
                          this.showAgentBox('edit',params.row.id)
                        }
                    }
                }, '查看/修改'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                          this.stopPropagation()//阻止事件冒泡
                          this.removeInfo(params.row.id)
                        }
                    }
                }, '删除')
            ]);
          }
        },
      ],
      tableData: [],
      lawyerList:deepClone(agentInfo.lawyerList),// 律师数据
      lawyerRule:agentInfo.lawyerRule,// 律师表单规则
      workerList:deepClone(agentInfo.workerList),// 职工数据
      workerRule:agentInfo.workerRule,// 职工表单规则
      citizenList:deepClone(agentInfo.citizenList),// 公民数据
      citizenRule:agentInfo.citizenRule,// 公民表单规则
      agPlantBox:{//代理人信息模态框
        show:false,
        title:"",
        addLoading:false,//增加按钮加载状态
        editLoading:false,//修改按钮加载状态
        nosaveLoading:false,//仅保存按钮加载状态
        footerBtn1:"添加",
        footerBtn2:"修改",
        agentTypeList:[
          {name: '律师', value: '律师'},
          {name: '职工', value: '职工'},
          {name: '公民', value: '公民'}
        ],
        lawyerTypeList:["执业律师","实习律师"],
        lawyerType:"执业律师",
        nowState:"",
        empowerTypeList:["一般授权","特别授权"],
        empowerType:"一般授权",
        businessFileName:[],//律所函文件名称
        businessFileName1:[],//律师执业证文件名称
        businessFileName2:[],//委托书文件名称
        agPlantId: 'agent_0', // 原告代理人ID标识
        nowId:"",//当前对应的代理人ID
        nowType:'律师',//当前对应的代理人类型
      },
    };
  },
  methods: {
    pageChange(pageNum) {//页码改变
      this.pageData.pageNumber = pageNum;
      this.getNowPageContent();
    },
    pageSizeChange(pageSize) {//页码大小改变
      this.pageData.pageSize = pageSize;
      this.getNowPageContent();
    },
    changeSelect(e){
      this.selectList = e;
      this.selectCount = e.length;
    },
    handleDropdown(name){
      this.getNowPageContent();
    },
    getNowPageContent(){//获取代理人信息
      this.loading=true;
      getLawyerInfo().then(res=>{//代理人
        console.log(res);
        this.loading=false;
        if(res.data.state==100){
          let data = res.data.data;
          this.tableData = data;
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
    showAgentBox(type,id){//显示常用代理人窗体
      this.agPlantBox.nowState=type;
      this.agPlantBox.nowId=id;
      this.agPlantBox.show=true;
      this.clearAgentFrom();//清空代理人表单
      this.agPlantBox.agentTypeList.forEach((item,index) => {//重置表单提示
        this.resetField(item.value)
      });
      switch(type){
        case 'add':
          this.agPlantBox.title='添加常用代理人';
        break;
        case 'edit':
          this.agPlantBox.title='查看/修改常用代理人';
          //回填代理人信息
          backLawyerInfo({id:this.agPlantBox.nowId}).then(res=>{
            if(res.data.state==100){
                let data=res.data.data;
                this.agPlantBox.nowType=data.agentType;
                switch (data.agentType) {
                  case "律师":
                    this.lawyerList.agentName=data.name;
                    this.lawyerList.agentIdentiCard=data.idcard;
                    this.agPlantBox.lawyerType=data.lawyerType;
                    this.agPlantBox.empowerType=data.empowerType;
                    this.lawyerList.lawerNum=data.lawerNum;
                    this.lawyerList.addressList=data.personAddresss;
                    this.lawyerList.phoneList=data.personPhone;
                    for(let value of data.personPhone){
                      if(value.phoneType=="手机"){
                        this.lawyerList.agentMobile=value.phone;
                        break;
                      }
                    }
                    for(let value of data.personAddresss){
                      if(value.addressType=="工作地址"){
                        this.lawyerList.agentAddress=value.address;
                        break;
                      }
                    }
                    this.lawyerList.agentMail=data.email;
                    this.lawyerList.lawFirm=data.lawFirm;
                    // this.lawyerList.lawFirmLetter.push=data.lawFirmLetter;  // 获取多个律师函文件，后期需要数组文件改为这个
                    this.lawyerList.lawFirmLetter.push(data.lawFirmLetter);  // 获取单个律师函文件
                    this.lawyerList.businessLicenseUp1="hasUp";
                    console.log(this.lawyerList.lawFirmLetter)
                    for(let value of this.lawyerList.lawFirmLetter){//获取文件名
                      let fileName=getFileName(value)
                      if(fileName!=''){
                        this.agPlantBox.businessFileName.push(getFileName(value));
                      }
                    }
                    // this.lawyerList.lawerCardUrl.push=data.lawerCardUrl;  // 获取多个律师执业证文件，后期需要数组文件改为这个
                    this.lawyerList.lawerCardUrl.push(data.lawerCardUrl);  // 获取单个律师执业证文件
                    this.lawyerList.businessLicenseUp2="hasUp";
                    for(let value of this.lawyerList.lawerCardUrl){//获取文件名
                      let fileName=getFileName(value)
                      if(fileName!=''){
                        this.agPlantBox.businessFileName1.push(getFileName(value));
                      }
                    }
                    // this.lawyerList.commission.push=data.commission;  // 获取多个委托书文件，后期需要数组文件改为这个
                    this.lawyerList.commission.push(data.commission);  // 获取单个委托书文件
                    this.lawyerList.businessLicenseUp3="hasUp";
                    for(let value of this.lawyerList.commission){//获取文件名
                      let fileName=getFileName(value)
                      if(fileName!=''){
                        this.agPlantBox.businessFileName2.push(getFileName(value));
                      }
                    }
                  break;
                  case "职工":
                    this.workerList.agentName=data.name;
                    this.workerList.agentIdentiCard=data.idcard;
                    this.workerList.birthday=data.birthday;
                    this.workerList.nation=data.nation;
                    this.workerList.birthday=data.birthday;
                    this.workerList.sex=data.sex;
                    this.workerList.addressList=data.personAddresss;
                    this.workerList.phoneList=data.personPhone;
                    for(let value of data.personPhone){
                      if(value.phoneType=="手机"){
                        this.workerList.agentMobile=value.phone;
                        break;
                      }
                    }
                    for(let value of data.personAddresss){
                      switch (value.addressType) {
                        case "户籍地址":
                          this.workerList.agentAddress=value.address;
                        break;
                        case "经常居住地址":
                          this.workerList.agentAddress1=value.address;
                        break;
                      }
                    }
                    this.workerList.agentMail=data.email;
                  break;
                  case "公民":
                    this.citizenList.agentName=data.name;
                    this.citizenList.agentIdentiCard=data.idcard;
                    this.citizenList.birthday=data.birthday;
                    this.citizenList.nation=data.nation;
                    this.citizenList.birthday=data.birthday;
                    this.citizenList.sex=data.sex;
                    this.citizenList.addressList=data.personAddresss;
                    this.citizenList.phoneList=data.personPhone;
                    for(let value of data.personPhone){
                      if(value.phoneType=="手机"){
                        this.citizenList.agentMobile=value.phone;
                        break;
                      }
                    }
                    for(let value of data.personAddresss){
                      switch (value.addressType) {
                        case "户籍地址":
                          this.citizenList.agentAddress=value.address;
                        break;
                        case "经常居住地址":
                          this.citizenList.agentAddress1=value.address;
                        break;
                      }
                    }
                    this.citizenList.agentMail=data.email;
                    this.citizenList.litigatRelation=data.litigatRelation;
                  break;
                }
            }else{

            }
          })
        break;
      }
    },
    editAgentInfo(type,state){//添加/修改常用代理人
      switch(type){
        case "save":
          switch(this.agPlantBox.nowType){
            case "律师":
              var sendData=deepClone(this.lawyerList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                  switch(value.addressType){
                    case "工作地址":
                      value.address=this.lawyerList.agentAddress;
                    break;
                  }
              }
              //获取电话列表（后端编辑需要）
              for(let value of sendData.phoneList){
                  switch(value.phoneType){
                    case "手机":
                      value.phone=this.lawyerList.agentMobile;
                    break;
                  }
              }
              //目前只取一个文件，后期需要数组文件可删
              sendData.lawFirmLetter=sendData.lawFirmLetter.length > 0 ? sendData.lawFirmLetter[0] : '';
              sendData.lawerCardUrl=sendData.lawerCardUrl.length > 0 ? sendData.lawerCardUrl[0] : '';
              sendData.commission=sendData.commission.length > 0 ? sendData.commission[0] : '';
              console.log(sendData)
            break;
            case "职工":
              var sendData=deepClone(this.workerList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                switch(value.addressType){
                  case "户籍地址":
                    value.address=this.workerList.agentAddress;
                  break;
                  case "经常居住地址":
                    value.address=this.workerList.agentAddress1;
                  break;
                }
              }
              //获取电话列表（后端编辑需要）
              for(let value of sendData.phoneList){
                  switch(value.phoneType){
                    case "手机":
                      value.phone=this.workerList.agentMobile;
                    break;
                  }
              }
              console.log(sendData)
            break;
            case "公民":
              var sendData=deepClone(this.citizenList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                switch(value.addressType){
                  case "户籍地址":
                    value.address=this.citizenList.agentAddress;
                  break;
                  case "经常居住地址":
                    value.address=this.citizenList.agentAddress1;
                  break;
                }
              }
              //获取电话列表（后端编辑需要）
              for(let value of sendData.phoneList){
                  switch(value.phoneType){
                    case "手机":
                      value.phone=this.citizenList.agentMobile;
                    break;
                  }
              }
              console.log(sendData)
            break;
          }

          switch(state){
            case "edit"://修改代理人信息
              //表单验证
              this.$refs[this.agPlantBox.nowType].validate((valid) => {
                  if (valid) {
                    //添加代理人id
                    sendData.id=this.agPlantBox.nowId;
                    //设置状态
                    this.agPlantBox.editLoading=true;
                    updateLawyerInfo(sendData).then(res=>{
                      if(res.data.state==100){
                        this.$Message.success(res.data.message);
                        this.getNowPageContent();//刷新
                      }else{
                        this.$Message.error(res.data.message);
                      }
                      this.agPlantBox.editLoading=false;
                    });
                  } else {
                    this.$Message.error('请填写完整信息!');
                  }
              })
            break;
            case "add"://增加代理人信息
              //表单验证
              this.$refs[this.agPlantBox.nowType].validate((valid) => {
                  if (valid) {
                    //设置状态
                    this.agPlantBox.addLoading=true;
                    adddLawyer(sendData).then(res=>{
                      if(res.data.state==100){
                        this.$Message.success(res.data.message);
                        this.getNowPageContent();//刷新
                        this.agPlantBox.show=false;
                      }else{
                        this.$Message.error(res.data.message);
                      }
                      this.agPlantBox.addLoading=false;
                    });
                  } else {
                    this.$Message.error('请填写完整信息!');
                  }
              })
            break;
          }
        break;
      }
    },
    removeInfo(id){//删除当事人
      this.$Modal.confirm({
          title: '删除确认',
          content: '是否删除该代理人?',
          onOk: () => {
            delLawyerInfo({id:id}).then(res=>{
              if(res.data.state==100){
                this.$Message.success(res.data.message);
                this.getNowPageContent();//刷新
              }else{
                this.$Message.error(res.data.message);
              }
            });
          },
          onCancel: () => {
          }
      });
    },
    typeChangeTab(type){//选择代理人类型
      this.agPlantBox.nowType=type;
    },
    delSlect(){
      if(this.selectCount>0){
        this.$Modal.confirm({
            title: '删除确认',
            content: '是否删除?',
            onOk: () => {
              let data=[];
              this.selectList.forEach((item,index) => {
                data.push({id:item.id});
              });
              deleteAll({data:data}).then(res=>{
                if(res.data.state==100){
                  this.$Message.success(res.data.message);
                  this.getNowPageContent();//刷新
                }else{
                  this.$Message.error(res.data.message);
                }
              });
            },
            onCancel: () => {
            }
        });
      }else{
        this.$Notice.warning({
            title: '请先选择要删除的当事人',
            duration: 5
        });
      }
    },
    setPageData(pageNumber, pageSize, total) {//设置分页参数
      this.pageData = {
        pageNumber,
        pageSize,
        total
      }
    },
    clearSelectAll(){
      this.$refs.table.selectAll(false);
    },
    typeChangeTab4(type){//选择律师职业资格
      this.agPlantBox.lawyerType=type;
      this.lawyerList.lawyerType=type;
    },
    typeChangeTab5(type){//选择授权类型
      this.agPlantBox.empowerType=type;
      this.lawyerList.empowerType=type;
    },
    //上传文件
    plant_uploadSuccess (res) {
      if(res.state === 100) {
        this.$Message.success(res.message);
        let data=res.data.result[0];
        switch(data.fileType){
           case "律所函":
              this.lawyerList.lawFirmLetter=[];//后期需要数组文件可删
              this.agPlantBox.businessFileName=[];//后期需要数组文件可删
              this.lawyerList.lawFirmLetter.push(data.filePath);
              this.agPlantBox.businessFileName.push(data.fileName);
              this.lawyerList.businessLicenseUp1="hasUp";
              console.log(this.lawyerList.lawFirmLetter,this.agPlantBox.businessFileName)
           break;
           case "律师执业证":
              this.lawyerList.lawerCardUrl=[];//后期需要数组文件可删
              this.agPlantBox.businessFileName1=[];//后期需要数组文件可删
              this.lawyerList.lawerCardUrl.push(data.filePath);
              this.agPlantBox.businessFileName1.push(data.fileName);
              this.lawyerList.businessLicenseUp2="hasUp";
              console.log(this.lawyerList.lawerCardUrl,this.agPlantBox.businessFileName1)
           break;
           case "委托书":
              this.lawyerList.commission=[];//后期需要数组文件可删
              this.agPlantBox.businessFileName2=[];//后期需要数组文件可删
              this.lawyerList.commission.push(data.filePath);
              this.agPlantBox.businessFileName2.push(data.fileName);
              this.lawyerList.businessLicenseUp3="hasUp";
              console.log(this.lawyerList.commission,this.agPlantBox.businessFileName2)
           break;
        }
      }else{
        this.$Message.error(res.message);
      }
    },
    //添加时，删除文件
    delFile(name,type){
      switch(type){
        case "律所函":
          this.agPlantBox.businessFileName.forEach((item,index) => {
            if(item==name){
              this.agPlantBox.businessFileName.splice(index,1);
              this.lawyerList.lawFirmLetter.splice(index,1);
              this.lawyerList.businessLicenseUp1="";
              console.log(this.lawyerList.lawFirmLetter)
            }
          })
        break;
        case "律师执业证":
          this.agPlantBox.businessFileName1.forEach((item,index) => {
            if(item==name){
              this.agPlantBox.businessFileName1.splice(index,1);
              this.lawyerList.lawerCardUrl.splice(index,1);
              this.lawyerList.businessLicenseUp2="";
              console.log(this.lawyerList.lawerCardUrl)
            }
          })
        break;
        case "委托书":
          this.agPlantBox.businessFileName2.forEach((item,index) => {
            if(item==name){
              this.agPlantBox.businessFileName2.splice(index,1);
              this.lawyerList.commission.splice(index,1);
              this.lawyerList.businessLicenseUp3="";
              console.log(this.lawyerList.commission)
            }
          })
        break;
      }
    },
    // 计算出生年月和日期
    plant_autoFillId (data,name) {
      let obj =   tools_calcIdentiyInfo(data.agentIdentiCard);
      data.sex = obj.sex;
      data.birthday = obj.birth;
      return false;
      this.$refs[name].validateField('agentIdentiCard',(res)=>{
        if(res == '') {
          let obj =   tools_calcIdentiyInfo(data.agentIdentiCard);
          data.sex = obj.sex;
          data.birthday = obj.birth;
        }
      })
    },
    //获取日期
    ft_plant_chgBirth (event,data) {
      let plantBirthTemp = tools_transDate(event);
      data.birthday = plantBirthTemp;
    },
    //清空代理人表单
    clearAgentFrom(){
      this.lawyerList=deepClone(agentInfo.lawyerList);// 代理人人数据
      this.workerList=deepClone(agentInfo.workerList);// 代理人人数据
      this.citizenList=deepClone(agentInfo.citizenList);// 代理人人数据
      this.agPlantBox.businessFileName=[];//律所函文件名称
      this.agPlantBox.businessFileName1=[];//律师执业证文件名称
      this.agPlantBox.businessFileName2=[];//委托书文件名称
    },
    //重置表单提示
    resetField(refsName){
      this.$refs [refsName].fields.forEach(function (e) {
        e.resetField()
      })
    },
    //行点击事件
    rowClick(data,index){
      this.$refs.table.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中)
    },
    //阻止事件冒泡
    stopPropagation(e) { 
      e = e || window.event; 
      if(e.stopPropagation) { //W3C阻止冒泡方法 
          e.stopPropagation(); 
      } else { 
          e.cancelBubble = true; //IE阻止冒泡方法 
      } 
    }
  }

}
</script>
<style lang="less" scoped>
.zh-plant-upload{
   .ivu-form-item-content{
      .ivu-form-item-error-tip {
        padding-top: 10px!important;
        z-index: 999;
      }
      .ivu-input-wrapper {
          visibility: hidden;
          width: 1px;
      }
   }
}
</style>
