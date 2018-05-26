<template>
    <div>
      <Form ref="findEmployee" :model="findEmployee" inline>
        <label class="find-label">Id:</label>
        <FormItem prop="eid"> <!-- 卸载属性里的label 和按钮不在一列 -->
          <Input type="text" v-model="findEmployee.eid"/>
        </FormItem>
        <label class="find-label">姓名:</label>
        <FormItem prop="name">
          <Input type="text" v-model="findEmployee.name"/>
        </FormItem>
        <label class="find-label">部门:</label>
        <FormItem prop="department">
          <Select v-model="findEmployee.department">
            <Option value="0"> 所  有 </Option>
            <Option value="1"> 研发部 </Option>
            <Option value="2"> 业务部 </Option>
            <Option value="3"> 后勤部 </Option>
            <Option value="4"> 人事部 </Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="ghost" shape="circle" size="small" icon="ios-search" @click="handleSearch">Search</Button>
        </FormItem>
      </Form>
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

    </div>
</template>

<script>
  import employeeAdd from './employeeAdd.vue'
  import {fetchEmployeeList , findEmployee , changeEmployeeStatus , deleteEmployee} from '../../api/employee'

  const departmentMap = {
    1: '研发部',
    2: '业务部',
    3: '后勤部',
    4: '人事部'
  }

  const statusMap = {
    0: '已离职',
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
          findEmployee :{
            eid: '',
            name: '',
            department: null,
          },
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
              title: '地址',
              key: 'address',
            },
            {
              title: '国籍',
              key: 'city',
            },
            {
              title: '学历',
              key: 'doctor',
            },
            {
              title: '职位',
              key: 'role',
              render:(h, params) => {
                // let _index = params.index
                // let role = this.data[_index].role
                let role = params.row.role
                return h('div',[h('label',roleMap[role])]);
              },
              filters: [  // 过滤什么的都是在当前页 对data里存在的数据进行操作
                {
                  label: '总监',
                  value: 3
                },
                {
                  label: '经理',
                  value: 2
                },
                {
                  label: '组员',
                  value: 1
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                if (value === 1) {
                  return row.role == 1;
                } else if (value === 2) {
                  return row.role == 2;
                } else{
                  return row.role == 3;
                }
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
            },
            {
              title: 'Action',
              key: 'action',
              width: 200,
              align: 'center',
              render: (h, params) => {
                if(this.authority > 2){
                  let status = params.row.status
                  if(status == 0){
                    // 员工已离职 添加删除员工按钮
                    return h('Button',{
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.delete(params.index)
                        }
                      }
                    },'删除')
                  }
                  else if(status == 3) {
                    // 实习生还需要添加转正按钮
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '10px'
                        },
                        on: {
                          click: () => {
                            this.detail(params.row)
                          }
                        }
                      }, '详情'),
                      h('Button', {
                        props: {
                          type: 'success',
                          size: 'small'
                        },
                        style: {
                          marginRight: '10px'
                        },
                        on: {
                          click: () => {
                            this.becomeMember(params.row)
                          }
                        }
                      }, '转正'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.resign(params.row)
                          }
                        }
                      }, '离职')  // 离职也改状态 添加一个删除已离职员工的按钮
                    ]);
                  }else {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '10px'
                        },
                        on: {
                          click: () => {
                            this.detail(params.row)
                          }
                        }
                      }, '详情'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.resign(params.index)
                          }
                        }
                      }, '离职')
                    ]);
                  }
                }else {
                  return h('strong', {
                    style: {
                      color: '#ccc8c8',
                      fontSize: '16px'
                    }
                  },'你不具备有操作权限')
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
      computed: {
        authority() {
          return this.$store.getters.authorization
        }
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
        //条件查询员工
        handleSearch(){
          console.log(this.findEmployee)
          let em = this.findEmployee
          findEmployee(em).then(res =>{
            // console.log(res)
            let Redata = res.data
            if(Redata.isExist){
              this.count = Redata.list.length
              this.data = Redata.list
            }else {
              this.count = 0
              this.data = []
            }
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
        },
        //详细信息
        detail(row){
          // iview 的模态框要使用render渲染 写的有点多 所以员工信息只写表格中没有的部分
          this.$Modal.info({
            title: row.name + '的其他信息',
            render: h => {
              return h('Layout',{ style: {marginTop: "30px" } },[
                // 姓名
                h('div',{ style: { margin: "5px 10px" } },[
                  h('label',{ style: { lineHeight: "100%", color: "#19be69" } }, "姓名"),
                  h('Input',{
                    props: { type: "text", readonly: true, value: row.name },
                    style: { width: "80%", marginLeft: "10px" } })
                ]),
                // 电话
                h('div',{ style: { margin: "5px 10px" } },[
                  h('label',{ style: { lineHeight: "100%" , color: "#19be69" } }, "电话"),
                  h('Input',{
                    props: { type: "text", readonly: true, value: row.phone },
                    style: { width: "80%", marginLeft: "10px" } })
                ]),
                // 地址
                h('div',{ style: { margin: "5px 10px" } },[
                  h('label',{ style: { lineHeight: "100%", color: "#19be69" } }, "住址"),
                  h('Input',{
                    props: { type: "text", readonly: true, value: row.phone },
                    style: { width: "80%", marginLeft: "10px" } })
                ]),
                // 地址
                h('div',{ style: { margin: "5px 10px" } },[
                  h('label',{ style: { lineHeight: "100%", color: "#19be69" } }, "入职"),
                  h('Input',{
                    props: { type: "text", readonly: true, value: row.arrive },
                    style: { width: "80%", marginLeft: "10px" } })
                ])
              ])
            }
          })
          // console.log(row)
        },
        // 离职
        resign(row){
          changeEmployeeStatus(row.eid,0).then(res => {
            console.log(res)
            // 对象替换 或 更新列表  但返回的是新的对象 所有要使用对象替换
            // 替换太麻烦 根据返回的布尔值 判断就行
            if(res.data.list){
              row.status = 0
              console.log("离职成功")
              this.$Notice.success({
                title: '员工离职',
                render: h => {
                  return h('span', [
                    '员工 -  ',
                    h('a',{
                      style: {
                        fontSize: '18px'
                      }
                    } , row.name),
                    h('p','已飞往更广阔的未来')
                  ])
                },
                duration: 3
              });
            }else {
              this.$Message.error('系统内部错误，请联系系统维护人员');
            }
          })
        },
        // 删除离职员工
        delete(index){
          console.log(index)
          let eid = this.data[index].eid
          console.log(eid)
          deleteEmployee(eid).then(res => {
            // console.log(res)
            let data = res.data
            if(data.isDelete){
              // 删除成功
              this.$Notice.success({
                title: '删除成功'
              })
              this.data.splice(index, 1);  // 这行代码只是删除表格里的数据
            }else {
              // 删除失败
              this.$Message.error('系统内部错误，请联系系统维护人员');
            }
          })
        },
        // 转正
        becomeMember(row){
          changeEmployeeStatus(row.eid,1).then(res => {
            console.log(res)
            // 对象替换 或 更新列表  但返回的是新的对象 所有要使用对象替换
            // 替换太麻烦 根据返回的布尔值 判断就行
            if(res.data.list){
              row.status = 1
              console.log("转正成功")
              this.$Notice.success({
                title: '实习生转正',
                render: h => {
                  return h('span', [
                    '恭喜你， ',
                    h('a',{
                      style: {
                        fontSize: '18px'
                      }
                    } , row.name),
                    h('p','欢迎您成为公司大家庭的一员的')
                  ])
                },
                duration: 3
              });
            }else {
              this.$Message.error('系统内部错误，请联系系统维护人员');
            }
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
  margin-top: 10px;
  margin-bottom: 20px;
}
  .custom-label {
    margin-left: 3px;
    margin-right: 5px;
    color: #58d4e3;
  }
  .find-label {
    display: inline-block;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    color: #495060;
  }
</style>
