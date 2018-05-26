<template>
  <div>
    <div v-if='authorization > 1'>
      <Form :model="employeeForm" ref="employeeForm" label-position="left" class="add-form" :label-width="100" :rules="ruleValidate">

        <Row>
          <Col span="9" offset="2">
          <FormItem label="姓名" prop="name">
            <Input size="large" class="add-form-input" v-model="employeeForm.name" placeholder="Enter name..."/>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="密码" prop="password">
            <Input size="large" type="password" class="add-form-input" v-model="employeeForm.password" placeholder="Enter password..."/>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="地址" prop="address">
            <Input size="large" class="add-form-input" v-model="employeeForm.address" placeholder="Enter address..."/>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="电话" prop="phone">
            <Input size="large" class="add-form-input" v-model="employeeForm.phone" placeholder="Enter phone..."/>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="国籍" prop="city">
            <Input size="large" class="add-form-input" v-model="employeeForm.city" placeholder="Enter address..."/>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="学籍" prop="doctor">
            <Input size="large" class="add-form-input" v-model="employeeForm.doctor" placeholder="Enter phone..."/>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="一级部门" prop="department">
            <Select size="large" v-model="employeeForm.department" @on-change="getSubDP">
              <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="二级部门" prop="subD">
            <Select  size="large" v-model="employeeForm.subD">
              <Option v-for="item in subDList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="入职时间" prop="arrive">
            <DatePicker size="large" type="datetime" placeholder="Select date" v-model="employeeForm.arrive"></DatePicker>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="Email" prop="email">
            <Input size="large" v-model="employeeForm.email" placeholder='请输入邮箱'/>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="性别" prop="gender">
            <RadioGroup size="large" v-model="employeeForm.gender">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="年龄" prop="age">
            <Slider size="large" v-model="employeeForm.age" :min="18" :max="130" show-input></Slider>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="9" offset="2">
          <FormItem label="职位" prop="role">
            <RadioGroup size="large" v-model="employeeForm.role">
              <Radio label="1">组员</Radio>
              <Radio label="2">经理</Radio>
              <Radio label="3" :disabled="authorization <= 3">总监</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="角色" prop="role">
            <RadioGroup size="large" v-model="employeeForm.status">
              <Radio label="1">正式员工</Radio>
              <Radio label="3">实习生</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>




        <!--图片和头像 先不考虑-->
        <!--<FormItem style="margin-top: 60px">-->
        <!--<label class="photo-label">头像</label>-->
        <!--<div class="demo-upload-list" v-for="item in uploadList">-->
        <!--<template v-if="item.status === 'finished'">-->
        <!--<img :src="item.url">-->
        <!--<div class="demo-upload-list-cover">-->
        <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)" size="30"></Icon>-->
        <!--<Icon type="ios-trash-outline" @click.native="handleRemove(item)" size="30"></Icon>-->
        <!--</div>-->
        <!--</template>-->
        <!--<template v-else>-->
        <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
        <!--</template>-->
        <!--</div>-->
        <!--<Upload-->
        <!--ref="upload"-->
        <!--:show-upload-list="false"-->
        <!--:default-file-list="defaultList"-->
        <!--:on-success="handleSuccess"-->
        <!--:format="['jpg','jpeg','png']"-->
        <!--:max-size="2048"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:on-exceeded-size="handleMaxSize"-->
        <!--:before-upload="handleBeforeUpload"-->
        <!--multiple-->
        <!--type="drag"-->
        <!--action="//jsonplaceholder.typicode.com/posts/"-->
        <!--style="display: inline-block;width:158px;">-->
        <!--<div style="width: 158px;height:158px;line-height: 158px;">-->
        <!--<Icon type="camera" size="100" style="margin-top: 30px;"></Icon>-->
        <!--</div>-->
        <!--</Upload>-->
        <!--<Modal title="View Image" v-model="visible">-->
        <!--<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">-->
        <!--</Modal>-->
        <!--</FormItem>-->
        <!---->

        <div class="form-btn">
          <Button type="primary" @click="handleSubmit('employeeForm')">Submit</Button>
          <Button type="ghost" @click="handleReset('employeeForm')" style="margin-left: 18px">Cancel</Button>
        </div>

      </Form>
    </div>
    <div v-else>
      <p class="no-author">你不具有添加的权限</p>
    </div>
  </div>
</template>

<script>
  import { addEmployee } from '../../api/employee'
  import { findDepartmentByID } from  '../../api/department'
  export default {
    data(){
      return {
        employeeForm: {
          eid: "YF100010",
          name: '',
          password: '',
          phone: '',
          address: '',
          email: '',
          gender: '',
          age: 18,
          arrive: '',
          department: '',
          subD: '',
          role: '',
          status: '',
          city: '',
          doctor: ''
        },
        departmentList: [],
        subDList: [],
        // 表单验证
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'The password cannot be empty', trigger: 'blur'},
          ],
          address: [
            {required: true, message: 'The address cannot be empty', trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'The email cannot be empty', trigger: 'blur'},
            {type: 'email',message: 'Please input the correct email', trigger: 'blur' }
          ],
          department: [
            {required: true, message: 'Please select department', trigger: 'blur'}
          ],
          subD: [
            {required: true, message: 'Please select subD', trigger: 'blur'}
          ],
          role: [
            {required: true, message: 'Please select role', trigger: 'blur'}
          ],
          status: [
            {required: true, message: 'Please select status', trigger: 'blur'}
          ],
          city: [
            {required: true, message: 'Please input city', trigger: 'blur'}
          ],
          doctor: [
            {required: true, message: 'Please input doctor', trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      this.initDP()
    },
    computed: {
      authorization(){
        return this.$store.getters.authorization
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let em = this.employeeForm
            addEmployee(em).then( res => {
              let data = res.data
              if(data && data.success){
                // 员工添加成功
                this.$Notice.success({
                  title: '添加员工',
                  render: h => {
                    return h('div',[
                      h('a',data.list.name),
                      h('span', '的信息已成功录入系统')
                    ])
                  }
                });
                this.$refs[name].resetFields();
              }else {
                // 员工添加失败
                this.$Notice.success({
                  title: '添加员工',
                  desc: '员工添加成功！'
                });
                this.$refs[name].resetFields();
              }
            })
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 初始化 以及部门下拉选项
      initDP(){
        let did = '0001'
        this.departmentList = []
        findDepartmentByID(did).then(res => {
          // console.log(res)
          let data = res.data
          if(data.list){
            let list = data.list
            for(let i=0; i < list.length; i++){
              let departInfo = list[i]
              let ele = {
                label: departInfo.name,
                value: departInfo.did
              }
              this.departmentList.push(ele)
            }
          }
        })
      },
      getSubDP(value){ // 默认返回value 这里返回的是部门的id
        // console.log(value)
        this.subDList = []
        findDepartmentByID(value).then(res => {
          // console.log(res)
          let data = res.data
          if(data.list){
            let list = data.list
            for(let i=0; i < list.length; i++){
              let departInfo = list[i]
              let ele = {
                label: departInfo.name,
                value: departInfo.did
              }
              this.subDList.push(ele)
            }
          }else {
            console.log('数据库获取数据失败')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .add-form {
    width: 100%;
    margin-top: 120px;
  }
  .add-form-input {
    /*width: 70%;*/
    /*border: 1px solid red;*/
  }
  .add-form-label {
    font-size: 12px;
    color: #495060;
  }
  .form-btn {
    margin-top: 60px;
  }
  .photo-label {
    font-size: 30px;
    margin-right: 40px;
    margin-left: 20px;
    float: left;
  }
.no-author {
  font-size: 60px;
  display: block;
  margin: 100px auto;
  color: red;
}
</style>
