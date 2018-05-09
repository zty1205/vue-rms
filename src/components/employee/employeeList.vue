<template>
    <div>
        <h2>员工信息列表</h2>
      <Table ref="table" size="large" height="460" :loading="tableLoading" :columns="columns" :data="data"></Table>

      <Page :total="data.length" :page-size-opts="PageSizeOpt" show-elevator show-sizer show-total
            @on-change="tableChangePage" @on-page-size-change="tableChangeSize"
            :current="CurrentPage" :page-size="PageSize">
      </Page>

      <div class="exportBtn">
        <Button type="primary" size="large" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon> 导出原始数据
        </Button>
        <Button type="primary" size="large" @click="exportData(2)">
          <Icon type="ios-download-outline"></Icon> 导出排列和过去后的数据
        </Button>
        <Button type="primary" size="large" @click="exportData(3)">
          <Icon type="ios-download-outline"></Icon> 导出自定义数据
        </Button>
        <label class="custom-col-label">自定义行:</label><InputNumber :max="data.length-1" :min="0" v-model="beginCol" size="small"></InputNumber>
        <label class="custom-col-label">至</label><InputNumber :max="data.length-1" :min="0" v-model="endCol" size="small"></InputNumber>
        <label class="custom-row-label">列:</label><InputNumber :max="columns.length-1" :min="0" v-model="beginRow" size="small"></InputNumber>
        <label class="custom-row-label">至</label><InputNumber :max="columns.length-1" :min="0" v-model="endRow" size="small"></InputNumber>
      </div>


      <!--<employee-add></employee-add>-->
    </div>
</template>

<script>
  import employeeAdd from './employeeAdd.vue'
  import {fetchEmployeeList} from '../../api/employee'

  const departmentMap = {
    1: '研发部',
    2: '业务部',
    3: '后勤部',
    4: '人事部'
  }

  const statusMap = {
    0: '离职',
    1: '在职',
    2: '休假',
    3: '实习生'
  }

  const roleMap = {
    3: '总监',
    2: '经理',
    1: '组员'
  }

    export default {
      data(){
        return {
          columns: [
            {
              title: 'Id',
              key: 'eid',
              sortable: true
            },
            {
              title: '名字',
              key: 'name'
            },
            {
              title: '年龄',
              key: 'age',
              sortable: true
            },
            {
              title: '职位',
              key: 'role',
              render:(h, params) => {
                let _index = params.index
                let role = this.data[_index].role
                return h('div',[h('label',roleMap[role])]);
              }
            },
            {
              title: '部门',
              key: 'department',
              render:(h, params) => {
                let _index = params.index
                let department = this.data[_index].department
                return h('div',[h('label',departmentMap[department])]);
              },
              filters: [
                {
                  label: '研发部',
                  value: 1
                },
                {
                  label: '业务部',
                  value: 2
                },
                {
                  label: '后勤部',
                  value: 3
                },
                {
                  label: '人事部',
                  value: 4
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                if (value === 1) {
                  return row.department == 1;
                } else if (value === 2) {
                  return row.department == 2;
                } else if (value === 3) {
                  return row.department == 3;
                } else if (value === 4) {
                  return row.department == 4;
                }
              }
            },
            {
              title: '状态',
              key: 'status',
              render:(h, params) => {
                let _index = params.index
                let status = this.data[_index].status
                return h('div',[h('label',statusMap[status])]);
              }
            }
          ],
          data: [],
          PageSizeOpt: [10,20,40],    // 每页多少条数据
          CurrentPage: 1,   // 当前显示第几页
          PageSize: 10, // 当前一页显示的条数
          tableLoading: true,
          beginCol: null,  // 自定义导出几行几列 不在页面上验证大小 而是在导出前进行判断
          endCol: null,
          beginRow: null,
          endRow: null,
          isFinish: false // 是否输入好了 导出几行几列
        }
      },
      components: {
        employeeAdd
      },
      mounted(){
        this.initList()
      },
      methods:{
        // 初始化表格数据
        initList() {
          console.log('in init')
          fetchEmployeeList().then(res=>{
            console.log('in fetch')
            // console.log(res)
            this.data = res.data
            this.tableLoading = false
          })
        },
        // 导出Excel
        exportData (type) {
          if (type === 1) {
            this.$refs.table.exportCsv({
              filename: 'The original data'
            });
          } else if (type === 2) {
            this.$refs.table.exportCsv({
              filename: 'Sorting and filtering data',
              original: false
            });
          } else if (type === 3) {
            let beginCol = this.beginCol || 0   // 但左边的布尔值为 false时 等于右边
            let endCol = this.endCol || this.data.length-1
            let beginRow = this.beginRow || 0
            let endRow = this.endRow || this.columns.length-1

            this.$refs.table.exportCsv({
              filename: 'Custom data',
              columns: this.columns.filter((col, index) => index <= Math.max(beginCol,endCol) && index >= Math.min(beginCol,endCol)),
              data: this.data.filter((data, index) => index <= Math.max(beginRow,endRow) && index >= Math.min(beginRow,endRow))
            });
          }
        },
        // 分页的响应函数
        tableChangePage(page){
          console.log('ok')
          console.log(page)
        },
        //  表格每页多少条的回调
        tableChangeSize(size){
          console.log('ok')
          console.log(size)
        }
      }
    }
</script>

<style scoped>
.exportBtn {
  margin-top: 20px;
}
  .custom-col-label {
    margin-left: 2px;
    margin-right: 4px;
    color: #53e3a6;
  }
  .custom-row-label {
    margin-left: 2px;
    margin-right: 4px;
    color: #58d4e3;
  }
</style>
