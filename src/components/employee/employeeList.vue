<template>
    <div>
        <h2>员工信息列表</h2>
      <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
  import {fetchEmployeeList} from '../../api/employee'
    export default {
      data(){
        return {
          columns: [
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Followers',
              key: 'followers'
            },
            {
              title: 'Role',
              key: 'role'
            },
            {
              title: 'Time',
              key: 'created_at'
            }
          ],
          data: []
        }
      },
      mounted(){
        this.initList()
      },
      methods:{
        initList() {
          console.log('in init')
          fetchEmployeeList(0, 10).then((res)=>{
            console.log('in fetch')
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>

</style>
