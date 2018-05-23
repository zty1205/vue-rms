<template>
    <div>
      <Row>
        <Col span="10" offset="1">
          <div class="table-top">
            <span class="table-title" >我发起的</span>
            <Icon type="paper-airplane" size="24"></Icon>

            <Button type="dashed" class="applicant-btn" @click="applicant">
              <Icon type="ios-redo-outline" size="22"></Icon>
              申请
            </Button>
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

      <!-- 添加申请的模态框 -->
      <Modal v-model="modal" title="请假申请" :loading="modalLoading" @on-cancel="AppCancel('newAppForm')" @on-ok="AppOK('newAppForm')">
        <Form :model="newAppForm" :label-width="100" ref="newAppForm">
          <FormItem label="开始时间" prop="beginTime">
            <DatePicker type="datetime" v-model="newAppForm.beginTime"
                        format="yyyy-MM-dd HH:mm" style="width: 200px">
            </DatePicker>
          </FormItem>
          <FormItem label="结束时间" prop="endTime">
            <DatePicker type="datetime" v-model="newAppForm.endTime"
                        format="yyyy-MM-dd HH:mm" style="width: 200px">
            </DatePicker>
          </FormItem>
          <FormItem label="申请理由" prop="applicant_reason">
            <Input v-model="newAppForm.applicant_reason" type="textarea" placeholder="请输入请假理由"></Input>
          </FormItem>
        </Form>
      </Modal>

    </div>
</template>

<script>
  import axios from 'axios'
  import {getAudit,getApply, changeApplicantStatus, addApplicant} from '../../api/applicant'
  const applicatStatusMap = {
    '-1': '申请驳回',
    '0': '已撤回',
    '1': '等待审核',
    '2': '审核通过'
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
              width: 140,
              render: (h, params) => {
                let status = params.row.status
                let stat = applicatStatusMap[status]
                if(status == '-1'){
                  // 审核驳回
                  return h('strong', {
                    style: {
                      color: 'red'
                    }
                  },stat)
                }else if(status == '0'){
                  // 已撤回
                  return h('strong', {
                    style: {
                      color: 'silver'
                    }
                  },stat)
                }else if(status == '1'){
                  // 等待审核
                  return h('strong', {
                    style: {
                      color: 'blue'
                    }
                  },stat)
                }else if(status == '2'){
                  // 审核通过
                  return h('strong', {
                    style: {
                      color: 'green'
                    }
                  },stat)
                }
              }
            },
            {
              title: "操作",
              key: "action",
              width: 180,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                let status = params.row.status
                if (status == '-1') { // 已驳回 可以重新提交或删除
                  return h('div',[
                    h('Button', {
                      props: {
                        type: 'info',
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.changeStatus(params.row, 1)
                        }
                      }
                    }, '重新提交'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: "small"
                      },
                      style: {
                        marginLeft: '5px'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除')
                    ]
                  )
                } else if (status == '0') { // 已撤回 可以重新提交
                  return h('div',[
                    h('Button', {
                      props: {
                        type: 'info',
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.changeStatus(params.row, 1)
                        }
                      }
                    }, '重新提交'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: "small"
                      },
                      style: {
                        marginLeft: '5px'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除')
                  ])
                } else if (status == '2'){
                  // 申请通过 可以撤回
                  return h('Button', {
                    props: {
                      type: 'info',
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.changeStatus(params.row, 0)
                      }
                    }
                  }, '撤回')
                } else {
                  // 等待的 可以取消
                  return h('Button', {
                    props: {
                      type: 'ghost',
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index)
                      }
                    }
                  }, '取消')
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
              width: 140,
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
                if (status == '1') {
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
                          this.changeStatus(params.row, 2)
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
                          this.changeStatus(params.row, -1)
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
          loading: false,  // 表格的加载
          modal: false, // 模态框显示
          modalLoading: false, // 模态框异步加载
          newAppForm: { // 新的申请条  对时间进行判断 1 小的作为开始时间 2 使用验证器
            beginTime : '',
            endTime : '',
            applicant_reason : "",
            applicantId: '',
            applicantName: '',
            auditorName: 'zty',
            auditorId: '100001',
            status: '1'
          }
        }
      },
      computed: {
        aid(){
          return  this.$store.getters.uid
        },
        user(){
          return this.$store.getters.user
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
        // 发起申请
        applicant() {
          let aid = this.aid
          // console.log(aid)
          this.modal = true
        },
        // 模态框确定的回调函数
        AppOK (name) {
          // console.log(this.newAppForm)
          let form = this.newAppForm
          // 先写死审批人  可以使用员工id前缀 利用模糊查询来找到员工的上级 或者 zty
          form.qid = '000010'
          let Uid = this.user.uid
          let Uname = this.user.name
          // console.log(user)
          form.applicantId = Uid + ''
          form.applicantName = Uname + ''
          // console.log(form)
          addApplicant(form).then(res => {
            // console.log(res)
            let data = res.data
            if(data.success){
              // 添加成功 显示消息 并刷新列表
              this.$Message.success('你的请假条已提交，正在等待审核。');
              this.loading = true
              this.init()
            }else {
              this.$Message.error('请假条提交失败，请重试。');
            }
            this.$refs[name].resetFields();
            this.modal = false;
          })
        },
        // 模态框取消的回调函数
        AppCancel(name){
          this.$refs[name].resetFields();
          this.modal = false
        },
        // 撤销申请
        remove (index) {
          this.applyData.splice(index, 1);
        },
        // 更改请假条状态
        changeStatus(row, status){
          console.log(row)
          let qid = row.qid
          changeApplicantStatus(qid, status).then(res => {
            let data = res.data
            // console.log(res)
            if(data.success){
              // 修改状态成功
              this.loading = true
              this.init()
              this.$Message.success('请假条状态已修改！');
            }else {
              this.$Message.error('更改请假条失败，请重试。');
            }
          })
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
  .applicant-btn {
    float: right;
  }
</style>
