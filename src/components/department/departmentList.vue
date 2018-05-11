<template>
    <div>
      <Table ref="deparTable" size="large" height="600" :loading="tableLoading" :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
  import {fetchDepartmentList} from '../../api/department'
    export default {
      data(){
        return {
          columns: [
            {
              title: 'id',
              key: 'did',
              sortable: true
            },
            {
              title: '父级部门',
              key: 'parent_id',
              sortable: true
            },
            {
              title: '等级',
              key: 'range',
              filters: [
                {
                  label: '一级部门',
                  value: 1
                },
                {
                  label: '二级部门',
                  value: 2
                }
              ],
              filterMultiple: false,
              filterMethod (value, row) {
                if (value === 1) {
                  return row.range == 1;
                } else if (value === 2) {
                  return row.range == 2;
                }
              }
            },
            {
              title: '名称',
              key: 'name'
            },
            {
              title: '操作',
              key: 'action',
              width: 300,
              align: 'center',
              render: (h, params) => {  // row、column 和 index
                let range = params.row.range
                let authorization = this.authorization
                // console.log(authorization)
                // 总监权限3级 可以添加和删除 二级部门（在一级部门下添加子部门）
                if (authorization <3){
                  return h('strong', {
                    style: {
                      color: '#ccc8c8',
                      fontSize: '16px'
                    }
                  },'你不具备有操作权限')
                }else if (authorization == 9){
                  if(range == 0){
                    // 添加一级部门
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.addChildDepartment(params.row)
                          }
                        }
                      }, '添加子部门')
                    ]);
                  }else if (range == 1){
                    // 添加2级部门 （删除该部门。。 删的话 涉及数据太多 不让删）
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.addChildDepartment(params.row)
                          }
                        }
                      }, '添加子部门'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.remove(params.index)
                          }
                        }
                      }, '删除就爆炸')
                    ]);
                  }else {
                    // 删除二级部门
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.remove(params.index)
                          }
                        }
                      }, '删除该部门')
                    ]);
                  }
                }else if(authorization == 3 && range == 1){
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.addChildDepartment(params.row)
                          }
                        }
                      }, '添加子部门')
                    ]);
                  }else if(authorization == 3 && range == 2){
                    return h('div', [
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除该部门')
                  ]);
                }
              }
            }
          ],
          data: [],
          tableLoading: false
        }
      },
      computed: {
        authorization(){
          return this.$store.getters.authorization
        }
      },
      mounted(){
        this.initTable()
      },
      methods: {
        initTable(){
          this.tableLoading = true
          fetchDepartmentList().then(res => {
            // console.log(res)
            let data = res.data
            if(data.success){
              this.data = data.list
            }
            this.tableLoading = false
          })
        },
        addChildDepartment (row) {

        },
        remove (index) {
          // 这只是表面删除 真的的删除不仅要删除部门的数据 还有员工表的相关数据
          this.data.splice(index, 1);
        }
      }
    }
</script>

<style scoped>

</style>
