<style lang="less">
@import "./roleManage.less";
</style>
<template>
    <div class="search fde" style="height:100%">
        <Row>
            <Col span="16" style="height:100%">
                <Card style="min-height:95%" class="">     
                    <Row class="operation">
                        <Button @click="addRole" type="primary" icon="md-add">添加角色</Button>
                        <Button @click="delAll" icon="md-trash">批量删除</Button>
                        <Button @click="init" icon="md-refresh">刷新</Button>
                        <circleLoading v-if="operationLoading"/>
                    </Row>
                     <Row>
                        <Alert show-icon>
                            已选择 <span class="select-count">{{selectCount}}</span> 项
                            <a class="select-clear" @click="clearSelectAll">清空</a>
                        </Alert>
                    </Row>
                    <Row>
                        <Table style="min-height:350px" :loading="loading" border :columns="columns" :data="data" ref="table" sortable="custom" @on-sort-change="changeSort" @on-selection-change="changeSelect"></Table>
                    </Row>
                    <Row type="flex" justify="end" class="page">
                        <Page :current="pageNumber" :total="total" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
            <Col span="7" style="margin-left:20px;height:100%">
                <Card class="trees fdee" style="height:95%">
                    <div class="topDiv">
                        <span style="float:left">{{roleName}}</span>
                        <Button @click="selectTreeAll">全选/反选</Button>
                    </div>
                    <div class="treeContent">
                        <Tree ref="tree" show-checkbox  :data="permData"  @on-check-change="changeSelectMenu"></Tree>
                        <Spin size="large" v-if="treeLoading"></Spin>
                    </div>
                    <div class="treeFooter">
                        <Button type="text" @click="cancelRole">取消</Button>
                        <Button type="primary" :disabled="roleId == ''" :loading="submitLoading" @click="editRoleAuth">提交</Button>
                    </div>
                </Card>
            </Col>
        </Row>
        <!-- 编辑 -->
        <Modal :title="modalTitle" v-model="roleModalVisible" :mask-closable='false' :width="500">
          <Form ref="roleForm" :model="roleForm" :label-width="80" :rules="roleFormValidate">
            <FormItem label="角色名称" prop="name">
              <Input v-model="roleForm.name" placeholder="角色名称"/>
            </FormItem>
            <FormItem label="角色类型" prop="type">
                <Select v-model="roleForm.type" clearable filterable style="width:100%">
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              <!-- <Input v-model="roleForm.type" placeholder="按照Spring Security约定建议以‘ROLE_’开头"/> -->
            </FormItem>
            <FormItem label="备注" prop="description">
              <Input v-model="roleForm.description"/>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" @click="cancelAdd">取消</Button>
            <Button type="primary" :loading="submitLoading" @click="submitRole">提交</Button>
          </div>
        </Modal>
        <!-- 菜单权限 -->
        <Modal :title="modalTitle" v-model="permModalVisible" :mask-closable='false' :width="500" :styles="{top: '30px'}" class="permModal">
          <Tree ref="tree" show-checkbox :data="permData"></Tree>
          <Spin size="large" v-if="treeLoading"></Spin>
          <div slot="footer">
            <Button type="text" @click="cancelPermEdit">取消</Button>
            <Button @click="selectTreeAll">全选/反选</Button>
            <Button type="primary" :loading="submitPermLoading" @click="submitPermEdit">提交</Button>
          </div>
        </Modal>
        <!-- 数据权限 -->
        <Modal :title="modalTitle" v-model="depModalVisible" :mask-closable='false' :width="500" :styles="{top: '30px'}" class="depModal">
          <Form :label-width="65" >
            <FormItem label="数据范围">
              <Select v-model="dataType">
                <Option :value="0">全部数据权限</Option>
                <Option :value="1">自定义数据权限</Option>
              </Select>
            </FormItem>
          </Form>
          <Alert show-icon>
            默认可查看全部数据，自定义数据范围请点击选择下方数据
          </Alert>
          <div v-if="dataType!=0" style="margin-top:15px">
            <Tree ref="depTree" :data="depData" :load-data="loadData" @on-toggle-expand="expandCheckDep" multiple style="margin-top:15px"></Tree>
            <Spin size="large" v-if="depTreeLoading"></Spin>
          </div>
          <div slot="footer">
            <Button type="text" @click="depModalVisible=false">取消</Button>
            <Button type="primary" :loading="submitDepLoading" @click="submitDepEdit">提交</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import {
  getRoleList,
  getRoleAuths,
  editRoleAuth,
  getAllPermissionList,
  addRole,
  editRole,
  deleteRole,
  setDefaultRole,
  editRolePerm,
  initDepartment,
  loadDepartment,
  editRoleDep
} from "@/api/sys";
import util from "@/libs/util.js";
import circleLoading from "@/components/circleLoad/circle-loading.vue";
Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  }
export default {
  name: "role-manage",
  components: {
    circleLoading
  },
  data() {
    return {
      loading: true,
      treeLoading: false,
      depTreeLoading: true,
      operationLoading: false,
      submitPermLoading: false,
      submitDepLoading: false,
      searchKey: "",
      sortColumn: "createTime",
      sortType: "desc",
      modalType: 0,
      roleModalVisible: false,
      permModalVisible: false,
      depModalVisible: false,
      roleId:"",
      roleName:"",
      modalTitle: "",
      roleForm: {
        description: ""
      },
      typeList:[
          {
            id:1,
            name:'法官'
          },
          {
            id:2,
            name:'书记员'
          },
          {
            id:3,
            name:'当事人'
          },
          {
            id:4,
            name:'陪审员'
          },
          {
            id:5,
            name:'超级管理员'
          },
          {
            id:6,
            name:'送达人员'
          },
          {
            id:7,
            name:'分配专员'
          },
          {
            id:8,
            name:'代理人'
          },
          {
            id:9,
            name:'工作人员'
          },
          {
            id:10,
            name:'庭长'
          },
      ],
      roleFormValidate: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
        // type:[{required: true, message: "角色类型不能为空", trigger: "blur"}]
      },
      submitLoading: false,
      selectList: [],
      selectCount: 0,
      innitData:[],
      menuList:[],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色名称",
          key: "name",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style:{
                      color:'#57A3F3'
                  },
                  on: {
                    click: () => {
                      this.permData = [];
                      this.menuList = [];
                      this.treeLoading = true;
                      this.roleId = params.row.id;
                      this.roleName = params.row.name;
                      getRoleAuths(params.row.id).then(res => {
                        this.treeLoading = false;
                        if(res.data.state == 100){
                          res.data.result.map(item => {
                            item.children = [];
                            item.expand = true;
                            item.isStart = item.isStart ? 1 : 0;
                            item.selected = false;
                            item.checked = item.ischeck;
                            item.title = item.title ? item.title : '无'
                          })
                          this.innitData = res.data.result;
                          res.data.result.sort(this.compare('orderNumber'))
                          this.permData = this.pushChildren(res.data.result,"");
                          console.log(this.permData)
                        }else{
                          this.$Message.info(res.data.message)
                        }
                      })
                      
                    }
                  }
                },
                params.row.name
              ),
            ]);
          }
        },
        {
          title: "角色类型",
          key: "name",
          width: 150,
          render: (h, params) => {
            return h("span", {}, params.row.roleType);
          }
        },
        {
          title: "备注",
          key: "description",
          // width: 190,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      permData: [],
      editRolePermId: "",
      selectAllFlag: false,
      depData: [],
      dataType: 0,
      editDepartments: []
    };
  },
  methods: {
    init() {
      this.getRoleList();
      // 获取所有菜单权限树
      // this.getPermList();
      // 获取一级部门数据
      // this.getParentList();
    },
    changePage(v) {
      this.pageNumber = v;
      this.getRoleList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.pageSize = v;
      this.getRoleList();
    },
    changeSort(e) {
      this.sortColumn = e.key;
      this.sortType = e.order;
      if (e.order === "normal") {
        this.sortType = "";
      }
      this.getRoleList();
    },
    getRoleList() {
      this.loading = true;
      let params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        // sort: this.sortColumn,
        // order: this.sort
      };
      getRoleList(params).then(res => {
        this.loading = false;
        if (res.data.state == 100) {
          this.data = res.data.roles;
          this.total = res.data.total;
        }else{
            this.$Message.info(res.data.message);
        }
      });
    },
    getPermList() {
      this.treeLoading = true;
      getAllPermissionList().then(res => {
        this.treeLoading = false;
        if (res.data.state == 100) {
          this.deleteDisableNode(res.result);
          this.permData = res.result;
        }
      });
    },
    // 递归标记禁用节点
    deleteDisableNode(permData) {
      let that = this;
      permData.forEach(function(e) {
        if (e.status === -1) {
          e.title = "[已禁用] " + e.title;
          e.disabled = true;
        }
        if (e.children && e.children.length > 0) {
          that.deleteDisableNode(e.children);
        }
      });
    },
    cancelRole() {
      // this.roleModalVisible = false;
      this.permData = [];
      this.roleName = '';
      this.roleId = '';
    },
    cancelAdd(){
      this.roleModalVisible = false;
    },
    editRoleAuth(){
      //获取所有选中节点
      let params = this.$refs.tree.getCheckedNodes();
      
      let allData = this.permData;
      
      //循环执行所有选中的节点链，放到arr1数组里
      let arr1 = [];
      console.log(params)
      for (let i = 0; i < params.length; i++) {
        //单条数据链
        let aData = this.getParent(allData, [], params[i].authId);//方法入口在这里
        console.log(aData)
        console.log(params[i].authId)
        for (let y = 0; y < aData.length; y++) {
          arr1.push(aData[y]);
        }
      }
      arr1 = Array.from(new Set(arr1));
      console.log(arr1)
      this.menuList = arr1;
      console.log(this.menuList.length)
      let authIds = '';
      for(let i=0;i<this.menuList.length;i++){
        if(i == this.menuList.length - 1){
          authIds = authIds + this.menuList[i].authId;
        }else{
          authIds = authIds + this.menuList[i].authId + ',';
        }
      }
      this.submitLoading = true;
      console.log(authIds)
      editRoleAuth(this.roleId,authIds).then(res => {
        this.submitLoading = false;
        if(res.data.state == 100){
          this.$Message.success('编辑成功');
        }else{
          this.$Messag.info(res.data.message);
        }
      })
    },
    submitRole() {
        if(this.roleForm.type == ''){
            this.$Message.info("请选择角色类型");
            return false
        }
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          if (this.modalType === 0) {
            // 添加
            this.submitLoading = true;
            addRole(this.roleForm).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("操作成功");
                this.getRoleList();
                this.roleModalVisible = false;
              }else{
                  this.$Message.info(res.data.message);
              }
            });
          } else {
            this.submitLoading = true;
            editRole(this.roleForm).then(res => {
              this.submitLoading = false;
              if (res.data.state == 100) {
                this.$Message.success("操作成功");
                this.getRoleList();
                this.roleModalVisible = false;
              }else{
                  this.$Message.info(res.data.message);
              }
            });
          }
        }
      });
    },
    addRole() {
      this.modalType = 0;
      this.modalTitle = "添加角色";
      this.$refs.roleForm.resetFields();
      delete this.roleForm.id;
      this.roleModalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑角色";
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let roleInfo = JSON.parse(str);
      this.roleForm = roleInfo;
      this.roleModalVisible = true;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除角色 " + v.name + " ?",
        onOk: () => {
          this.operationLoading = true;
          deleteRole(v.id).then(res => {
            this.operationLoading = false;
            if (res.data.state == 100) {
              this.$Message.success("删除成功");
              this.getRoleList();
            }
          });
        }
      });
    },
    setDefault(v) {
      this.$Modal.confirm({
        title: "确认设置",
        content: "您确认要设置所选的 " + v.name + " 为注册用户默认角色?",
        onOk: () => {
          let params = {
            id: v.id,
            isDefault: true
          };
          this.operationLoading = true;
          setDefaultRole(params).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.getRoleList();
            }
          });
        }
      });
    },
    cancelDefault(v) {
      this.$Modal.confirm({
        title: "确认取消",
        content: "您确认要取消所选的 " + v.name + " 角色为默认?",
        onOk: () => {
          let params = {
            id: v.id,
            isDefault: false
          };
          this.operationLoading = true;
          setDefaultRole(params).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.getRoleList();
            }
          });
        }
      });
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSelectMenu(v){
      
    },
    //获取整条数据链
    getParent(array, childs, ids) {
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item.authId === ids) {
          childs.push(item);
          return childs;
        }
        if (item.children && item.children.length > 0) {
          childs.push(item);
          let rs = this.getParent(item.children, childs, ids);
          if (rs) {
            return rs;
          }
          else {
            childs.remove(item);
          }
        }
      }
      return false;
    },
    //去重
    uniq(array){
        var temp = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){
            if(temp.indexOf(array[i]) == -1){
                temp.push(array[i]);
            }
        }
        return temp;
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
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
          this.operationLoading = true;
          deleteRole(ids).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.getRoleList();
            }
          });
        }
      });
    },
    editPerm(v) {
      this.editRolePermId = v.id;
      this.modalTitle = "分配 " + v.name + " 的菜单权限(点击选择)";
      // 匹配勾选
      let rolePerms = v.permissions;
      // 递归判断子节点
      this.checkPermTree(this.permData, rolePerms);
      this.permModalVisible = true;
    },
    // 递归判断子节点
    checkPermTree(permData, rolePerms) {
      let that = this;
      permData.forEach(function(p) {
        if (that.hasPerm(p, rolePerms)) {
          p.selected = true;
        } else {
          p.selected = false;
        }
        if (p.children && p.children.length > 0) {
          that.checkPermTree(p.children, rolePerms);
        }
      });
    },
    // 判断角色拥有的权限节点勾选
    hasPerm(p, rolePerms) {
      let flag = false;
      for (let i = 0; i < rolePerms.length; i++) {
        if (p.id === rolePerms[i].permissionId) {
          flag = true;
          break;
        }
      }
      if (flag) {
        return true;
      }
      return false;
    },
    // 全选反选
    selectTreeAll() {
      this.selectAllFlag = !this.selectAllFlag;
      let select = this.selectAllFlag;
      this.selectedTreeAll(this.permData, select);

    },
    selectedTreeAll(permData, select) {
      let that = this;
      permData.forEach(function(e) {
        e.checked = select;
        if (e.children && e.children.length > 0) {
          that.selectedTreeAll(e.children, select);
        }
      });
    },
    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    pushChildren(data,parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
          if (data[i].fatherCode == parent) {
              var obj = data[i];
              temp = vm.pushChildren(data, data[i].code);
              if (temp.length > 0) {
                  obj.children = temp;
                  obj.checked = false;
              }
              tree.push(obj);
          }
      }
      return tree;
      // let that = this;
      // for(let i in ary2){
      //   for(let t in ary1){
      //     if(ary2[i].fatherCode == ary1[t].code){
      //       ary1[t].children.push(ary2[i]);
      //       ary2.splice(i,1);
      //       that.pushChildren(ary1[t].children,ary2)
      //     }
      //   }
      // }
      // return ary1;
    },
    submitPermEdit() {
      this.submitPermLoading = true;
      let permIds = "";
      let selectedNodes = this.$refs.tree.getSelectedNodes();
      selectedNodes.forEach(function(e) {
        permIds += e.id + ",";
      });
      permIds = permIds.substring(0, permIds.length - 1);
      editRolePerm({
        roleId: this.editRolePermId,
        permIds: permIds
      }).then(res => {
        this.submitPermLoading = false;
        if (res.success === true) {
          this.$Message.success("操作成功");
          util.initRouter(this);
          this.getRoleList();
          this.permModalVisible = false;
        }
      });
    },
    cancelPermEdit() {
      this.permModalVisible = false;
    },
    getParentList() {
      this.depTreeLoading = true;
      initDepartment({ openDataFilter: false }).then(res => {
        this.depTreeLoading = false;
        if (res.success === true) {
          res.result.forEach(function(e) {
            e.selected = false;
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status === -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          this.depData = res.result;
        }
      });
    },
    loadData(item, callback) {
      loadDepartment(item.id, { openDataFilter: false }).then(res => {
        if (res.success === true) {
          res.result.forEach(function(e) {
            e.selected = false;
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status === -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          callback(res.result);
        }
      });
    },
    editDep(v) {
      this.dataType = 0;
      this.editRolePermId = v.id;
      this.modalTitle = "分配 " + v.name + " 的数据权限";
      if (v.dataType) {
        this.dataType = v.dataType;
      }
      // 匹配勾选
      let roleDepIds = v.departments;
      this.editDepartments = roleDepIds;
      // 判断子节点
      this.checkDepTree(this.depData, roleDepIds);
      this.depModalVisible = true;
    },
    expandCheckDep(v) {
      // 判断展开子节点
      this.checkDepTree(v.children, this.editDepartments);
    },
    // 判断子节点
    checkDepTree(depData, roleDepIds) {
      let that = this;
      depData.forEach(function(p) {
        if (that.hasDepPerm(p, roleDepIds)) {
          p.selected = true;
        } else {
          p.selected = false;
        }
      });
    },
    // 判断角色拥有的权限节点勾选
    hasDepPerm(p, roleDepIds) {
      let flag = false;
      for (let i = 0; i < roleDepIds.length; i++) {
        if (p.id === roleDepIds[i].departmentId) {
          flag = true;
          break;
        }
      }
      if (flag) {
        return true;
      }
      return false;
    },
    submitDepEdit() {
      let depIds = "";
      if (this.dataType != 0) {
        let selectedNodes = this.$refs.depTree.getSelectedNodes();
        if (selectedNodes.length < 1) {
          this.$Message.error("请至少选择一条数据");
          return;
        }
        selectedNodes.forEach(function(e) {
          depIds += e.id + ",";
        });
        depIds = depIds.substring(0, depIds.length - 1);
      }
      this.submitDepLoading = true;
      editRoleDep({
        roleId: this.editRolePermId,
        dataType: this.dataType,
        depIds: depIds
      }).then(res => {
        this.submitDepLoading = false;
        if (res.success === true) {
          this.$Message.success("操作成功");
          this.getRoleList();
          this.depModalVisible = false;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>