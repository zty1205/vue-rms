<template>
    <div id="addUserCon">
      <Row style="margin-top: 100px" v-if="auth > 2" >
        <Col span="8" offset="8">
          <Form :model="NewUser" ref="NewUser" label-position="left" :label-width="80" :rules="ruleValidate">

            <FormItem label="ID" prop="uid">
              <Row>
                <Col span="20">
                  <Input v-model="NewUser.uid" type="text" @on-focus="handleReset('NewUser')" @on-blur="vName()" size="large"/>
                </Col>
                <Col span="2" offset="2">
                  <Icon v-show="isShow" type="checkmark-round" color="green" size="30"></Icon>
                  <Icon v-show="defeat" type="close-round" color="green" size="30"></Icon>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="Name" prop="name">
              <Row>
                <Col span="20">
                  <Input v-model="NewUser.name" size="large" readonly="readonly"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="新密码" prop="password">
              <Row>
                <Col span="20">
                  <Input v-model="NewUser.password" type="password" size="large" :disabled="!isShow"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="Email" prop="email">
              <Row>
                <Col span="20">
                <Input v-model="NewUser.email" size="large" :disabled="!isShow"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="权限" prop="authorization">
              <Row>
                <Col span="20">
                  <Select v-model="NewUser.authorization" size="large" :disabled="!isShow">
                    <Option value="1">1 级权限 - 组员</Option>
                    <Option value="2">2 级权限 - 经理</Option>
                    <Option value="3" v-show="auth > 3">3 级权限 - 总监</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="20">
                  <Button type="primary"  @click="handleSubmit('NewUser')" :disabled="!isShow">Submit</Button>
                  <Button type="ghost" @click="handleReset('NewUser')" style="margin-left: 8px">Cancel</Button>
                </Col>
              </Row>
            </FormItem>
            <!-- 头像先不加 -->
          </Form>
        </Col>
      </Row>
      <p v-else class="no-au">对不起，你没有操作权限</p>
    </div>
</template>

<script>
  import {findEmployeeById} from '../../api/employee'
  import user from '../../api/user'
    export default {
      data(){
        return {
          NewUser: {
            uid: '',
            name: null,
            password: null,
            email: null,
            authorization: null,
            avatar_url: null, // 头像
            role: null // 职位
          },
          isShow: false,
          defeat: false,
          ruleValidate: {
            uid: [
              {required: true, message: 'The uid cannot be empty', trigger: 'change'}
            ],
            name: [
              {required: true, message: 'The name cannot be empty', trigger: 'change'}
            ],
            password: [
              {required: true, message: 'The password cannot be empty', trigger: 'change'}
            ],
            email: [
              {required: true, message: 'The email cannot be empty', trigger: 'change'}
            ],
            authorization: [
              {required: true, message: 'Please select authorization', trigger: 'change'}
            ],
          }
        }
      },
      computed: {
        auth(){  // 权限判断
          return this.$store.getters.authorization
        }
      },
      methods: {
        vName(){
          let id = this.NewUser.uid
          findEmployeeById(id).then(res => {
            // console.log(res)
            let data = res.data
            if(data.isExist){
              this.isShow = true
              this.defeat = false
              let user = this.NewUser
              let em = data.list[0]
              user.name = em.name
              user.password = em.password
              user.email = em.email
            }else {
              this.isShow = false
              this.defeat = true
              this.$Message.error('该员工不存在，请重新输入');
            }
          })
        },
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              // console.log(this.NewUser)
              let AppUser = this.$store.getters.user // 用户
                // 将用户和新添加的用户信息都发送过去
              let info = {
                User: AppUser,
                NewUser: this.NewUser
              }
              user.register(info).then(res => {
                console.log(res)
                let data = res.data
                if(data && data.success){
                  this.$Notice.success({
                    title: '用户注册',
                    desc: '用户注册成功，稍后会将账户信息发送该员工到邮箱。'
                  });
                }else {
                  this.$Notice.error({
                    desc: '用户注册失败。'
                  });
                }
              })
            }
          })
        },
        handleReset (name) {
          // console.log('cancel')
          this.$refs[name].resetFields();
        }
      }
    }
</script>

<style scoped>
.form-container {
  width: 40%;
  margin: 10px auto;
}
  .no-au {
    font-size: 40px;
    margin: 100px auto;
    color: red;
  }
</style>
