<template>
    <div>
      <Row style="margin-top: 30px;">
        <Col span="9" offset="2" >
          <Form :model="Mime" label-position="left" :label-width="80">
            <FormItem label="ID">
              <Input v-model="Mime.eid" :readonly="isEdit" size="large"/>
            </FormItem>
            <FormItem label="名字">
              <Input v-model="Mime.name" :readonly="isEdit" size="large"/>
            </FormItem>
            <FormItem label="年龄">
              <Input v-model="Mime.age" :readonly="isEdit" size="large"/>
            </FormItem>
            <FormItem label="密码">
              <Input v-model="Mime.password" type="password" :readonly="isEdit"/>
            </FormItem>
            <FormItem label="地址">
              <Input v-model="Mime.address" :readonly="isEdit" size="large"/>
            </FormItem>
            <FormItem label="电话">
              <Input v-model="Mime.phone" :readonly="isEdit" size="large"/>
            </FormItem>
            <FormItem label="部门">
              <Input v-model="Mime.department" :disabled="isDisabled" size="large"/>
            </FormItem>
            <FormItem label="职位">
              <Input v-model="Mime.role" :disabled="isDisabled" size="large"/>
            </FormItem>
            <FormItem label="入职时间">
              <Input v-model="Mime.arrive" :disabled="isDisabled" size="large"/>
            </FormItem>
            <FormItem style="margin-top: 20px;">
              <Button type="primary" icon="wrench">修改</Button>
              <Button type="ghost" icon="folder" style="margin-left: 8px">保存</Button>
            </FormItem>
          </Form>
        </Col>

        <Col span="9" offset="2">
          <img :src="Mime.img" class="info-img"/>
          <p class="personal">个性宣言</p>
          <Input v-model="Mime.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                style="width: 60%;margin-top: 20px;" :readonly="isEdit"/>
        </Col>
      </Row>
    </div>
</template>

<script>
  import { findEmployee } from '../../api/employee'
  const roleMap = {
    3: '总监',
    2: '经理',
    1: '组员'
  }
  const departmentMap = {
    1: '研发部',
    2: '业务部',
    3: '后勤部',
    4: '人事部'
  }
    export default {
      data(){
        return {
          Mime: {
            eid: null,
            name: null,
            age: null,
            img: null,
            desc: '',
            password: '',
            address: '',
            phone: '',
            department: null,
            role: null,
            arrive: null
          },
          isEdit: true,  // 自己可修改
          isDisabled:true  // 自己不可修改上司才可以
        }
      },
      computed: {
        user(){
          return  this.$store.state.user
        }
      },
      created(){
        this.initPerson()
      },
      methods: {
        initPerson(){
          // console.log(this.user)
          let eid = this.user.uid
          let nowEm = {
            eid: eid
          }
          findEmployee(nowEm).then(res=>{
            let data = res.data
            if(data.isExist){
              let mime = this.Mime
              mime.eid = data.list[0].eid
              mime.name = data.list[0].name
              mime.age = data.list[0].age
              mime.img = data.list[0].img || ''
              mime.desc = data.list[0].desc || '大家好'
              mime.password = data.list[0].password
              mime.address = data.list[0].address
              mime.phone = data.list[0].phone
              let department = data.list[0].department
              mime.department = departmentMap[department]
              let role = data.list[0].role
              mime.role = roleMap[role]
              mime.arrive = data.list[0].arrive
            }
          })
        }
      }
    }
</script>

<style scoped>
  .info-img {
    width: 60%;
    height: 400px;
    border: 2px solid #d8ffe1;
    box-shadow: 0 0 2px 2px #95e3c9;
    border-radius: 4px;
  }
  .personal {
    font-size: 24px;
    display: block;
    margin-top: 24px;
    margin-bottom: 16px;
    color: #a72ce3;
  }
</style>
