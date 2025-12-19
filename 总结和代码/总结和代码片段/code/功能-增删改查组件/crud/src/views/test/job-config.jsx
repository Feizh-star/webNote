import { getJobStatusDict } from '@/api/job.js'

export const config = [
  {
    props: {
      type: 'selection',
      width: 60,
    },
  },
  {
    props: {
      label: "岗位编号",
      prop: "postId",
      minWidth: 180,
    },
  },
  {
    formCfg: {
      type: ['query', 'edit'],
      hidden: false,
      label: '岗位名称',
      key: 'postName',
      elFormItem: {},
      modelEventType: 'input',
      component: 'el-input',
      validator: {
        edit: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
      },
    },
    props: {
      label: "岗位名称",
      prop: "postName",
      minWidth: 180,
    },
  },
  {
    formCfg: {
      type: ['query', 'edit'],
      hidden: false,
      label: '岗位编码',
      key: 'postCode',
      elFormItem: {},
      modelEventType: 'input',
      component: 'el-input',
      validator: {
        edit: [
          { required: true, message: '请输入岗位编码', trigger: 'blur' },
        ],
      },
    },
    props: {
      label: "岗位编码",
      prop: "postCode",
      minWidth: 180,
    },
  },
  {
    formCfg: {
      type: ['edit'],
      hidden: false,
      label: '岗位顺序',
      key: 'postSort',
      originValue: 1,
      elFormItem: {},
      modelEventType: 'change',
      component: 'el-input-number',
      validator: {
        edit: [
          { required: true, message: '岗位顺序', trigger: 'change' },
        ],
      },
      // 自定义表单的参数：props————内置默认props；formCfg————当前formCfg对象
      customPropsHook(props) {
        // this指向FormGroup组件
        return {
          ...props,
          controlsPosition: "right",
          min: 1,
          max: 10,
        }
      },
    },
    props: {
      label: "岗位排序",
      prop: "postSort",
      minWidth: 180,
    },
  },
  {
    formCfg: {
      type: ['query', 'edit'],
      hidden: false,
      label: '状态',
      key: 'status',
      elFormItem: {},
      modelEventType: 'change',
      component: 'el-select',
      validator: {
        edit: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
      },
      optionComponent: 'el-option',
      optionComponentLabel: 'label',
      optionComponentValue: 'value',
    },
    getChildDepData: [
      {
        key: 'status',
        value: () => {
          return new Promise((resolve, reject) => {
            getJobStatusDict().then(res => {
              const list = res?.data || []
              resolve(list.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass })))
            }).catch(error => {
              reject(error)
            })
          })
        }
      }
    ],
    props: {
      label: "状态",
      prop: "status",
      minWidth: 180,
    },
  },
  {
    props: {
      label: "创建时间",
      prop: "createTime",
      minWidth: 180,
    },
  },
  {
    props: {
      label: "操作",
      width: 180,
    },
    // el-table-column的默认插槽
    // eslint-disable-next-line no-unused-vars
    formatter(h, config, scope) {
      // this指向Table组件所在的组件
      return (<div>
        <el-button type="text" icon="el-edit" vOn:click={() => this.editData(scope.row)}>修改</el-button>
        <el-button type="text" icon="el-delete" vOn:click={() => this.deleteRow(scope.row)}>删除</el-button>
      </div>)
    },
  },
  {
    formCfg: {
      type: ['edit'],
      hidden: false,
      label: '备注',
      key: 'remark',
      elFormItem: {},
      modelEventType: 'input',
      component: 'el-input',
      // 自定义表单的参数：props————内置默认props；formCfg————当前formCfg对象
      customPropsHook(props) {
        // this指向FormGroup组件
        return {
          ...props,
          type: "textarea",
          rows: 2,
        }
      },
    },
  },
]