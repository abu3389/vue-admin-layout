///////////////////////////原告代理人对象//////////////////////////
// 律师数据
const lawyerList = {
  agentType: '律师', // 代理人类型
  agPlantId: 'agent_0', // 原告代理人ID标识
  agPlant: [], // 原告委托人
  agentMail:'', // 代理人邮箱地址
  agentName: '', // 代理人姓名
  agentIdentiCard: '', // 身份证号
  empowerType:'一般授权',//授权类型
  lawyerType:'执业律师',//律师执业资格
  lawerNum: '', // 律师执业证号
  agentMobile: '', // 手机号
  agentAddress: '', // 联系人地址
  lawFirmLetter: [], // 律所函
  lawerCardUrl: [], // 律师执业证
  commission: [], // 委托书
  lawFirm:'', //律师所（住处）
  addressList:[],//地址列表
  phoneList:[],//电话列表
}

// 职工数据
const workerList = {
  agentType: '职工', // 代理人类型
  agPlantId: 'agent_0', // 原告代理人ID标识
  agentName: '', // 代理人姓名
  agentIdentiCard: '', // 身份证号
  birthday:'',//出生日期
  nation:'',//民族
  sex:'',//性别
  agentAddress: '', //户籍地址
  agentAddress1:'',//经常居住地址
  agentMobile:'',//手机号
  agentMail:'', // 代理人邮箱地址
  addressList:[],//地址列表
  phoneList:[],//电话列表
}

//公民数据
const citizenList = {
  agentType: '公民', // 代理人类型
  agPlantId: 'agent_0', // 原告代理人ID标识
  agentName: '', // 代理人姓名
  agentIdentiCard: '', // 身份证号
  birthday:'',//出生日期
  nation:'',//民族
  sex:'',//性别
  agentAddress: '', //户籍地址
  agentAddress1:'',//经常居住地址
  agentMobile:'',//手机号
  agentMail:'', // 代理人邮箱地址
  litigatRelation:'',//与委托人关系
  addressList:[],//地址列表
  phoneList:[],//电话列表
}

// 律师表单验规则
const lawyerRule = {
  agentName: [
    { required: true, message: '请输入代理人姓名', trigger: 'blur' }
  ],
  agentIdentiCard: [
    { required: true, message: '请输入代理人身份证号', trigger: 'blur' },
    { type: 'string', pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配', trigger: 'blur' }
  ],
  lawyerType:[
    { required: true, message: '请选择律师执业资格', trigger: 'blur' },
  ],
  empowerType:[
    { required: true, message: '请选择律授权类型', trigger: 'blur' },
  ],
  lawerNum: [
    { message: '请输入律师执业证号', trigger: 'blur' }
  ],
  agentMobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { type: 'string', pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'change' }
  ],
  agentAddress: [
    { required: true, message: '请输入联系人地址', trigger: 'blur' }
  ],
  lawFirm: [
    { required: true,message: '请输入律师所或住处名称', trigger: 'blur' }
  ],
  businessLicenseUp1: [
    { message: '请上传律师函扫描件', trigger: 'change' }
  ],
  businessLicenseUp2: [
    { message: '请上传律师扫描证件', trigger: 'change' }
  ],
  businessLicenseUp3: [
    { type: 'string', message: '请上传委托书', trigger: 'change' }
  ],
  agentMail: [
    { message: '请输入代理人邮箱地址', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9](\.[a-z]{1,})+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ],
}

// 职工表单验规则
const workerRule = {
  agentName: [
    { required: true, message: '请输入代理人姓名', trigger: 'blur' }
  ],
  agentIdentiCard: [
    { required: true, message: '请输入代理人身份证号', trigger: 'blur' },
    { type: 'string', pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配', trigger: 'blur' }
  ],
  birthday: [
    { message: '请选择出生日期', trigger: 'change' }
  ],
  nation: [
    { required: true, message: '请输入民族', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  agentAddress: [
    { required: true, message: '请输入户籍地址', trigger: 'blur' }
  ],
  agentAddress1: [
    { required: true, message: '请输入经常居住地址', trigger: 'blur' }
  ],
  agentMobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { type: 'string', pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'change' }
  ],
  agentMail: [
    { message: '请输入代理人邮箱地址', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9](\.[a-z]{1,})+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

// 公民表单验规则
const citizenRule = {
  agentName: [
    { required: true, message: '请输入代理人姓名', trigger: 'blur' }
  ],
  agentIdentiCard: [
    { required: true, message: '请输入代理人身份证号', trigger: 'blur' },
    { type: 'string', pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/, message: '身份证不匹配', trigger: 'blur' }
  ],
  birthday: [
    { message: '请选择出生日期', trigger: 'change' }
  ],
  nation: [
    { required: true, message: '请输入民族', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  agentAddress: [
    { required: true, message: '请输入户籍地址', trigger: 'blur' }
  ],
  agentAddress1: [
    { required: true, message: '请输入经常居住地址', trigger: 'blur' }
  ],
  agentMobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { type: 'string', pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'change' }
  ],
  agentMail: [
    { message: '请输入代理人邮箱地址', trigger: 'blur' },
    { type: 'string', pattern: /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9](\.[a-z]{1,})+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ],
  litigatRelation: [
    { message: '请输入与委托人关系', trigger: 'blur' }
  ]
}

const agentInfo = {
  lawyerList,
  lawyerRule,
  workerList,
  workerRule,
  citizenList,
  citizenRule
}
export default agentInfo