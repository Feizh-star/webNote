<script lang="tsx">
import FormGroup from './FormGroup.vue'
import Table from './Table.vue'
import { defineComponent, computed, useAttrs, withDirectives, resolveDirective } from 'vue'
export default defineComponent({
  data() {
    return {
      childDepData: {},
      isModifing: false,
      dialogShow: false,
      showLoading: false,
      formData: {},
      queryForm: {},
      edittingRow: null,
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      selected: [],
    }
  },
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
  provide() {
    return {
      childDepData: this.childDepData,
    }
  },
  created() {
    this.getChildDepDataFunc()
    this.initFormData()
    this.initQueryForm()
    this.queryList()
  },
  computed: {
    editFormsCfg() {
      return this.config
        .filter((item: { formCfg: { type: string | string[] } }) =>
          item.formCfg?.type?.includes('edit')
        )
        .map((item: { formCfg: { validator: { edit: any }; customValidator: { edit: any } } }) => ({
          ...item.formCfg,
          validator: item.formCfg?.validator?.edit,
          customValidator: item.formCfg.customValidator?.edit,
        }))
    },
    queryFormsCfg() {
      return this.config
        .filter((item: { formCfg: { type: string | string[] } }) =>
          item.formCfg?.type?.includes('query')
        )
        .map(
          (item: { formCfg: { validator: { query: any }; customValidator: { query: any } } }) => ({
            ...item.formCfg,
            validator: item.formCfg?.validator?.query,
            customValidator: item.formCfg.customValidator?.query,
          })
        )
    },
    tableCfg() {
      return this.config.filter(
        (item: { props: any; formatter: any }) => item.props || item.formatter
      )
    },
  },
  watch: {
    /**
     * 表格内容变化，清空表格选择
     */
    // eslint-disable-next-line no-unused-vars
    tableData(newVal: any) {
      this.selected = []
      this.$refs.table.elTable.clearSelection()
    },
  },
  methods: {
    initFormData() {
      this.editFormsCfg
        ?.filter((item: { hidden: any }) => !item.hidden)
        ?.forEach((item: { key: any; originValue: undefined }) => {
          this.$set(this.formData, item.key, item.originValue === undefined ? '' : item.originValue)
        })
      this.originFormData = { ...this.formData }
    },
    initQueryForm() {
      this.queryFormsCfg?.forEach((item: { key: any; originValue: undefined }) => {
        this.$set(this.queryForm, item.key, item.originValue === undefined ? '' : item.originValue)
      })
    },
    // 获取config中所有的依赖数据
    getChildDepDataFunc() {
      const getChildDepDataObjs = this.config
        .map((c: { getChildDepData: any }) => c.getChildDepData || [])
        .flat()
        .map((item: { key: any; value: any }) => [item.key, item.value])
      const keyDataMap = new Map(getChildDepDataObjs)
      const p = Promise.allSettled([...keyDataMap.values()].map((func) => func()))
      p.then((result: any[]) => {
        // [{status: "rejected", reason: 1}, {status: "fulfilled", value: 2}]
        const keys = [...keyDataMap.keys()]
        for (let [index, res] of result.entries()) {
          let key = keys[index]
          let value = res.status === 'fulfilled' ? res.value : []
          this.$set(this.childDepData, key, value)
        }
      })
    },
    handleSizeChange(size: any) {
      this.pageNum = 1
      this.pageSize = size
      this.queryList()
    },
    handleCurrentChange(page: any) {
      this.pageNum = page
      this.queryList()
    },
    queryList() {
      const query = {
        ...this.queryForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.showLoading = true
      this.queryApi(query)
        .then((res: { code: string; rows: never[]; total: number }) => {
          if (res.code != '200') throw new Error('api-failed')
          this.tableData = res.rows || []
          this.total = res.total || 0
          this.showLoading = false
        })
        .catch((error: { message: string }) => {
          if (error.message === 'api-failed') {
            console.error(error)
          }
        })
    },
    search() {
      this.pageNum = 1
      this.pageSize = 20
      this.queryList()
    },
    reset() {
      this.$refs.searchForm.elForm.resetFields()
      this.search()
    },
    dialogClose() {
      // 清空表单
      for (const key in this.formData) {
        this.formData[key] = this.originFormData[key]
      }
      this.edittingRow = null
      this.isModifing = false
      // 清除校验
      this.$nextTick(() => {
        this.$refs.dialogForm.clearValidate()
      })
      this.$emit('edit-dialog-close')
    },
    add() {
      this.dialogShow = true
    },
    cancel() {
      this.dialogShow = false
    },
    selectionChangeHandler(sel: any) {
      this.selected = sel
      this.$emit('table-selection-change', sel)
    },
    editData(row: any) {
      this.edittingRow = row
      const edittingData = this.convertRow({ ...row })
      this.editFormsCfg.forEach((item: { key: string | number }) => {
        let value = edittingData[item.key]
        // if (item.formType === 'el-datatime')
        // value = value ? formatDate(new Date(value)) : ''
        this.formData[item.key] = value
      })
      this.isModifing = true
      this.dialogShow = true
    },
    dialogConfirm() {
      if (this.edittingRow) {
        this.modifyData()
      } else {
        this.saveData()
      }
    },
    saveData() {
      // eslint-disable-next-line no-unused-vars
      this.$refs.dialogForm
        .validate()
        .then((valid: any) => {
          let data = { ...this.formData }
          if (this.formFormater) data = this.formFormater(this, data)
          this.addApi(data)
            .then((res: { code: string }) => {
              if (res.code != '200') throw new Error('api-failed')
              this.queryList()
              this.dialogShow = false
              if (!this.saveSuccessHandler) {
                this.$message({ type: 'success', message: '保存成功!' })
              } else {
                this.saveSuccessHandler(this)
              }
            })
            .catch((error: { message: string }) => {
              if (error.message === 'api-failed') {
                console.error(error)
              }
            })
          // eslint-disable-next-line no-unused-vars
        })
        .catch((error: any) => {})
    },
    modifyData() {
      // eslint-disable-next-line no-unused-vars
      this.$refs.dialogForm
        .validate()
        .then((valid: any) => {
          let data = { ...this.formData }
          data[this.mainKey] = this.edittingRow[this.mainKey]
          if (this.formFormater) data = this.formFormater(this, data)
          this.modifyApi(data)
            .then((res: { code: string }) => {
              if (res.code != '200') throw new Error('api-failed')
              this.queryList()
              this.dialogShow = false
              if (!this.modifySuccessHandler) {
                this.$message({ type: 'success', message: '修改成功' })
              } else {
                this.modifySuccessHandler(this)
              }
            })
            .catch((error: { message: string }) => {
              if (error.message === 'api-failed') {
                console.error(error)
              }
            })
          // eslint-disable-next-line no-unused-vars
        })
        .catch((error: any) => {})
    },
    deleteRow(row: any) {
      const selected = [row]
      this.deleteSelection(selected)
    },
    deleteSelection(selected: any[]) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const ids =
            selected.map((item: { [x: string]: any }) => item[this.mainKey]).join(',') || ''
          this.deleteApi(ids)
            .then((res: { code: string }) => {
              if (res.code != '200') throw new Error('api-failed')
              this.queryList()
              if (!this.deleteSuccessHandler) {
                this.$message({ type: 'success', message: '删除成功' })
              } else {
                this.deleteSuccessHandler(this)
              }
            })
            .catch((error: { message: string }) => {
              if (error.message === 'api-failed') {
                console.error(error)
              }
            })
          // eslint-disable-next-line no-unused-vars
        })
        .catch((error: any) => {})
    },
  },
  // eslint-disable-next-line no-unused-vars
  render() {
    const {
      // data
      isModifing,
      dialogShow,
      showLoading,
      formData,
      queryForm,
      tableData,
      editFormsCfg,
      queryFormsCfg,
      pageNum,
      pageSize,
      total,
      selected,
      // props
      tableCfg,
      dLabelWidth,
      sLabelWidth,
      tableEvents,
      editDialogEvents,
      // methods
      dialogClose,
      cancel,
      dialogConfirm,
      search,
      reset,
      add,
      deleteSelection,
      handleSizeChange,
      handleCurrentChange,
      selectionChangeHandler,
    } = this

    const mergeEditDialogEvents = {
      'update:visible': (val: any) => (this.dialogShow = val),
      ...editDialogEvents,
    }

    return (
      <div class="crud-container">
        <div class="crud-search">
          <FormGroup
            forms={queryFormsCfg}
            label-width={sLabelWidth}
            inline={true}
            size="small"
            formData={queryForm}
            ref="searchForm"
          >
            <el-button slot="btns" type="primary" icon="el-icon-search" vOn:click={search}>
              搜索
            </el-button>
            <el-button
              slot="btns"
              type="primary"
              icon="el-icon-refresh"
              plain={true}
              vOn:click={reset}
            >
              重置
            </el-button>
            <template slot="btns">{this.$slots.searchbtns}</template>
          </FormGroup>
        </div>
        <div class="crud-edit">
          <el-button type="primary" size="small" icon="el-icon-plus" vOn:click={add}>
            新增
          </el-button>
          <el-button
            type="primary"
            plain
            size="small"
            icon="el-icon-delete"
            vOn:click={() => deleteSelection(selected)}
            disabled={selected.length === 0}
          >
            批量删除
          </el-button>
          {this.$slots.editBtns}
        </div>
        <div class="table-container">
          <div class="su-table-container">
            <Table
              data={tableData}
              cols={tableCfg}
              border
              height="100%"
              ref="table"
              vOn:selection-change={selectionChangeHandler}
              loading={showLoading}
              {...{ on: tableEvents }}
            />
          </div>
          <div class="su-pagination">
            <el-pagination
              background
              align="center"
              vOn:size-change={handleSizeChange}
              vOn:current-change={handleCurrentChange}
              current-page={pageNum}
              page-size={pageSize}
              layout="total, sizes, prev, pager, next, jumper"
              total={total}
            ></el-pagination>
          </div>
        </div>
        <el-dialog
          title={`${isModifing ? '修改' : '新增'}`}
          width="560px"
          vOn:close={dialogClose}
          visible={dialogShow}
          {...{ on: mergeEditDialogEvents }}
        >
          <section class="form-group-container">
            <FormGroup
              forms={editFormsCfg}
              label-width={dLabelWidth}
              formData={formData}
              ref="dialogForm"
            />
          </section>
          <div slot="footer">
            <el-button type="primary" plain size="small" vOn:click={cancel}>
              取消
            </el-button>
            <el-button type="primary" size="small" vOn:click={dialogConfirm}>
              确定
            </el-button>
          </div>
        </el-dialog>
      </div>
    )
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
