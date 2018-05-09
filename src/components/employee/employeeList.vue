<template>
    <div>
        <h2 style="margin-bottom: 10px;margin-top: 6px">员工信息列表</h2>
      <Table ref="table" size="large" height="460" :loading="tableLoading" :columns="columns" :data="data"></Table>

      <Page :total="count" :page-size-opts="PageSizeOpt" placement="top"
            show-elevator show-sizer show-total class="table-page"
            @on-change="tableChangePage" @on-page-size-change="tableChangeSize"
            :current.sync="CurrentPage" :page-size="PageSize">
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
        <label class="custom-label">自定义行:</label><InputNumber :max="data.length-1" :min="0" v-model="beginCol" size="small"></InputNumber>
        <label class="custom-label">至</label><InputNumber :max="data.length-1" :min="0" v-model="endCol" size="small"></InputNumber>
        <label class="custom-label">列:</label><InputNumber :max="columns.length-1" :min="0" v-model="beginRow" size="small"></InputNumber>
        <label class="custom-label">至</label><InputNumber :max="columns.length-1" :min="0" v-model="endRow" size="small"></InputNumber>
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
              key: 'eid'
            },
            {
              title: '名字',
              key: 'name',
              render: (h, params) => {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', params.row.name)
                ]);
              }
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
                // let _index = params.index
                // let role = this.data[_index].role
                let role = params.row.role
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
                // let _index = params.index
                // let status = this.data[_index].status
                let status = params.row.status
                let stat = statusMap[status]
                if (status == 0){
                  // 离职
                  return h('div',[
                    h('label',{
                      style: {
                        color: 'red',
                        fontSize: '16px'
                      }
                    },stat)
                  ]);
                }else if(status == 1) {
                  // 在职
                  return h('div',[
                    h('label',{
                      style: {
                        color: 'green',
                        fontSize: '16px'
                      }
                    },stat)
                  ]);
                }else if(status == 2) {
                  // 休假
                  return h('div',[
                    h('label',{
                      style: {
                        color: 'blue',
                        fontSize: '16px'
                      }
                    },stat)
                  ]);
                }else {
                  // 3 实习生
                  return h('div',[
                    h('label',{
                      style: {
                        color: '#86ff06',
                        fontSize: '16px'
                      }
                    },stat)
                  ]);
                }
              }
            }
          ],
          data: [],
          PageSizeOpt: [10,20,40],    // 每页多少条数据
          CurrentPage: 1,   // 当前显示第几页
          PageSize: 10, // 当前一页显示的条数
          count: 100,  // 表格总共多少条
          tableLoading: true,
          beginCol: null,  // 自定义导出几行几列 不在页面上验证大小 而是在导出前进行判断
          endCol: null,
          beginRow: null,
          endRow: null,
          isFinish: false // 是否输入好了 导出几行几列
        }
      },
      watch: {  // 观察者 或是 对象替换 可以在 不需要刷新页面而替换表格里的内容 我不知道那个性能好 但watch方便一点
        data: {
          handler(newVal,oldVal){
            this.data = newVal
          }
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
          // console.log('in init')
          fetchEmployeeList(0,10).then(res=>{
            // console.log('in fetch')
            // console.log(res) // 经过promise封装过的数据
            let count = res.data.count
            this.count = count
            this.PageSizeOpt.push(count)
            this.data = res.data.list
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
          // console.log('ok')
          // console.log(page)
          this.CurrentPage = page
          fetchEmployeeList(page-1,this.PageSize).then(res=>{
            console.log('in tableChangePage')
            this.data = res.data.list
            this.tableLoading = false
          })
        },
        //  表格每页多少条的回调
        tableChangeSize(size){
          console.log('tableChangeSize')
          // console.log(size)
          this.PageSize = size
          fetchEmployeeList(this.CurrentPage-1,size).then(res=>{
            console.log('in tableChangePage')
            this.data = res.data.list
            this.tableLoading = false
          })
        }
      }
    }
</script>

<style scoped>
.exportBtn {
  margin-top: 20px;
}
.table-page {
  margin-top: 16px;
  margin-bottom: 26px;
}
  .custom-label {
    margin-left: 3px;
    margin-right: 5px;
    color: #58d4e3;
  }
</style>
