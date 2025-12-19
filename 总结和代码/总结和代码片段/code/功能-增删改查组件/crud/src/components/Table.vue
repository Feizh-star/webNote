<script>
export default {
  inheritAttrs: false,
  props: {
    cols: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    commonProps: {
      type: Object,
      default: () => ({
        align: 'center',
        headerAlign: 'center',
        showOverflowTooltip: true
      })
    },
  },
  inject: ['childDepData'],
  computed: {
    showLoading: {
      get() {
        return this.loading
      },
      set(value) {
        this.$emit('update:loading', value)
      }
    }
  },
  mounted() {
    this.elTable = this.$refs.table
  },
  render(h) {
    const {
      cols,
      showLoading,
      commonProps,
      childDepData,
      $listeners,
      $attrs,
    } = this
    
    const getElColumns = (columns) => {
      return columns.map(column => {
        const type = column.props.type
        const formatter = column.formatter
        const headerFormatter = column.headerFormatter
        const scopedSlots = {
          header: scope => Object.prototype.toString.call(headerFormatter) === '[object Function]' ?
            headerFormatter.call(this.$parent, h, {...column, childDepData}, scope) :
            (<div>{ column.props?.label || '' }</div>)
        }
        if ((type !== 'index' && type !== 'selection') || formatter) {
          scopedSlots.default = scope => Object.prototype.toString.call(formatter) === '[object Function]' ?
            formatter.call(this.$parent, h, {...column, childDepData}, scope) :
            (<span>{ scope.row[column.props?.prop || ''] ?? '' }</span>)
        }
        return h(
          'el-table-column',
          {
            props: { ...commonProps, ...column.props },
            scopedSlots: scopedSlots
          },
          getElColumns(column.children || [])
        )
      })
    }
    const props = {
      rowStyle: {height: '44px'},
      cellStyle: {padding: 0},
      ...$attrs,
    }
    return h('el-table', {
      props: props,
      on: { ...$listeners },
      directives: [
        { name: 'loading', value: showLoading }
      ],
      ref: 'table',
    }, getElColumns(cols))
  }
}
</script>
