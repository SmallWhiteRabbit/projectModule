import ant from 'ant-design-vue/es/locale/zh_CN'
import youibot from 'youibot-plus/lib/locale/lang/zh-cn'
export default {
  ...ant,
  ...youibot,
  system: {
    changePsw: '修改密码',
    loginOut: '退出登录',
    search: '搜索',
    clear: '清空',
    export: '导出',
    import: '导入',
    edit: '编辑',
    del: '删除',
    add: '新增',
    show: '显示',
    hide: '隐藏',
    options: '操作',
    success: '成功',
    fail: '失败',
    status: '状态',
    createTime: '创建时间',
    yes: '是',
    no: '否',
    saveSuccess: '保存成功',
    remark: '备注',
    hint: '提示',
    all: '全部',
    operationSuccess: '操作成功',
    fileTypeErr: '文件格式不正确',
    templateDownload: '模板下载',
    exportBatch: '批量导入',
    order: '序号',
    addTo: '继续追加',
    remove: '移除',
    reset: '重置'
  },
  message: {
    placeholder: '请输入',
    delTips: '确定删除该数据？',
    Tips: '提示',
    ok: '确认',
    cancel: '取消',
    submit: '提交',
    normal: '正常',
    stop: '停用',
    delete: '删除',
    codeFormatErr: '编号只能为字母或数字或两者的组合',
    phoneFormatErr: '电话输入有误',
    emailFormatErr: '邮箱输入有误',
    ipFormatErr: 'ip输入有误',
    portFormatErr: 'port输入有误',
    nameErr: '名称不能为空',
    placeholderErr: '内容不能为空',
    selectPlaceholderErr: '选择不能为空',
    passwordErr: '密码必须由8到30个字母和数字组成',
    passwordNotSame: '两次输入密码不同'
  },
  Login: {
    tip: '登录您的帐号',
    login: '登录',
    userName: '用户名',
    password: '密码',
    noUserName: '请输入用户名',
    noPassword: '请输入密码',
    loginErr: '用户名或者密码不正确，登录失败！',
    loginAuto: '下次自动登录',
    forgetPsw: '忘记密码',
    oldPassword: '旧密码',
    newPassword: '新密码',
    confirmPassword: '确认密码'
  },
  menu: {
    system: {
      setting: '系统设置',
      tool: '系统工具',
      menu: '菜单管理',
      parameter: '参数管理',
      dict: '字典管理',
      schedule: '定时任务',
      monitor: '系统监控',
      logLogin: '登录日志',
      logOperate: '操作日志',
      version: '系统版本',
      exceptionDict: '异常字典',
      operatManual: '操作手册',
      config: '系统配置',
      systemParams: '系统参数',
      mechanism: '机构层级',
      station: '岗位配置',
      role: '角色配置',
      user: '用户管理',
      main: '主目录'
    },
    business: {
      config: '业务配置',
      factory: '工厂层级',
      deviceParams: '设备参数',
      deviceAccount: '设备台账',
      IOTParams: 'IOT参数',
      AgvConfig: 'AGV配置',
      storageParams: '仓储参数',
      vehicleInfo: '载具信息',
      materialInfo: '物料信息',
      elementGroup: '要素分组',
      pointPriority: '点位优先级',
      main: '主目录'
    },
    task: {
      manage: '任务管理',
      taskList: '任务清单',
      taskApart: '任务拆解',
      defineTemplate: '定义模板',
      manualOrder: '人工下单',
      processArrange: '流程编排'
    },
    monitor: {
      config: '业务监控',
      statisticalKanban: '统计看板',
      task: '任务监控',
      taskHistory: '任务历史查询',
      taskRealTime: '任务实时监控',
      AGVOperate: 'AGV运行监控',
      AGVTask: 'AGV任务监控',
      WMS: 'WMS监控',
      expection: '异常监控',
      interface: '接口监控'
    }
  },
  // 菜单管理
  menuManage: {
    name: '菜单名称',
    main: '主目录',
    url: '菜单地址',
    component: '组件名称',
    parentName: '上级菜单',
    menuName: '菜单名称',
    menuType: '菜单类型',
    menu: '菜单',
    btn: '按钮',
    orderNum: '排序',
    path: '地址',
    visible: '菜单状态',
    icon: '图标'
  },
  roleManage: {
    roleName: '角色名称',
    dataRights: '数据权限',
    menuRights: '菜单权限'
  },
  // 用户管理
  userManage: {
    account: '用户名',
    name: '用户名称',
    mechanism: '归属机构',
    job: '岗位',
    email: '邮箱地址',
    phone: '手机号码',
    role: '角色'
  },
  // 机构层级
  mechanism: {
    parentName: '上级机构',
    deptName: '机构名称',
    orderNum: '排序'
  },
  station: {
    stationCode: '岗位编码',
    stationName: '岗位名称',
    stationType: '岗位分类',
    stationDesc: '岗位描述'
  },
  //系统参数
  systemParams: {
    loginLogo: '登录页LOGO',
    name: '系统名称',
    loginErrorTimes: '系统登录错误次数设置',
    tips: '温馨提示：如需修改登录页品牌标签，请按照尺寸上传图片',
    revise: '修改',
    pc: 'PC端',
    pda: 'Pda 端',
    curName: '当前名称',
    curTime: '当前次数',
    pleaseEnterSystemName: '请输入系统名称',
    PleaseEnterCurrentNumber: '请输入当前次数'
  },
  //系统监控：登录日志
  loginLog: {
    serialNumber: '序号',
    loginAddress: '登录地址',
    loginName: '登录名称',
    institutionalEnquiry: '请选择上级机构',
    loginStatus: '登录状态',
    loginLocation: '登录地点',
    ownedCompany: '所属公司',
    browser: '浏览器',
    operateSystem: '操作系统',
    operateInfo: '操作信息',
    loginTime: '登录时间',
    operate: '操作',
    loginLog: '登录日志'
  },
  //系统监控：操作日志
  operateLog: {
    sysModule: '系统模块',
    operateType: '操作类型',
    operateMemeber: '操作人员',
    companyName: '公司名称',
    hostIp: '主机',
    operateAddress: '操作地点',
    operateStatus: '操作状态',
    operateTime: '操作时间',
    responseTime: '响应时间',
    operate: '操作',
    operateDetail: '详细',
    delete: '删除',
    mobile: '手机端',
    pc: 'pc端',
    other: '其他',
    normal: '正常',
    unnormal: '异常',
    operateLog: '操作日志'
  },
  //系统监控：系统版本
  version: {
    downCurrentVersion: '下载当前版本',
    uploadNewVersion: '上传新版本',
    upLoad: '上传',
    changeLog: '更新内容',
    systemName: '系统名称',
    updateDate: '更新日期',
    versionName: '系统版本'
  },
  //系统监控：异常字典
  errorDict: {
    errorCode: '异常码',
    errorInfo: '异常信息'
  },
  //系统监控：操作手册
  operatManual: {
    tabItems: {
      first: 'AGV问题',
      second: '系统操作问题',
      version: 'TMS-v4.0.0.pdf'
    }
  },
  // 系统工具
  systemTool: {
    // 参数管理
    parameter: {
      primarykey: '参数主键',
      parameterName: '参数名称',
      parametersKeyName: '参数键名',
      parametersKeyValue: '参数键值',
      builtIn: '系统内置',
      note: '备注',
      warning: '统一规范:请务必使用大写字母下划线定义.页面获取,如: ',
      Y: '是',
      N: '否'
    }
  },

  // 字典管理
  dictManage: {
    serial: '序号',
    dictionaryKeys: '字典主键',
    dictionaryName: '字典名称',
    dictionaryType: '字典类型',
    builtIn: '系统内置',
    warning: '统一规范 请务必使用小写字母下划线定义 页面获取,如: ',
    dictionaryKeysValue: '字典键值',
    Y: '是',
    N: '否',
    status: {
      0: '正常',
      1: '停用'
    }
  },
  // 定时任务
  schedule: {
    serial: '序号',
    taskNumber: '任务编号',
    taskName: '任务名称',
    taskGroup: '任务分组',
    callingTargetString: '调用目标字符串',
    executeExpression: '执行表达式',
    nextExecutionTime: '下次执行时间',
    taskStatus: '任务状态',
    callsTarget: '调用目标',
    planningStrategy: '计划策略',
    isConcurrently: '是否允许并发进行',
    cronExecutesExpressions: 'Cron执行表达式',
    immediateExecution: '立即执行',
    once: '执行一次',
    givePerform: '放弃执行',
    allow: '允许',
    ban: '禁止',
    normal: '正常',
    suspend: '暂停',
    statusConfirm: {
      0: '确认要禁用任务吗？',
      1: '确认要启用任务吗？'
    },
    executePrompt: '确认要立即执行一次任务吗？'
  },
  // 工厂层级
  factory: {
    name: '名称',
    level: '层级',
    createTime: '创建时间',
    downLoad: '下载模板',
    batchImport: '批量导入',
    queryCount: '查询内容',
    parentName: '上级工厂',
    businessName: '工厂名称',
    businessLevel: '工厂层级',
    fleetMapName: '地图编号'
  },
  materialInfo: {
    name: '物料名称',
    brand: '品牌',
    model: '型号',
    specification: '规格',
    code: '识别码',
    amount: '数量',
    manufacturer: '生产厂家'
  },
  vehicleInfo: {
    type: '载具类型',
    model: '型号',
    specification: '规格',
    code: '编码',
    bottomCode: '识别码',
    manufacturer: '生产厂家'
  },
  deviceAccount: {
    name: '设备名称',
    describe: '设备描述',
    model: '设备型号',
    manufacturer: '生产厂家',
    specification: '设备规格',
    installDate: '安装日期',
    location: '地理位置',
    wayPoint: '导航点配置',
    wayPointName: '导航点名称',
    point: '导航点设置',
    materialPort: '料口编号',
    pointDesc: '点位说明',
    wayPointTitle: '导航点配置'
  },
  IOTParams: {
    name: '设备名称',
    describe: '设备描述',
    model: '控制器型号',
    macUrl: 'MAC地址',
    ip: 'IP地址',
    port: '端口',
    agreement: '设备协议',
    dataList: '数据列表',
    dataListTitle: '设备数据采集',
    index: '序号',
    code: '信号编码',
    dataType: '数据类型',
    dataId: '数据标识',
    signalDesc: '信号描述'
  },
  //agv配置
  AgvConfig: {
    contentInput: '请输入查询内容',
    agvNum: 'AGV编号',
    model: '型号',
    BoxType: '箱位类型',
    bosNum: '箱位数量',
    ipAred: 'IP地址',
    agvBoxNum: 'AGV箱体数量',
    agvPosition: '地理位置',
    remarks: '备注',
    Fleet: 'Fleet同步',
    synchroFinish: 'Fleet同步完成'
  },
  //要素分组
  elementGroup: {
    name: '分组名称',
    descriptors: '分组描述',
    position: '地理位置',
    binding: '设备绑定',
    warehouseBinding: '仓储/货位绑定',
    agvType: 'AGV类型',
    agvBinding: 'AGV绑定'
  },
  // 仓储参数
  storageParams: {
    warehouseCode: '仓库编号',
    warehouseName: '仓库名称',
    location: '位置',
    reservoirCode: '库区编号',
    reservoirName: '库区名称',
    storageCode: '储区编号',
    storageAmount: '储位数量',
    storageNum: '储位可用数量',
    storageModel: '储区形式',
    specification: '储区规格',
    cellEdit: '储位编辑',
    cellCode: '储位编号',
    guide: '导航点',
    actionCode: '动作编号',
    cellSignal: '传感器信号',
    cellAttr: '属性',
    cellStatus: '状态',
    cellRemark: '备注',
    layer: '层',
    column: '行',
    row: '列'
  }
}
