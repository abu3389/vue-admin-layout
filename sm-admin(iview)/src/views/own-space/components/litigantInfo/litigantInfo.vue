<template>
  <div class="dbSet-reviewsCase fde" style="height:100%">
    <Row>
        <Col span="24" style="min-height:100%">
            <Card style="min-height:95%" class="">     
                <Row class="operation" style="margin-bottom:15px;">
                    <span class="addDepartment" @click="showConfirmPlantBox('add')">
                      <Icon type="plus-circled" color="#4873C5" size="25"></Icon>
                      <span>添加当事人信息</span>
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
            <!-- 原告信息模态框 -->
            <Modal v-model="confirmPlantBox.show" :mask-closable="false" width="600">
              <p slot="header" style="color:black;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>{{confirmPlantBox.title}}</span>
              </p>
              <div style="text-align:center">
                <Form :label-width="80" class="box_form">
                  <FormItem label="当事人类型" :label-width="80" class="reg_groupSelect2">
                    <span v-for="(item,index) in confirmPlantBox.confirmPlantTypeList" :key='index' 
                    :class="{'reg_chooseFocus':confirmPlantBox.nowType==item.value}" @click="typeChangeTab(item.value)">{{item.name}}</span>
                  </FormItem>
                </Form>
                <!-- 自然人 -->
                <Form v-show="confirmPlantBox.nowType=='自然人'" :label-width="120" class="box_form" :model="natureList" :rules="natureRule" :ref="'自然人'">
                  <FormItem label="姓名" prop="name" >
                      <Input v-model="natureList.name" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="公民身份证号" prop="identityCard" >
                      <Input v-model="natureList.identityCard" placeholder="必填" clearable @on-change="plant_autoFillId(natureList,'自然人')"></Input>
                  </FormItem>
                  <FormItem label="出生日期" prop="litigantBirthday">
                    <DatePicker
                    type="date"
                    :editable="false"
                    placeholder="请选择出生年月"
                    :clearable="false"
                    format="yyyy年MM月dd日"
                    style="width: 100%"
                    :value="natureList.litigantBirthday"
                    @on-change="ft_plant_chgBirth($event,natureList)"></DatePicker>
                  </FormItem>
                  <FormItem label="性别"  prop="litigantSex" class="sexType">
                    <RadioGroup v-model="natureList.litigantSex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="民族" prop="litigantNation">
                    <Select
                      v-model="natureList.litigantNation"
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
                    <FormItem label="户籍地址" prop="litigantPermanentAddress">
                      <Input v-model="natureList.litigantPermanentAddress" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="常住地址" prop="address">
                      <Input v-model="natureList.address" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="文书送达地址" prop="serviceAddress">
                      <Input v-model="natureList.serviceAddress" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="手机号" prop="phone">
                      <Input v-model="natureList.phone" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="电子邮箱" prop="email">
                      <Input v-model="natureList.email" placeholder="选填" clearable></Input>
                  </FormItem>
                  <!-- <FormItem label="个人身份证明文件" class="ft_form ft-plant-upload" prop="businessLicense">
                      <Upload multiple action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'个人身份证明文件',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件(按住Ctrl支持多选)</Button>
                      </Upload>
                  </FormItem> -->
                  <FormItem label="个人身份证明文件" class="ft_form zh-plant-upload" prop="businessLicenseUp">
                      <Input v-model="natureList.businessLicenseUp" placeholder="选填" clearable></Input>
                      <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'个人身份证明文件',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                          <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                      </Upload>
                  </FormItem>
                  <FormItem class="sexType">
                      <div v-for="item in confirmPlantBox.businessFileName"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"个人身份证明文件")'>删除</a></div>
                  </FormItem>
                </Form>
                <!-- 法人 -->
                <Form v-show="confirmPlantBox.nowType=='法人'" :label-width="120" class="box_form" :model="legealList" :rules="legalRule" :ref="'法人'">
                  <FormItem label="名称" prop="name">
                      <Input v-model="legealList.name" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="社会统一信用代码" prop="identityCard">
                      <Input v-model="legealList.identityCard" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="注册地址" prop="address">
                      <Input v-model="legealList.address" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="经营地址" prop="address">
                      <Input v-model="legealList.address1" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="文书送达地址" prop="serviceAddress">
                      <Input v-model="legealList.serviceAddress" placeholder="必填" clearable></Input>
                  </FormItem>
                  <!-- <FormItem label="单位证明文件" class="ft_form ft-plant-upload" prop="businessLicense">
                      <Upload multiple action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'单位证明文件（法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件(按住Ctrl支持多选)</Button>
                      </Upload>
                  </FormItem> -->
                  <FormItem label="单位证明文件" class="ft_form zh-plant-upload" prop="businessLicenseUp1">
                      <Input v-model="legealList.businessLicenseUp1"></Input>
                      <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'单位证明文件（法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                          <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                      </Upload>
                  </FormItem>
                  <FormItem class="sexType">
                      <div v-for="item in confirmPlantBox.businessFileName1"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"单位证明文件（法人）",1)'>删除</a></div>
                  </FormItem>
                  <FormItem label="单位固定电话" prop="phone">
                      <Input v-model="legealList.phone" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="单位电子邮箱" prop="email">
                      <Input v-model="legealList.email" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="法定代表人" prop="legalManName">
                      <Input v-model="legealList.legalManName" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="法定代表人职务" prop="legalDuty">
                      <Input v-model="legealList.legalDuty" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="法定代表人手机号" prop="legalManPhone">
                      <Input v-model="legealList.legalManPhone" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="法定代表人身份证号码" prop="legalManId">
                      <Input v-model="legealList.legalManId" placeholder="选填" clearable></Input>
                  </FormItem>
                  <!-- <FormItem label="法定代表人身份证明文件" class="ft_form ft-plant-upload" prop="legalIdentity">
                      <Upload multiple action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'法定代表人身份证明文件（法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline"  style="width:100%">选择文件(按住Ctrl支持多选)</Button>
                      </Upload>
                  </FormItem> -->
                  <FormItem label="法定代表人身份证明文件" class="ft_form zh-plant-upload" prop="businessLicenseUp2">
                      <Input v-model="legealList.businessLicenseUp2"></Input>
                      <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'法定代表人身份证明文件（法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline"  style="width:100%">选择文件</Button>
                          <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                      </Upload>
                  </FormItem>
                  <FormItem class="sexType">
                      <div v-for="item in confirmPlantBox.businessFileName2"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"法定代表人身份证明文件（法人）")'>删除</a></div>
                  </FormItem>
                </Form>
                <!-- 非法人 -->
                <Form v-show="confirmPlantBox.nowType=='非法人组织'" :label-width="120" class="box_form" :model="notlegealList" :rules="nolegalRule" :ref="'非法人组织'">
                  <FormItem label="名称" prop="name">
                      <Input v-model="notlegealList.name" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="社会统一信用代码" prop="identityCard">
                      <Input v-model="notlegealList.identityCard" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="注册地址" prop="address">
                      <Input v-model="notlegealList.address" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="经营地址" prop="address">
                      <Input v-model="notlegealList.address1" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="文书送达地址" prop="serviceAddress">
                      <Input v-model="notlegealList.serviceAddress" placeholder="必填" clearable></Input>
                  </FormItem>
                  <!-- <FormItem label="单位证明文件" class="ft_form ft-plant-upload" prop="businessLicense">
                      <Upload multiple action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button"  :show-upload-list="false":on-success="plant_uploadSuccess" :data="{fileType:'单位证明文件（非法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件(按住Ctrl支持多选)</Button>
                      </Upload>
                  </FormItem> -->
                  <FormItem label="单位证明文件" class="ft_form zh-plant-upload" prop="businessLicenseUp1">
                      <Input v-model="notlegealList.businessLicenseUp1"></Input>
                      <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'单位证明文件（非法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                          <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                      </Upload>
                  </FormItem>
                  <FormItem class="sexType">
                      <div v-for="item in confirmPlantBox.businessFileName3"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"单位证明文件（非法人）",1)'>删除</a></div>
                  </FormItem>
                  <FormItem label="单位固定电话" prop="phone">
                      <Input v-model="notlegealList.phone" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="单位电子邮箱" prop="email">
                      <Input v-model="notlegealList.email" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="负责人" prop="legalManName">
                      <Input v-model="notlegealList.legalManName" placeholder="必填" clearable></Input>
                  </FormItem>
                  <FormItem label="负责人职务" prop="legalDuty">
                      <Input v-model="legealList.legalDuty" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="负责人手机号" prop="legalManPhone">
                      <Input v-model="notlegealList.legalManPhone" placeholder="选填" clearable></Input>
                  </FormItem>
                  <FormItem label="负责人身份证号码" prop="legalManId">
                      <Input v-model="notlegealList.legalManId" placeholder="选填" clearable></Input>
                  </FormItem>
                  <!-- <FormItem label="负责人身份证明文件" class="ft_form ft-plant-upload" prop="legalIdentity">
                      <Upload multiple action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'负责人身份证明文件（非法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件(按住Ctrl支持多选)</Button>
                      </Upload>
                  </FormItem> -->
                  <FormItem label="负责人身份证明文件" class="ft_form zh-plant-upload" prop="businessLicenseUp2">
                      <Input v-model="notlegealList.businessLicenseUp2"></Input>
                      <Upload action="/api/court/case/upScanning.jhtml" class="ft-plant-upload-button" :show-upload-list="false" :on-success="plant_uploadSuccess" :data="{fileType:'负责人身份证明文件（非法人）',id:confirmPlantBox.plantiffId}">
                          <Button type="ghost" icon="ios-cloud-upload-outline" style="width:100%">选择文件</Button>
                          <span>请上传*.jpg/png/bmp/pdf后缀格式的文件</span>
                      </Upload>
                  </FormItem>
                  <FormItem class="sexType">
                      <div v-for="item in confirmPlantBox.businessFileName4"><span style="padding:0 10px">{{item}}</span><a @click='delFile(item,"负责人身份证明文件（非法人）")'>删除</a></div>
                  </FormItem>
                </Form>
              </div>
              <div slot="footer">
                  <Button v-show='confirmPlantBox.nowState=="add"' style="background-color:#4873C5;color:white" size="large" long :loading="confirmPlantBox.addLoading" @click="editConfirmPlantInfo('save','add')">{{confirmPlantBox.footerBtn1}}</Button>
                  <Button v-show='confirmPlantBox.nowState=="edit"' style="background-color:#4873C5;color:white" size="large" :loading="confirmPlantBox.editLoading" @click="editConfirmPlantInfo('save','edit')">{{confirmPlantBox.footerBtn2}}</Button>
              </div>
            </Modal>
        </Col>
    </Row>
  </div>
</template>

<script>
import litigantInfo from './litigantInfo.js';
import nation from "@/api/nations.js";
import {tools_transDate,tools_resetObjectKeys,tools_calcIdentiyInfo,deepClone,getFileName}  from '@/libs/tools.js';
import { getLitigantInfo,backLitigantInfo,updateLitigantInfo,addLitigant,delLawyerInfo,deleteAll} from '@/api/setcase.js' //提交事件
export default {
  name: "litigantInfo",
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
          width: 100,
          align: "center"
        },
        {
          title: "当事人类型",
          key: "organizationType",
          align: "center"
        },
        {
          title: "社会统一信用代码/身份证",
          align: "center",
          render: (h, params) => {
            switch(params.row.organizationType){
              case "自然人":
                return h('span',params.row.idcard);
              break;
              case "法人":
              case "非法人组织":
                return h('span',params.row.legalIdCard);                
              break;
            }
          }
        },
        {
          title: "注册地址/文书送达地址",
          key: "identity",
          width: 180,
          align: "center",
          render: (h, params) => {
            let data=params.row;
            switch(data.organizationType){
              case "自然人":
                for(let value of data.personAddresss){
                  if(value.addressType=="送达地址"){
                    return h('span',value.address);
                  }
                }    
              break;
              case "法人":
              case "非法人组织":
                for(let value of data.personAddresss){
                  if(value.addressType=="注册地址"){
                    return h('span',value.address);
                  }
                }       
              break;
            }
          }
        },
        {
          title: "联系电话",
          key: "phone",
          width: 130,
          align: "center",
          render: (h, params) => {
            let data=params.row;
            switch(data.organizationType){
              case "自然人":
                for(let value of data.personPhone){
                  if(value.phoneType=="手机"){
                    return h('span',value.phone);
                  }
                }    
              break;
              case "法人":
              case "非法人组织":
                for(let value of data.personPhone){
                  if(value.phoneType=="固话"){
                    return h('span',value.phone);
                  }
                }       
              break;
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
                          this.showConfirmPlantBox('edit',params.row.id)
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
      natureList:deepClone(litigantInfo.natureList),// 自然人数据
      legealList:deepClone(litigantInfo.legealList),// 法人数据
      notlegealList:deepClone(litigantInfo.notlegealList),// 非法人数据
      natureRule:litigantInfo.naRule, //自然人表单规则
      legalRule:litigantInfo.legalRule, //法人表单规则
      nolegalRule:litigantInfo.nolegalRule, //非法人表单规则
      confirmPlantBox:{//当事人信息模态框
        show:false,
        title:"",
        addLoading:false,//增加按钮加载状态
        editLoading:false,//修改按钮加载状态
        nosaveLoading:false,//仅保存按钮加载状态
        footerBtn1:"添加",
        footerBtn2:"修改",
        confirmPlantTypeList:[
          {name:'自然人',value:'自然人'},
          {name:'法人',value:'法人'},
          {name:'非法人组织',value:'非法人组织'}
        ],
        nowType:'自然人',
        nowState:"",
        businessFileName:[],//个人身份证明文件名称（自然人）
        businessFileName1:[],//单位证明文件名称（法人）
        businessFileName2:[],//法定代表人身份证明文件名称（法人）
        businessFileName3:[],//单位证明文件名称（非法人）
        businessFileName4:[],//法定代表人身份证明文件（非法人）
        plantiffId:"plant_0",//原告ID标识
        nowId:"",//当前对应的当事人ID
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
    changeSelect(e){//表格选择事件
      this.selectList = e;
      this.selectCount = e.length;
      console.log(e);
    },
    handleDropdown(name){
      this.getNowPageContent();
    },
    getNowPageContent(){//获取当事人信息
      this.loading=true;
      getLitigantInfo().then(res=>{
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
    showConfirmPlantBox(type,id){//显示常用当事人窗体
      this.confirmPlantBox.nowState=type;
      this.confirmPlantBox.nowId=id;
      this.confirmPlantBox.show=true;
      this.clearConfirmPlantFrom();//清空表单
      this.confirmPlantBox.confirmPlantTypeList.forEach(item => {//重置表单提示
        this.resetField(item.value)
      });

      switch(type){
        case 'add':
          this.confirmPlantBox.title='添加常用当事人';
        break;
        case 'edit':
          this.confirmPlantBox.title='查看/修改常用当事人';
          //回填该当事人信息
          backLitigantInfo({id:this.confirmPlantBox.nowId}).then(res=>{
            console.log(res)
            if(res.data.state==100){
              let data=res.data.data;
              //匹配当事人类型
              this.confirmPlantBox.nowType=data.organizationType;
              switch(data.organizationType){
                case "自然人":
                  this.natureList.name=data.name;
                  this.natureList.identityCard=data.idcard;
                  this.natureList.litigantBirthday=data.birthday;
                  this.natureList.litigantSex=data.sex;
                  this.natureList.litigantNation=data.nation;
                  this.natureList.addressList=data.personAddresss;
                  this.natureList.phoneList=data.personPhone;
                  for(let value of data.personAddresss){
                    switch(value.addressType){
                      case "户籍地址":
                        this.natureList.litigantPermanentAddress= value.address;
                      break;
                      case "经常居住地址":
                        this.natureList.address= value.address;
                      break;
                      case "送达地址":
                        this.natureList.serviceAddress= value.address;
                      break;
                    }
                  }
                  for(let value of data.personPhone){
                    if(value.phoneType=="手机"){
                      this.natureList.phone=value.phone;
                      break;
                    }
                  }
                  this.natureList.email=data.email;
                  // this.natureList.businessLicense.push=data.provePath;  // 获取多个身份证明文件，后期需要数组文件改为这个
                  this.natureList.businessLicense.push(data.provePath);  // 获取单个身份证明文件
                  this.natureList.businessLicenseUp='hasUp';
                  for(let value of this.natureList.businessLicense){//获取文件名
                    let fileName=getFileName(value)
                    if(fileName!=''){
                      this.confirmPlantBox.businessFileName.push(fileName);
                    }
                  }
                break;
                case "法人":
                  this.legealList.name=data.name;
                  this.legealList.identityCard=data.idcard;
                  this.legealList.addressList=data.personAddresss;
                  this.legealList.phoneList=data.personPhone;
                  for(let value of data.personAddresss){
                    switch(value.addressType){
                      case "注册地址":
                        this.legealList.address= value.address// 注册地址
                      break;
                      case "经营地址":
                        this.legealList.address1= value.address// 经营地址
                      break;
                      case "送达地址":
                        this.legealList.serviceAddress= value.address;//送达地址
                      break;
                    }
                  }
                  // this.legealList.businessLicense.push=data.provePath;  // 获取多个单位证明文件，后期需要数组文件改为这个
                  this.legealList.businessLicense.push(data.provePath);  // 获取单个单位证明文件
                  this.legealList.businessLicenseUp1='hasUp';
                  for(let value of this.legealList.businessLicense){//获取文件名
                    let fileName=getFileName(value)
                    if(fileName!=''){
                      this.confirmPlantBox.businessFileName1.push(fileName);
                    }
                  }
                  for(let value of data.personPhone){
                    if(value.phoneType=="固话"){
                      this.legealList.phone=value.phone;
                      break;
                    }
                  }
                  this.legealList.email=data.email, // 单位电子邮箱
                  this.legealList.legalManName= data.legalName // 法定代表人
                  this.legealList.legalDuty=data.legalDuty; // 法定代表人职务
                  this.legealList.legalManPhone= data.legalPhone // 法定代表人手机号
                  this.legealList.legalManId= data.legalIdCard // 法定代表人身份证号码
                  // this.legealList.legalIdentity.push=data.idcardPath;  // 获取多个法定代表人身份证明文件，后期需要数组文件改为这个
                  this.legealList.legalIdentity.push(data.idcardPath);  // 获取单个法定代表人身份证明文件
                  this.legealList.businessLicenseUp2='hasUp';
                  for(let value of this.legealList.legalIdentity){//获取文件名
                    let fileName=getFileName(value)
                    if(fileName!=''){
                      this.confirmPlantBox.businessFileName2.push(getFileName(value));
                    }
                  }
                break;
                case "非法人组织":
                  this.notlegealList.name=data.name;
                  this.notlegealList.identityCard=data.idcard;
                  this.notlegealList.addressList=data.personAddresss;
                  this.notlegealList.phoneList=data.personPhone;
                  for(let value of data.personAddresss){
                    switch(value.addressType){
                      case "注册地址":
                        this.notlegealList.address= value.address// 注册地址
                      break;
                      case "经营地址":
                        this.notlegealList.address1= value.address// 经营地址
                      break;
                      case "送达地址":
                        this.notlegealList.serviceAddress= value.address;//送达地址
                      break;
                    }
                  }
                  // this.notlegealList.businessLicense.push=data.provePath;  // 获取多个单位证明文件，后期需要数组文件改为这个
                  this.notlegealList.businessLicense.push(data.provePath);  // 获取单个单位证明文件
                  this.notlegealList.businessLicenseUp1='hasUp';
                  for(let value of this.notlegealList.businessLicense){//获取文件名
                    let fileName=getFileName(value)
                    if(fileName!=''){
                      this.confirmPlantBox.businessFileName3.push(getFileName(value));
                    }
                  }
                  for(let value of data.personPhone){
                    if(value.phoneType=="固话"){
                      this.notlegealList.phone=value.phone;
                      break;
                    }
                  }
                  this.notlegealList.email=data.email, // 单位电子邮箱
                  this.notlegealList.legalManName= data.legalName // 法定代表人
                  this.notlegealList.legalDuty=data.legalDuty;// 负责人职务
                  this.notlegealList.legalManPhone= data.legalPhone // 法定代表人手机号
                  this.notlegealList.legalManId= data.legalIdCard // 法定代表人身份证号码
                  // this.notlegealList.legalIdentity.push=data.idcardPath;  // 获取多个法定代表人身份证明文件，后期需要数组文件改为这个
                  this.notlegealList.legalIdentity.push(data.idcardPath);  // 获取单个法定代表人身份证明文件
                  this.notlegealList.businessLicenseUp2='hasUp';
                  for(let value of this.notlegealList.legalIdentity){//获取文件名
                    let fileName=getFileName(value)
                    if(fileName!=''){
                      this.confirmPlantBox.businessFileName4.push(getFileName(value));
                    }
                  }
                break;
              }
            }else{

            }
          })
        break;
      }
    },
    editConfirmPlantInfo(type,state){//添加/修改常用当事人
      switch(type){
        case "save":
          console.log(this.confirmPlantBox.nowId)
          switch (this.confirmPlantBox.nowType) {
            case "自然人":
              var sendData=deepClone(this.natureList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                 switch(value.addressType){
                    case "户籍地址":
                      value.address=this.natureList.litigantPermanentAddress;
                    break;
                    case "经常居住地址":
                      value.address=this.natureList.address;
                    break;
                    case "送达地址":
                      value.address=this.natureList.serviceAddress;
                    break;
                 }
              }
              //获取电话列表（后端编辑需要）
              for(let value of sendData.phoneList){
                 switch(value.phoneType){
                    case "手机":
                      value.phone=this.natureList.phone;
                    break;
                 }
              }
              //目前只取一个文件，后期需要数组文件可删
              sendData.businessLicense=sendData.businessLicense.length > 0 ? sendData.businessLicense[0] : '';
              console.log(sendData)
            break;
            case "法人":
              var sendData=deepClone(this.legealList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                 switch(value.addressType){
                    case "注册地址":
                      value.address=this.legealList.address;
                    break;
                    case "经营地址":
                      value.address=this.legealList.address1;
                    break;
                    case "送达地址":
                      value.address=this.legealList.serviceAddress;
                    break;
                 }
              }
              //获取电话列表（后端编辑需要）
              console.log(sendData.phoneList)
              for(let value of sendData.phoneList){
                 switch(value.phoneType){
                    case "固话":
                      value.phone=this.legealList.phone;
                    break;
                 }
              }
              //目前只取一个文件，后期需要数组文件可删
              sendData.businessLicense=sendData.businessLicense.length > 0 ? sendData.businessLicense[0] : '';
              sendData.legalIdentity=sendData.legalIdentity.length > 0 ? sendData.legalIdentity[0] : '';
              console.log(sendData)
            break;
            case "非法人组织":
             console.log(this.notlegealList)
              var sendData=deepClone(this.notlegealList);
              //获取地址列表（后端编辑需要）
              for(let value of sendData.addressList){
                 switch(value.addressType){
                    case "注册地址":
                      value.address=this.notlegealList.address;
                    break;
                    case "经营地址":
                      value.address=this.notlegealList.address1;
                    break;
                    case "送达地址":
                      value.address=this.notlegealList.serviceAddress;
                    break;
                 }
              }
              //获取电话列表（后端编辑需要）
              for(let value of sendData.phoneList){
                 switch(value.phoneType){
                    case "固话":
                      value.phone=this.notlegealList.phone;
                    break;
                 }
              }
              //目前只取一个文件，后期需要数组文件可删
              sendData.businessLicense=sendData.businessLicense.length > 0 ? sendData.businessLicense[0] : '';
              sendData.legalIdentity=sendData.legalIdentity.length > 0 ? sendData.legalIdentity[0] : '';
              console.log(sendData)
            break;
          }
          let name=this.confirmPlantBox.nowType;
          console.log(name)
          switch(state){
            case "edit"://修改当事人信息
              //表单验证
              this.$refs[name].validate((valid) => {
                  if (valid) {
                    //当事人id
                    sendData.id=this.confirmPlantBox.nowId;
                    //设置状态
                    this.confirmPlantBox.editLoading=true;
                    updateLitigantInfo(sendData).then(res=>{
                      if(res.data.state==100){
                        this.$Message.success(res.data.message);
                        this.getNowPageContent();//刷新
                      }else{
                        this.$Message.error(res.data.message);
                      }
                      this.confirmPlantBox.editLoading=false;
                    });
                  } else {
                    this.$Message.error('请填写完整信息!');
                  }
              })
            break;
            case "add"://增加当事人信息
              //表单验证
              this.$refs[name].validate((valid) => {
                  if (valid) {
                    //设置状态
                    this.confirmPlantBox.addLoading=true;
                    addLitigant(sendData).then(res=>{
                      if(res.data.state==100){
                        this.$Message.success(res.data.message);
                        this.getNowPageContent();//刷新
                        this.confirmPlantBox.show=false;
                      }else{
                        this.$Message.error(res.data.message);
                      }
                      this.confirmPlantBox.addLoading=false;
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
          content: '是否删除该当事人?',
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
    typeChangeTab(type){//选择当事人类型
      this.confirmPlantBox.nowType=type;
    },
    //上传文件
    plant_uploadSuccess (res) {
      if(res.state === 100) {
        this.$Message.success(res.message);
        let data=res.data.result[0];
        switch(data.fileType){
           case "个人身份证明文件":
           console.log(this.natureList.businessLicense,this.confirmPlantBox.businessFileName)
              this.natureList.businessLicense=[];//后期需要数组文件可删
              this.confirmPlantBox.businessFileName=[];//后期需要数组文件可删
              this.natureList.businessLicense.push(data.filePath);
              this.confirmPlantBox.businessFileName.push(data.fileName);
              this.natureList.businessLicenseUp='hasUp';
              console.log(this.natureList.businessLicense,this.confirmPlantBox.businessFileName)
           break;
           case "单位证明文件（法人）":
              this.legealList.businessLicense=[];//后期需要数组文件可删
              this.confirmPlantBox.businessFileName1=[];//后期需要数组文件可删
              this.legealList.businessLicense.push(data.filePath);
              this.confirmPlantBox.businessFileName1.push(data.fileName);
              this.legealList.businessLicenseUp1='hasUp';
              console.log(this.legealList.businessLicense,this.confirmPlantBox.businessFileName1)
           break;
           case "法定代表人身份证明文件（法人）":
              this.legealList.legalIdentity=[];//后期需要数组文件可删
              this.confirmPlantBox.businessFileName2=[];//后期需要数组文件可删
              this.legealList.legalIdentity.push(data.filePath);
              this.confirmPlantBox.businessFileName2.push(data.fileName);
              this.legealList.businessLicenseUp2='hasUp';
              console.log(this.legealList.legalIdentity,this.confirmPlantBox.businessFileName2)
           break;
           case "单位证明文件（非法人）":
              this.notlegealList.businessLicense=[];//后期需要数组文件可删
              this.confirmPlantBox.businessFileName3=[];//后期需要数组文件可删
              this.notlegealList.businessLicense.push(data.filePath);
              this.confirmPlantBox.businessFileName3.push(data.fileName);
              this.notlegealList.businessLicenseUp1='hasUp';
              console.log(this.notlegealList.businessLicense,this.confirmPlantBox.businessFileName3)
           break;
           case "负责人身份证明文件（非法人）":
              this.notlegealList.legalIdentity=[];//后期需要数组文件可删
              this.confirmPlantBox.businessFileName4=[];//后期需要数组文件可删
              this.notlegealList.legalIdentity.push(data.filePath);
              this.confirmPlantBox.businessFileName4.push(data.fileName);
              this.notlegealList.businessLicenseUp2='hasUp';
              console.log(this.notlegealList.legalIdentity,this.confirmPlantBox.businessFileName4)
           break;
        }
      }else{
        this.$Message.error(res.message);
      }
    },
    //添加时，删除文件
    delFile(name,type){
      switch(type){
        case "个人身份证明文件":
          this.confirmPlantBox.businessFileName.forEach((item,index) => {
            if(item==name){
              this.confirmPlantBox.businessFileName.splice(index,1);
              this.natureList.businessLicense.splice(index,1);
              this.natureList.businessLicenseUp='';
              console.log(this.natureList.businessLicense)
            }
          })
        break;
        case "单位证明文件（法人）":
          this.confirmPlantBox.businessFileName1.forEach((item,index) => {
            if(item==name){
              this.confirmPlantBox.businessFileName1.splice(index,1);
              this.legealList.businessLicense.splice(index,1);
              this.legealList.businessLicenseUp1='';
              console.log(this.legealList.businessLicense)
            }
          })
        break;
        case "法定代表人身份证明文件（法人）":
          this.confirmPlantBox.businessFileName2.forEach((item,index) => {
            if(item==name){
              this.confirmPlantBox.businessFileName2.splice(index,1);
              this.legealList.legalIdentity.splice(index,1);
              this.legealList.businessLicenseUp2='';
              console.log(this.legealList.legalIdentity)
            }
          })
        break;
        case "单位证明文件（非法人）":
          this.confirmPlantBox.businessFileName3.forEach((item,index) => {
            if(item==name){
              this.confirmPlantBox.businessFileName3.splice(index,1);
              this.notlegealList.businessLicense.splice(index,1);
              this.notlegealList.businessLicenseUp1='';
              console.log(this.notlegealList.businessLicense)
            }
          })
        break;
        case "负责人身份证明文件（非法人）":
          this.confirmPlantBox.businessFileName4.forEach((item,index) => {
            if(item==name){
              this.confirmPlantBox.businessFileName4.splice(index,1);
              this.notlegealList.legalIdentity.splice(index,1);
              this.notlegealList.businessLicenseUp2='';
              console.log(this.notlegealList.legalIdentity)
            }
          })
        break;
      }
    },
    // 当事人计算出生年月和日期
    plant_autoFillId (data,name) {
      let obj =   tools_calcIdentiyInfo(data.identityCard);
      data.litigantSex = obj.sex;
      data.litigantBirthday = obj.birth;
      return false;
      this.$refs[name].validateField('identityCard',(res)=>{
        if(res == '') {
          let obj =   tools_calcIdentiyInfo(data.identityCard);
          data.litigantSex = obj.sex;
          data.litigantBirthday = obj.birth;
        }
      })
    },
    //当事人获取日期
    ft_plant_chgBirth (event,data) {
      let plantBirthTemp = tools_transDate(event);
      data.litigantBirthday = plantBirthTemp;
    },
    //清空当事人表单
    clearConfirmPlantFrom(){
      this.natureList=deepClone(litigantInfo.natureList);// 自然人数据
      this.legealList=deepClone(litigantInfo.legealList);// 法人数据
      this.notlegealList=deepClone(litigantInfo.notlegealList);// 非法人数据
      this.confirmPlantBox.businessFileName=[];//个人身份证明文件名称（自然人）
      this.confirmPlantBox.businessFileName1=[];//单位证明文件名称（法人）
      this.confirmPlantBox.businessFileName2=[];//法定代表人身份证明文件名称（法人）
      this.confirmPlantBox.businessFileName3=[];//单位证明文件名称（非法人）
      this.confirmPlantBox.businessFileName4=[];//法定代表人身份证明文件（非法人）
    },
    //重置表单提示
    resetField(refsName){
      this.$refs [refsName].fields.forEach(function (e) {
        e.resetField()
      })
    },
    //行点击事件
    rowClick(data,index){
      this.$refs.table.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中）
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
  },
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




