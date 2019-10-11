<template>
  <div class="ownInfo">
    <div class="bookbuilding-table">
      <Row>
        <Col span="24" class="noemalTb th-header">XX银行</Col>
      </Row>
      <Card>
        <Row class="topline-border right-border">
          <Col span="3" class="noemalTb tb-head textCenter">当事人类型</Col>
          <Col span="3" class="noemalTb">
            <Select transfer style="width:100%">
              <Option value="自然人" label="自然人">
                <span>自然人</span>
              </Option>
              <Option value="法人" label="法人">
                <span>法人</span>
              </Option>
            </Select>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">名称</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">当事人证件</Col>
          <Col span="3" class="noemalTb">
            <Select transfer style="width:100%">
              <Option value="身份证" label="身份证">
                <span>营业执照</span>
              </Option>
              <Option value="执照" label="执照">
                <span>身份证</span>
              </Option>
            </Select>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">当事人证件号码</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="3" class="noemalTb tb-head textCenter">法定代表人</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">法定代表人身份证件</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">法定代表人身份证件</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">法定代表人手机号码</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="3" class="noemalTb tb-head textCenter">单位固定电话</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">单位电子邮箱</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">其他联系人</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">其他联系人手机</Col>
          <Col span="3" class="noemalTb textCenter">
            <span></span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="3" class="noemalTb tb-head textCenter">注册地址</Col>
          <Col span="9" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">地址备注信息</Col>
          <Col span="9" class="noemalTb textCenter">
            <span></span>
          </Col>
        </Row>
        <Row class="right-border">
          <Col span="3" class="noemalTb tb-head textCenter">经营地址</Col>
          <Col span="9" class="noemalTb textCenter">
            <span></span>
          </Col>
          <Col span="3" class="noemalTb tb-head textCenter">地址备注信息</Col>
          <Col span="9" class="noemalTb textCenter">
            <span></span>
          </Col>
        </Row>
        <div class="textCenter editBtnDiv">
          <Button type="primary" shape="circle" class="editBtn">编辑</Button>
          <Button type="error" shape="circle" class="delBtn">删除</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    };
  }
};
</script>

<style>
</style>

