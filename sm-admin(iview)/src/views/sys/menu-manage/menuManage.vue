<style lang="less">
@import "./menuManage.less";
</style>
<template>
    <div class="search" style="height:100%">
        <Card style="height:90%" class="seds">
          <Row class="operation">
            <Button @click="addMenu" type="primary" icon="md-add">添加子节点</Button>
            <Button @click="addRootMenu" icon="md-add">添加一级菜单</Button>
            <Button @click="delAll" icon="md-trash">批量删除</Button>
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">刷新</DropdownItem>
                <DropdownItem name="expandOne">仅显示一级</DropdownItem>
                <DropdownItem name="expandTwo">仅展开两级</DropdownItem>
                <DropdownItem name="expandAll">展开所有</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
          <Row type="flex" justify="start" class="code-row-bg">
            <Col span="8">
              <Alert show-icon>
                当前选择编辑： <span class="select-count">{{editTitle}}</span>
                <a class="select-clear" v-if="menuForm.authId" @click="canelEdit">取消选择</a>
              </Alert>
              <Input v-model="searchKey" suffix="ios-search" @on-change="search" placeholder="输入菜单名搜索"/>
              <div class="tree-bar">
                <Tree ref="tree" :data="data" show-checkbox @on-check-change="changeSelect" @on-select-change="selectTree"></Tree>
              </div>
              <Spin size="large" fix v-if="loading"></Spin>
            </Col>
            <Col span="10">
              <Form ref="menuForm" :model="menuForm" :label-width="85" :rules="menuFormValidate">
                <FormItem label="类型" prop="type">
                  <RadioGroup v-model="menuForm.type">
                    <Radio :label="1" :disabled="isButton">
                      <Icon type="ios-list-box-outline" size="16" style="margin-bottom:3px;"></Icon>
                      <span>页面菜单</span>
                    </Radio>
                    <Radio :label="2" :disabled="isMenu">
                      <Icon type="md-log-in" size="16" style="margin-bottom:3px;"></Icon>
                      <span>操作按钮</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="标题" prop="title" >
                  <Input v-model="menuForm.title"/>
                </FormItem>
                <FormItem label="英文名" prop="name" v-if="menuForm.type===1">
                  <Input v-model="menuForm.name"/>
                </FormItem>
                <FormItem label="请求路径" prop="url" v-if="menuForm.type===2">
                  <Poptip trigger="focus" placement="right" width="230" word-wrap title="提示" content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他">
                    <Input v-model="menuForm.url"/>
                  </Poptip>
                </FormItem>
                <FormItem label="路径" prop="path" v-if="menuForm.type===1">
                  <Input v-model="menuForm.path"/>
                </FormItem>
                <FormItem label="前端组件" prop="component" v-if="menuForm.type===1">
                  <Input v-model="menuForm.component"/>
                </FormItem>
                <FormItem label="权限码" prop="code" >
                  <Input v-model="menuForm.code"/>
                </FormItem>
                <!-- <FormItem label="父级权限码"  v-if="menuForm.type===1">
                  <Input v-model="menuForm.fatherCode"/>
                </FormItem> -->
                <FormItem label="排序值" prop="sortOrder" >
                  <InputNumber :max="1000" :min="0" v-model="menuForm.orderNumber"></InputNumber>
                  <span style="margin-left:5px">值越小越靠前</span>
                </FormItem>
                <FormItem label="是否启用" prop="status">
                  <i-switch size="large" v-model="menuForm.isStart" :true-value="1" :false-value="0">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
                <Form-item>
                  <Button style="margin-right:5px" @click="submitEdit" :loading="submitLoading" type="primary" icon="ios-create-outline">修改并保存</Button>
                  <Button @click="handleReset" >重置</Button>
                </Form-item>
              </Form>
            </Col>
          </Row>
        </Card>

        <Modal draggable :title="modalTitle" v-model="menuModalVisible" :mask-closable='false' :width="500" :styles="{top: '30px'}">
          <Form ref="menuFormAdd" :model="menuFormAdd" :label-width="85" :rules="menuFormValidate">
            <div v-if="showParent">
              <FormItem label="上级节点：">
                {{parentTitle}}
              </FormItem>
            </div>
            <FormItem label="类型" prop="type" v-if="isButtonAdd == true && isMenuAdd == true">
              <RadioGroup v-model="menuFormAdd.type">
                <Radio :label="1" >
                  <Icon type="ios-list-box-outline" size="16" style="margin-bottom:3px;"></Icon>
                  <span>页面菜单</span>
                </Radio>
                <Radio :label="2" >
                  <Icon type="md-log-in" size="16" style="margin-bottom:3px;"></Icon>
                  <span>操作按钮</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="类型" prop="type" v-else>
              <RadioGroup v-model="menuFormAdd.type">
                <Radio :label="1" :disabled="isButtonAdd">
                  <Icon type="ios-list-box-outline" size="16" style="margin-bottom:3px;"></Icon>
                  <span>页面菜单</span>
                </Radio>
                <Radio :label="2" :disabled="isMenuAdd">
                  <Icon type="md-log-in" size="16" style="margin-bottom:3px;"></Icon>
                  <span>操作按钮</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            
            <FormItem label="标题" prop="title" >
              <Input v-model="menuFormAdd.title"/>
            </FormItem>
            <FormItem label="英文名" prop="name" v-if="menuFormAdd.type===1">
              <Input v-model="menuFormAdd.name"/>
            </FormItem>
            <!-- <FormItem label="标题" prop="title2" v-if="menuFormAdd.type===2">
              <Poptip trigger="focus" placement="right" width="230" word-wrap title="提示" content="操作按钮名称不得重复">
                <Input v-model="menuFormAdd.title"/>
              </Poptip>
            </FormItem> -->
            <FormItem label="路径"  v-if="menuFormAdd.type===1">
              <Input v-model="menuFormAdd.path"/>
            </FormItem>
            <FormItem label="前端组件" prop="component" v-if="menuForm.type===1 && menuFormAdd.type != 2">
                  <Input v-model="menuFormAdd.component"/>
            </FormItem>
            <FormItem label="请求路径" prop="url" v-if="menuFormAdd.type===2">
              <Poptip trigger="focus" placement="right" width="230" word-wrap title="提示" content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他">
                <Input v-model="menuFormAdd.url"/>
              </Poptip>
            </FormItem>
            <FormItem label="权限码" prop="code" >
              <Input v-model="menuFormAdd.code"/>
            </FormItem>
            <FormItem label="父级权限码" >
              <Input v-model="menuFormAdd.fatherCode" disabled/>
            </FormItem>
            
            <!-- <FormItem label="按钮权限类型" prop="buttonType" v-if="menuFormAdd.type===2">
              <Select v-model="menuFormAdd.buttonType" placeholder="请选择或输入搜索" filterable clearable>
                <Option v-for="(item, i) in optionData" :key="i" :value="item.value">{{item.title}}</Option>
              </Select>
            </FormItem> -->
            <FormItem label="排序值" prop="sortOrder">
              <InputNumber :max="1000" :min="0" v-model="menuFormAdd.orderNumber"></InputNumber>
              <span style="margin-left:5px">值越小越靠前</span>
            </FormItem>
            <FormItem label="是否启用" prop="status">
              <i-switch size="large" v-model="menuFormAdd.isStart" :true-value="1" :false-value="0">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" @click="cancelAdd">取消</Button>
            <Button type="primary" :loading="submitLoading" @click="submitAdd">提交</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import {
  getAllPermissionList,
  addRoleMenu,
  editRoleMenu,
  deletePermission,
  searchPermission,
  addAuthority,
  editAuthority,
  getAuths
} from "@/api/sys.js";
// import util from "@/libs/access.js";
export default {
  name: "menu-manage",
  data() {
    return {
      loading: true,
      expandLevel: 1,
      menuModalVisible: false,
      selectList: [],
      selectCount: 0,
      showParent: false,
      searchKey: "",
      parentTitle: "",
      isButtonAdd: false,
      isMenuAdd: false,
      isMenu: false,
      isButton: false,
      editTitle: "",
      modalTitle: "",
      menuForm: {
        id: "",
        parentId: "",
        buttonType: "",
        type: 1,
        sortOrder: null,
        level: null,
        isStart: 0,
        url: ""
      },
      menuFormAdd: {
        buttonType: ""
      },
      menuFormValidate: {
        name: [{ required: true, message: "英文名不能为空", trigger: "blur" }],
        code:[{ required: true, message: "权限码不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        title2: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        icon: [{ required: true, message: "图标不能为空", trigger: "blur" }],
        path: [{ required: true, message: "路径不能为空", trigger: "blur" }],
        url: [{ required: true, message: "路径不能为空", trigger: "blur" }],
        path2: [{ required: true, message: "路径不能为空", trigger: "blur"}],
        component:[{ required: true, message: "前端组件不能为空", trigger: "blur"}],
        sortOrder:[],
        component: [
          { required: true, message: "前端组件不能为空", trigger: "blur" }
        ]
      },
      submitLoading: false,
      data: [],
      optionData: [
        { title: "查看操作(view)", value: "view" },
        { title: "添加操作(add)", value: "add" },
        { title: "编辑操作(edit)", value: "edit" },
        { title: "删除操作(delete)", value: "delete" },
        { title: "清空操作(clear)", value: "clear" },
        { title: "启用操作(enable)", value: "enable" },
        { title: "禁用操作(disable)", value: "disable" },
        { title: "搜索操作(search)", value: "search" },
        { title: "上传文件(upload)", value: "upload" },
        { title: "导出操作(output)", value: "output" },
        { title: "导入操作(input)", value: "input" },
        { title: "分配权限(editPerm)", value: "editPerm" },
        { title: "设为默认(setDefault)", value: "setDefault" },
        { title: "其他操作(other)", value: "other" }
      ]
    };
  },
  methods: {
    init() {
      this.getAllList();
    },
    handleDropdown(name) {
      if (name === "expandOne") {
        this.expandLevel = 1;
        this.getAllList();
      } else if (name === "expandTwo") {
        this.expandLevel = 2;
        this.getAllList();
      } else if (name === "expandAll") {
        this.expandLevel = 3;

        this.getAllList();
      } else if (name === "refresh") {
        this.getAllList();
      }
    },
    getAllList() {
      this.loading = true;
      getAuths().then(res => {
        this.loading = false;
        if (res.data.state === 100) {
          // 仅展开指定级数 默认所有展开
          res.data.auths.map(item => {
            item.children = [];
            item.expand = false;
            item.isStart = item.isStart ? 1 : 0;
            item.selected = false;
            item.checked = false;
            item.title = item.title ? item.title : '无'
          })
          // this.data = this.pushChildren(ary1,ary2);
          res.data.auths.sort(this.compare('orderNumber'))
          console.log(res.data.auths)
          this.data = this.pushChildren(res.data.auths,"");
          console.log(this.data);
          //展开操作
          let expandLevel = this.expandLevel;
          this.data.forEach(function(e) {
            if(expandLevel === 1){
              if (e.level === 1) {
                e.expand = false;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level === 2) {
                    c.expand = false;
                  }
                });
              }
            }else if(expandLevel === 2){
              if (e.level === 1) {
                e.expand = true;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level === 2) {
                    c.expand = true;
                  }
                });
              }
            }else if(expandLevel === 3){
              if (e.level === 1) {
                e.expand = true;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level === 2) {
                    c.expand = true;
                  }
                  if (c.children && c.children.length > 0){
                    c.children.forEach(function(m){
                      if (m.level === 3) {
                          m.expand = true;
                        }
                    })
                  }
                });
              }
            }
          });
          this.menuForm = {
            id: "",
            parentId: "",
            buttonType: "",
            type: 1,
            sortOrder: null,
            level: null,
            isStart: 1,
            url: ""
          }
        }
      });
    },
    pushChildren(data,parent) {
      if(typeof(parent)=="null"){
        parent=''
      }
      console.log("888888",parent)
      // let that = this;
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
          if (data[i].fatherCode == parent) {
              console.log(data[i].fatherCode,parent)
              var obj = data[i];
              temp = vm.pushChildren(data, data[i].code);
              if (temp.length > 0) {
                  obj.children = temp;
              }
              tree.push(obj);
          }
      }
      return tree;
    },
    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    search() {
      if (this.searchKey) {
        this.loading = true;
        searchPermission({ title: this.searchKey }).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
          }
        });
      } else {
        this.getAllList();
      }
    },
    selectTree(v) {
      console.log(v)
      if (v.length > 0) {
        // if (Number(v[0].level) === 1 || Number(v[0].level) === 2 ) {
        //   this.isButton = false;
        //   this.isMenu = true;
        // } else {
        //   this.isButton = true;
        //   this.isMenu = false;
        // }
        if(Number(v[0].type) === 1){
          this.isButton = false;
          this.isMenu = true;
        }else{
          this.isButton = true;
          this.isMenu = false;
        }
        if (Number(v[0].isStart) === 0) {
          this.editStatus = true;
        } else {
          this.editStatus = false;
        }
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] === null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let menu = JSON.parse(str);
        this.menuForm = menu;
        this.menuFormAdd.fatherCode = this.menuForm.code;
        console.log(this.menuFormAdd.fatherCode)
        this.editTitle = menu.title;
      } else {
        this.canelEdit();
      }
    },
    canelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if(data){
        data.selected = false;
      }
      this.isMenu = false;
      this.isButton = false;
      this.$refs.menuForm.resetFields();
      delete this.menuForm.authId;
      this.editTitle = "";
    },
    cancelAdd() {
      this.menuModalVisible = false;
    },
    handleReset() {
      let type = this.menuForm.type;
      this.$refs.menuForm.resetFields();
      this.editStatus = true;
      this.menuForm.type = type;
    },
    submitEdit() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          if (!this.menuForm.authId) {
            this.$Message.warning("请先点击选择要修改的菜单节点");
            return;
          }
          this.submitLoading = true;
          if (this.menuForm.orderNumber === null) {
            this.menuForm.orderNumber = "";
          }
          if (this.menuForm.type == 2) {
            this.menuForm.name = "";
            // this.menuForm.icon = "";
            // this.menuForm.component = "";
          }
          let data = {
            authId:this.menuForm.authId,
            title:this.menuForm.title,
            name:this.menuForm.name,
            code:this.menuForm.code,
            fatherCode:this.menuForm.fatherCode,
            path:this.menuForm.path,
            orderNumber:this.menuForm.orderNumber,
            component:this.menuForm.component,
            level:this.menuForm.level,
            isStart:this.menuForm.isStart ? 1 : 0,
          }
          if(this.menuForm.type == 1){
            editRoleMenu(data).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("编辑成功");
                // util.initRouter(this);
                this.init();
                this.menuModalVisible = false;
              }else{
                this.$Message.info(res.data.message)
              }
            });
          }else{
           let datas = {
              authId:this.menuForm.authId,
              title:this.menuForm.title,
              code:this.menuForm.code,
              fatherCode:this.menuForm.fatherCode,
              url:this.menuForm.url,
              orderNumber:this.menuForm.orderNumber,
              level:this.menuForm.level,
              isStart:this.menuForm.isStart ? 1 : 0,
            }
            editAuthority(datas).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("编辑成功");
                // util.initRouter(this);
                this.init();
                this.menuModalVisible = false;
              }else{
                this.$Message.info(res.data.message)
              }
            });
          }
          
        }
      });
    },
    submitAdd() {
      this.$refs.menuFormAdd.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          if (this.menuFormAdd.sortOrder === null) {
            this.menuFormAdd.sortOrder = "";
          }
          if (this.menuFormAdd.buttonType === null) {
            this.menuFormAdd.buttonType = "";
          }
          if(!this.menuFormAdd.fatherCode){
            this.menuFormAdd.fatherCode = '';
          }
          if (this.menuFormAdd.type == 2) {
            var data = {
              title:this.menuFormAdd.title,
              code:this.menuFormAdd.code,
              fatherCode:this.menuFormAdd.fatherCode,
              url:this.menuFormAdd.url,
              orderNumber:this.menuFormAdd.orderNumber,
              level:this.menuFormAdd.level,
              isStart:this.menuFormAdd.isStart ? 1 : 0,
            }
          }
          console.log(data);
          if(!this.menuFormAdd.path){
            this.menuFormAdd.path = '';
          }
          

          if(this.menuFormAdd.type == 1){
            addRoleMenu(this.menuFormAdd).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("添加成功");
                // util.initRouter(this);
                this.init();
                this.menuModalVisible = false;
              }else{
                this.$Message.info(res.data.message);
              }
            });
          }else{
            addAuthority(data).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("添加成功");
                // util.initRouter(this);
                this.init();
                this.menuModalVisible = false;
              }else{
                this.$Message.info(res.data.message);
              }
            });
          }
          
        }
      });
    },
    addMenu() {
      if (this.menuForm.code == "" || this.menuForm.code == null) {
        this.$Message.warning("请先点击选择一个菜单权限节点");
        return;
      }
      console.log(this.menuForm)
      this.parentTitle = this.menuForm.title;
      this.modalTitle = "添加菜单权限";
      this.showParent = true;
      if (this.menuForm.type === 2) {
        this.$Modal.error({
          title: "抱歉，不能添加啦",
          content: "仅支持2级菜单目录"
        });
        return;
      } 
      if (this.menuForm.level === 4) {
        this.$Modal.error({
          title: "抱歉，不能添加啦",
          content: "无法继续添加下级目录"
        });
        return;
      } 
      let type = this.menuForm.type;
       if (this.menuForm.type === 1) {
        type = 1;
        this.isMenuAdd = true;
        this.isButtonAdd = false;
      } else if (this.menuForm.type === 2) {
        type = 2;
        this.isMenuAdd = false;
        this.isButtonAdd = true;
      }
      if(this.menuForm.level === 3){
        type = 2;
        this.isMenuAdd = false;
        this.isButtonAdd = true;
      }else if(this.menuForm.level === 1){
        type = 1;
        this.isMenuAdd = true;
        this.isButtonAdd = false;
      }else{
        if(this.menuForm.children.length == 0){
          type = 1;
          this.isMenuAdd = true;
          this.isButtonAdd = true;
        }else{
          if(this.menuForm.children[0].type == 1){  //下级是菜单
            type = 1;
            this.isMenuAdd = true;
            this.isButtonAdd = false;
          }else if(this.menuForm.children[0].type == 2){  //下级是按钮
            type = 2;
            this.isMenuAdd = false;
            this.isButtonAdd = true;
          }
        }
      }
      console.log(this.isMenuAdd)
      console.log(this.isButtonAdd)
      
      this.menuFormAdd = {
        type:type ,
        fatherCode: this.menuForm.code,
        level: Number(this.menuForm.level) + 1,
        orderNumber: 1,
        buttonType: "",
        isStart: 1
      };
      console.log(this.menuFormAdd)
      this.menuModalVisible = true;
    },
    addRootMenu() {
      this.modalTitle = "添加一级菜单(可拖动)";
      this.isMenuAdd = true;
      this.isButtonAdd = false;
      this.showParent = false;
      this.menuFormAdd = {
        type: 1,
        level: 1,
        orderNumber: 1,
        isStart: 1
      };
      this.menuModalVisible = true;
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未勾选要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deletePermission(ids).then(res => {
            if (res.success === true) {
              this.$Message.success("删除成功");
              util.initRouter(this);
              this.selectList = [];
              this.selectCount = 0;
              this.canelEdit();
              this.init();
            }
          });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>