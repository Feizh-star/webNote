<script>
function setEventHandler(eventMap, eventName, handler) {
  let eventSet = eventMap.get(eventName)
  if (!eventSet) {
    eventSet = new Set()
    eventMap.set(eventName, eventSet)
  }
  eventSet.add(handler)
  return eventMap
}
/**
 * 默认的options生成器
 */
function defaultGenOptionsVnode(h, formCfg, optionsData) {
  let options = []
  let labelKey = formCfg.optionComponentLabel || 'label'
  let valueKey = formCfg.optionComponentValue || 'value'
  if (Array.isArray(optionsData)) {
    for (let [index, item] of optionsData.entries()) {
      let optionVnode = h(formCfg.optionComponent, {
        key: index,
        props: {
          label: item[labelKey],
          value: item[valueKey],
        },
      })
      options.push(optionVnode)
    }
  }
  return options
}
/**
 * 简单判断placeholder
 */
function genPlaceholder(component, label) {
  if (typeof component !== 'string') return ''
  if (component.includes('input')) {
    return `请输入${label}`
  } else if (component.includes('select') || component.includes('cascader')) {
    return `请选择${label}`
  } else {
    return ''
  }
}
/**
 * 生成form组件
 */
function genForm(h, formCfg) {
  const {
    key, // 表单的key
    label, // 表单的label
    modelEventType, // 指定v-model绑定的事件
    component, // 表单的名称或组件
    inputHandler, // 在v-model事件中添加逻辑
    optionComponent, // option的组件名
    genOptionsVnode, // 自定义生成子节点的函数
    customPropsHook, // 自定义props
    customListenerHook, // 自定义事件
    customAttrsHook, // 自定义原生input属性
  } = formCfg
  const { formData, childDepData, customRules } = this

  // attrs
  let attrs = {
    placeholder: genPlaceholder(component, label),
  }
  // 允许自定义attrs
  if (customAttrsHook) attrs = customAttrsHook.call(this, attrs, formCfg)

  // props
  let props = {
    placeholder: genPlaceholder(component, label),
  }
  // 允许自定义props
  if (customPropsHook) props = customPropsHook.call(this, props, formCfg)
  props.value = formData[key]

  // 事件
  const vModelEventType = modelEventType ? modelEventType : 'input'
  let listeners = {}
  let customListeners = {}
  let customValidators = customRules[key] || []
  let listenersList = []
  let formEventMap = new Map()
  if (customListenerHook) customListeners = customListenerHook.call(this, customListeners, formCfg)
  // 添加v-model绑定的事件
  listenersList.push({
    eventName: vModelEventType,
    handler: function (event) {
      formData[key] = event
    },
  })
  // 添加额外的v-model绑定的事件
  if (inputHandler) {
    listenersList.push({
      eventName: vModelEventType,
      handler: inputHandler,
    })
  }
  // 添加自定义事件
  for (let key in customListeners) {
    listenersList.push({
      eventName: key,
      handler: customListeners[key],
    })
  }
  // 添加自定义校验器
  for (let item of customValidators) {
    if (!item.validator || !item.trigger) continue
    listenersList.push({
      eventName: item.trigger,
      handler: function (...args) {
        item.validator.apply(this, [
          ...args,
          (msg) => {
            this.customErrorMsg[key] = msg
          },
        ])
      },
    })
  }
  // 构建map-set结构
  for (let item of listenersList) {
    setEventHandler(formEventMap, item.eventName, item.handler)
  }
  // 合并重复的事件，保证以上所有事件中重复的事件都能正常执行
  for (let [key, eventSet] of formEventMap) {
    listeners[key] = (...args) => {
      eventSet.forEach((e) => e.apply(this, [...args, formData]))
    }
  }

  // 生成options
  let options = []
  if (optionComponent) {
    options = genOptionsVnode
      ? genOptionsVnode.call(this, h, formCfg, childDepData[key])
      : defaultGenOptionsVnode.call(this, h, formCfg, childDepData[key])
  }

  return h(
    component,
    {
      class: {
        'valid-failed': !!this.customErrorMsg[key],
      },
      attrs: attrs,
      props: props,
      on: listeners,
      ref: key,
    },
    options
  )
}
export default {
  name: 'FormGroup',
  data() {
    return {
      rules: {},
      customRules: {},
      customErrorMsg: {},
      elForm: null,
    }
  },
  props: {
    forms: {
      type: Array,
      required: true,
    },
    formData: Object,
  },
  inject: ['childDepData'],
  expose: ['elForm'],
  created() {
    this.initRules()
  },
  mounted() {
    this.elForm = this.$refs.elForm
  },
  render(h) {
    const { forms, rules, formData, $attrs, $listeners, $slots } = this
    return h(
      'el-form',
      {
        props: {
          model: formData,
          rules: rules,
          ...$attrs,
        },
        on: { ...$listeners },
        nativeOn: {
          submit: (e) => e.preventDefault(),
        },
        ref: 'elForm',
      },
      [
        ...forms
          .filter((item) => !item.hidden)
          .map((item, index) => {
            const formVnode = genForm.call(this, h, item)
            return h(
              'el-form-item',
              {
                key: index,
                props: {
                  prop: item.key,
                  label: item.label,
                  ...item.elFormItem,
                },
              },
              [formVnode, <span class="error-msg">{this.customErrorMsg[item.key] || ''}</span>]
            )
          }),
        h('el-form-item', [$slots.btns]),
      ]
    )
  },
  methods: {
    initRules() {
      for (const item of this.forms) {
        if (item.validator && !item.hidden) this.$set(this.rules, item.key, item.validator)
        if (item.customValidator && !item.hidden) {
          this.$set(this.customRules, item.key, item.customValidator)
          this.$set(this.customErrorMsg, item.key, '')
        }
      }
    },
    validate(cb) {
      // 这里要把所有的自定义校验规则都执行一遍
      let customRulesKeys = Object.keys(this.customRules)
      let failedKeys = {}
      customRulesKeys.forEach((key) => {
        let ruleArr = this.customRules[key]
        for (let r of ruleArr) {
          r.validator.apply(this, [
            this.formData[key],
            this.formData,
            (msg) => {
              this.customErrorMsg[key] = msg
            },
          ])
          if (this.customErrorMsg[key]) failedKeys[key] = false
        }
      })
      if (cb instanceof Function) {
        /* eslint-disable-next-line */
        this.$refs.elForm.validate((valid, fields) => {
          cb(valid && Object.keys(failedKeys).length < 1, { ...failedKeys })
        })
      } else {
        return new Promise((resolve, reject) => {
          /* eslint-disable-next-line */
          this.$refs.elForm.validate().then(valid => {
              if (Object.keys(failedKeys).length < 1) {
                resolve(true)
              } else {
                reject(false)
              }
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    clearValidate() {
      for (let key in this.customErrorMsg) {
        this.customErrorMsg[key] = ''
      }
      this.$refs.elForm.clearValidate()
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  position: relative;
  .error-msg {
    position: absolute;
    top: 100%;
    left: 0;
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
  }
}
</style>
