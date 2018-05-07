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
    export default {
      data(){
        return {
          columns: [
            {
              title: 'Id',
              key: 'id'
            },
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'age',
              key: 'age'
            },
            {
              title: 'role',
              key: 'role'
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
            console.log(res)
            this.data = res.data
          })
        }
      }
    }
</script>

<style scoped>

</style>
