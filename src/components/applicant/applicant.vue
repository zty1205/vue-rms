<template>
    <div>
      <Row>
        <Col span="10" offset="1">
          <div class="table-top">
            <span class="table-title" >我发起的</span>
            <Icon type="paper-airplane" size="24"></Icon>
          </div>

          <Table :load="loading" border :columns="applyColumns" :data="applyData"></Table>
        </Col>
        <Col span="10" offset="2">
          <div class="table-top">
            <span class="table-title" >我审批的</span>
            <Icon type="paintbrush" size="24"></Icon>
          </div>
          <Table :load="loading" border :columns="auditColumns" :data="auditData"></Table>
        </Col>
      </Row>
    </div>
</template>

<script>
  import axios from 'axios'
  import {getAudit,getApply} from '../../api/applicant'
  const applicatStatusMap = {
    0: '驳回申请',
    1: '等待审核',
    2: '审核通过'
  }
    export default {
      data(){
        return {
          applyColumns: [
            {
              title: '申请人',
              key: 'applicantName',
              width: 100,
              fixed: 'left',
              render: (h, params) => {
                let row = params.row
                return h('p',{
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      let reason =  row.applicant_reason || '就是想放个假'  // 没写理由的默认值
                      this.show(reason)
                    }
                  }
                },row.applicantName)
              }
            },
            {
              title: '审批人',
              key: 'auditorName',
              width: 100
            },
            {
              title: '开始时间',
              key: 'beginTime',
              align: 'center',
              width: 300
            },
            {
              title: '结束时间',
              key: 'endTime',
              align: 'center',
              width: 300
            },
            {
              title: '状态',
              key: 'status',
              align: 'center',
              width: 130,
              render: (h, params) => {
                let status = params.row.status
                let stat = applicatStatusMap[status]
                if(status == 0){
                  // 审核驳回
                  return h('strong', {
                    style: {
                      color: 'red'
                    }
                  },stat)
                }else if(status == 1){
                  // 等待审核
                  return h('strong', {
                    style: {
                      color: 'green'
                    }
                  },stat)
                }else{
                  // 审核通过
                  return h('strong', {
                    style: {
                      color: 'blue'
                    }
                  },stat)
                }
              }
            },
            {
              title: "操作",
              key: "action",
              width: 100,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                let status = params.row.status
                if (status == 1) {
                  return h('Button', {
                    props: {
                      type: 'info',
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index)
                      }
                    }
                  }, "撤回")
                }
              }
            }
          ],
          auditColumns: [
            {
              title: '申请人',
              key: 'applicantName',
              width: 100,
              fixed: 'left'
            },
            {
              title: '审批人',
              key: 'auditorName',
              width: 100,
              render: (h, params) => {
                let row = params.row
                return h('p',{
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      let reason =  row.auditor_reason || '审批人很懒，没写理由！'  // 没写理由的默认值
                      this.show(reason)
                    }
                  }
                },row.auditorName)
              }
            },
            {
              title: '开始时间',
              key: 'beginTime',
              align: 'center',
              width: 300
            },
            {
              title: '结束时间',
              key: 'endTime',
              align: 'center',
              width: 300
            },
            {
              title: '状态',
              key: 'status',
              align: 'center',
              width: 130,
              render: (h, params) => {
                let status = params.row.status
                let stat = applicatStatusMap[status]
                if(status == 0){
                  // 审核驳回
                  return h('strong', {
                    style: {
                      color: 'red'
                    }
                  },stat)
                }else if(status == 1){
                  // 等待审核
                  return h('strong', {
                    style: {
                      color: 'green'
                    }
                  },stat)
                }else{
                  // 审核通过
                  return h('strong', {
                    style: {
                      color: 'blue'
                    }
                  },stat)
                }
              }
            },
            {
              title: "操作",
              key: "action",
              width: 140,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                let status = params.row.status
                if (status == 1) {
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
                          this.approve(params.row)
                        }
                      }
                    }, '批准'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.reject(params.row)
                        }
                      }
                    }, '驳回')
                  ]);
                }
              }
            }
          ],
          applyData: [],
          auditData: [],
          loading: false
        }
      },
      computed: {
        aid(){
          return  this.$store.getters.uid
        }
      },
      mounted() {
        this.init()
      },
      methods: {
        init(){
          this.loading = true
          let aid = this.aid
          // 这个放在 api中 我获取只能得到一个 （不放这里 在api进行数据封装也可以就是有点麻烦）
          // 直接用axiosServices 显示没有all方法 有点奇怪 所以直接导入axios
          axios.all([getApply(aid),getAudit(aid)]).then(axios.spread((apply,audit)=>{
            // console.log(apply)
            // console.log(audit)
            this.applyData = apply.data.list
            this.auditData = audit.data.list
          }))
          this.loading = false
        },
        show (reason) {
          this.$Modal.info({
            title: '申请理由',
            content: "<p>" + reason + "</p>"
          })
        },
        // 撤销申请
        remove (index) {
          this.applyData.splice(index, 1);
        },
        // 批准申请
        approve(row){

        },
        // 驳回申请
        reject(row){

        }
      }
    }
</script>

<style scoped>
  .table-top {
    margin: 20px auto;
  }
  .table-title {
    font-size: 24px;
    font-weight: 400;
    margin-right: 10px;
  }
</style>
