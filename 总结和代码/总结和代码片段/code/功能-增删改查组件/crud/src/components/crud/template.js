
export const config = [
  {
    // 表单配置，可以没有，没有就不会在搜索栏和弹窗中显示
    formCfg: {
      type: ['query', 'edit'], // query————表单组件在搜索栏显示；edit————表单组件在新增/修改弹窗中显示
      hidden: false, // type包含edit时，hidden可以控制弹窗中是否显示本字段的表单
      label: '岗位名称', // el-form-item 的label
      key: 'gwmc', // 表单v-model绑定的key
      originValue: 1, // 初始值
      elFormItem: {}, // el-form-item 任意props
      modelEventType: 'input', // 指定v-model绑定的事件
      component: 'el-input', // 表单的名称或组件
      validator: {
        edit: [ // 仅在type包含edit时生效
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        query: [ // 仅在type包含query时生效
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
      },
      // 用于element-ui之外的自定义表单组件的自定义校验
      customValidator: {
        edit: [
          {
            // event是trigger指定的事件的参数，可能不止1个，要根据具体的组件决定
            validator: function (event, formData, cb) {
              if (!event) {
                cb('请选择单位')
              } else {
                cb('')
              }
            },
            trigger: 'input'
          }
        ],
        query: [
          // ...
        ]
      },
      // 在v-model事件中添加逻辑，例如需要再input事件中处理一些事情
      inputHandler(event, formData) {
        // this指向FormGroup组件
      },
      optionComponent: 'el-option', // 指定el-select组件的子级组件
      optionComponentLabel: 'label', // el-option的label取值的key
      optionComponentValue: 'value', // el-option的value取值的key
      // 自定义表单子级元素的生成逻辑，已el-option为例
      genOptionsVnode: (h, formCfg, optionsData) => {
        let options = []
        if (Array.isArray(optionsData)) {
          for (let [index, item] of optionsData) {
            let optionVnode = h(formCfg.optionComponent, {
              key: index,
              label: item[formCfg.optionComponentLabel],
              value: item[formCfg.optionComponentValue]
            })
            options.push(optionVnode)
          }
        }
        return options
      },
      // 自定义表单的参数：props————内置默认props；formCfg————当前formCfg对象
      customPropsHook(props, formCfg) {
        // this指向FormGroup组件
        return {
          ...props
        }
      },
      // 自定义表单的监听事件：listeners————内置默认listeners：formCfg————当前formCfg对象
      customListenerHook(listeners, formCfg) {
        // this指向FormGroup组件
        return {
          ...listeners
        }
      },
      // 自定义表单的原生属性(例如el-input的placeholder)：attrs————内置默认attrs；formCfg————当前formCfg对象
      customAttrsHook(attrs, formCfg) {
        // this指向FormGroup组件
        return {
          ...attrs
        }
      },
    },
    // 获取依赖的数据，例如下拉框依赖的list，可以设置多个
    getChildDepData: [
      {
        key: 'gw', // 在formatter中可以通过形如config.childDepData?.gw 的方式访问
        value: () => { // 必须返回1个promise，并在接口返回后调用resolve(list)
          return new Promise((resolve, reject) => {
            fetchApi().then(res => {
              resolve(res?.data || [])
            }).catch(error => {
              reject(error)
            })
          })
        }
      }
    ],
    // el-table-column参数
    props: {
      label: "岗位",
      prop: "gw",
      minWidth: 180,
      // 任意el-table-column参数
    },
    // el-table-column的默认插槽
    formatter(h, config, scope) {
      // this指向Table组件所在的组件
      let gwList = config.childDepData?.gw || []
      return h('div', {}, [
        <span>{gwList.fine(item => item.gwid === scope.row.gwid)?.gwmc || ''}</span>
      ]) // 必须返回一个vNode
    },
    // el-table-column的表头插槽
    headerFormatter(h, config, scope) {
      // this指向Table组件所在的组件
      return h('div', {}, []) // 必须返回一个vNode
    },
  },
]