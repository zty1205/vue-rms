<template>
    <div>
        <h2>员工信息列表</h2>
      <Table :columns="columns" :data="data"></Table>
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
          data: []
        }
      },
      components: {
        employeeAdd
      },
      mounted(){
        this.initList()
      },
      methods:{
        initList() {
          console.log('in init')
          fetchEmployeeList().then(res=>{
            console.log('in fetch')
            // console.log(res)
            this.data = res.data
          })
        }
      }
    }
</script>

<style scoped>

</style>
