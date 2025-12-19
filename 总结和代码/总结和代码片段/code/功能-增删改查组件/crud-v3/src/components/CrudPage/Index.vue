<script lang="tsx">
import {
  defineComponent,
  ref,
  reactive,
  provide,
  computed,
  watch,
  useAttrs,
  withDirectives,
  resolveDirective,
} from 'vue'
import FormGroup from './FormGroup.vue'
import Table from './Table.vue'

export default defineComponent({
  props: {
    config: { type: Array, required: true },
    dLabelWidth: String, // dialog中表单的Label宽度
    sLabelWidth: String, //搜素栏中表单的Label宽度
    mainKey: { type: String, required: true },
    addApi: { type: Function, required: true },
    queryApi: { type: Function, required: true },
    deleteApi: { type: Function, required: true },
    modifyApi: { type: Function, required: true },
    formFormater: { type: Function }, //对即将保存的教据进行处理
    saveSuccessHandler: { type: Function },
    modifySuccessHandler: { type: Function },
    deleteSuccessHandler: { type: Function },
    convertRow: {
      type: Function,
      default: function (row: any) {
        return row
      },
    },
    // 为table添加事件，selection-change事件除外
    // 因为已经被内部使用，可以使用@table-selection-change代替
    tableEvents: {
      type: Object,
      default() {
        return {}
      },
    },
    // 为编辑弹窗添加事件，close除外
    // 因为已经被内部使用，可以使用@edit-dialog-close代替
    editDialogEvents: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props, context) {
    let originFormData = {} as { [p: string]: any }

    const childDepData = reactive({} as { [p: string]: any })
    const isModifing = ref(false)
    const dialogShow = ref(false)
    const showLoading = ref(false)
    const formData = reactive({} as { [p: string]: any })
    const queryForm = reactive({} as { [p: string]: any })
    const edittingRow = ref(null)
    const tableData = ref([])
    const pageNum = ref(1)
    const pageSize = ref(20)
    const total = ref(0)
    const selected = ref([])

    const tableCom = ref()
    const searchFormCom = ref()

    // 注入
    provide('childDepData', { childDepData })

    // 计算属性
    const editFormsCfg = computed(() => {
      return props.config
        .filter((item: any) => item.formCfg?.type?.includes('edit'))
        .map((item: any) => ({
          ...item.formCfg,
          validator: item.formCfg?.validator?.edit,
          customValidator: item.formCfg.customValidator?.edit,
        }))
    })
    const queryFormsCfg = computed(() => {
      return props.config
        .filter((item: any) => item.formCfg?.type?.includes('query'))
        .map((item: any) => ({
          ...item.formCfg,
          validator: item.formCfg?.validator?.query,
          customValidator: item.formCfg.customValidator?.query,
        }))
    })
    const tableCfg = computed(() => {
      return props.config.filter((item: any) => item.props || item.formatter)
    })

    // 监听
    watch(tableData, () => {
      selected.value = []
      tableCom.value?.elTable.value?.clearSelection()
    })

    const initFormData = () => {
      editFormsCfg.value
        .filter((item: any) => !item.hidden)
        .forEach((item: any) => {
          formData[item.key as string] = item.originValue === undefined ? '' : item.originValue
        })
      originFormData = { ...formData }
    }
    const initQueryForm = () => {
      queryFormsCfg.value.forEach((item: any) => {
        queryForm[item.key as string] = item.originValue === undefined ? '' : item.originValue
      })
    }
    const getChildDepDataFunc = () => {
      const getChildDepDataObjs: [any, any][] = props.config
        .map((c: any) => c.getChildDepData || [])
        .flat()
        .map((item: any) => [item.key, item.value])
      const keyDataMap = new Map(getChildDepDataObjs)
      const p = Promise.allSettled([...keyDataMap.values()].map((func) => func()))
      p.then((result: any[]) => {
        // [{status: "rejected", reason: 1}, {status: "fulfilled", value: 2}]
        const keys = [...keyDataMap.keys()]
        for (let [index, res] of result.entries()) {
          let key = keys[index]
          let value = res.status === 'fulfilled' ? res.value : []
          childDepData[key] = value
        }
      })
    }
    const handleSizeChange = (size: any) => {
      pageNum.value = 1
      pageSize.value = size
      queryList()
    }
    const handleCurrentChange = (page: any) => {
      pageNum.value = page
      queryList()
    }
    const queryList = () => {
      const query = {
        ...queryForm,
        pageNum: pageNum.value,
        pageSize: pageSize.value,
      }
      showLoading.value = true
      props
        .queryApi(query)
        .then((res: { code: string; rows: never[]; total: number }) => {
          if (res.code != '200') throw new Error('api-failed')
          tableData.value = res.rows || []
          total.value = res.total || 0
          showLoading.value = false
        })
        .catch((error: { message: string }) => {
          if (error.message === 'api-failed') {
            console.error(error)
          }
        })
    }
    const search = () => {
      pageNum.value = 1
      pageSize.value = 20
      queryList()
    }
    const reset = () => {
      searchFormCom.value.elForm.resetFields()
      search()
    }
  },
})
</script>

<style lang="scss" scoped>
.crud-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .crud-search {
    ::v-deep .el-form-item {
      margin-bottom: 10px;
    }
  }
  .crud-edit {
    padding-bottom: 8px;
  }
  .table-container {
    flex: 1;
    min-height: 0;
    .su-table-container {
      height: calc(100% - 48px);
    }
    .su-pagination {
      height: 48px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
