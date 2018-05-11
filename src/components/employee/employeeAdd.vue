<template>
  <Row>
    <Col>
      <Form :model="employeeForm" ref="employeeForm" class="add-form">
      <!-- 姓名 和 初始密码-->
      <FormItem>
        <Row>
          <Col span="2">
          <label class="add-form-label">姓名</label>
          </Col>
          <Col span="10">
          <Input size="large" class="add-form-input" v-model="employeeForm.name" placeholder="Enter name..."/>
          </Col>
          <Col span="2">
          <label class="add-form-label">初始密码</label>
          </Col>
          <Col span="10">
          <!-- 初始密码 -->
          <Input size="large" type="password" class="add-form-input" v-model="employeeForm.password" placeholder="Enter password..."/>
          </Col>
        </Row>
      </FormItem>
      <!--电话和地址-->
      <FormItem>
        <Row>
          <Col span="2">
          <label class="add-form-label">联系电话</label>
          </Col>
          <Col span="10">
          <Input size="large" class="add-form-input" v-model="employeeForm.phone" placeholder="Enter phone..."/>
          </Col>
          <Col span="2">
          <label class="add-form-label">家庭地址</label>
          </Col>
          <Col span="10">
          <Input size="large" class="add-form-input" type="password" v-model="employeeForm.address" placeholder="Enter address..."/>
          </Col>
        </Row>
      </FormItem>
      <!--性别和年龄-->
      <FormItem>
        <Row>
          <Col span="2">
          <label class="add-form-label">性别</label>
          </Col>
          <Col span="10">
          <RadioGroup size="large" v-model="employeeForm.gender">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
          </Col>
          <Col span="2">
          <label class="add-form-label">年龄</label>
          </Col>
          <Col span="10">
          <Slider size="large" v-model="employeeForm.age" :min="18" :max="130" show-input></Slider>
          </Col>
        </Row>
      </FormItem>
      <!-- 入职时间 默认now-->
      <FormItem>
        <Row>
          <Col span="2">
          <label class="add-form-label">入职时间</label>
          </Col>
          <Col span="4">
          <DatePicker size="large" type="date" placeholder="Select date" v-model="employeeForm.date"></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="4">
          <TimePicker size="large" type="time" placeholder="Select time" v-model="employeeForm.time"></TimePicker>
          </Col>
          <Col span="2">
          <label class="add-form-label">职位</label>
          </Col>
          <Col span="10">
          <RadioGroup size="large" v-model="employeeForm.department">
            <Radio label="1">组员</Radio>
            <Radio label="2">经理</Radio>
            <Radio label="3" :disabled="authorization <= 3">总监</Radio>
          </RadioGroup>
          </Col>
        </Row>
      </FormItem>
      <!-- 部门  -->
      <FormItem>
        <Row>
          <Col span="2">
          <label class="add-form-label">一级部门</label>
          </Col>
          <Col span="10">
          <Select size="large" v-model="employeeForm.department">
            <Option value="1">研发部</Option>
            <Option value="2" >业务部</Option>
            <Option value="3" >后勤部</Option>
            <Option value="4" >人事部</Option>
          </Select>
          </Col>
          <Col span="2">
          <label class="add-form-label">二级部门</label>
          </Col>
          <Col span="10">
          <Select  size="large" v-model="employeeForm.department">
            <Option value="1">研发部</Option>
            <Option value="2" >业务部</Option>
            <Option value="3" >后勤部</Option>
            <Option value="4" >人事部</Option>
          </Select>
          </Col>
        </Row>

      </FormItem>

      <!--图片和头像 先不考虑-->

      <div class="form-btn">
        <Button type="primary" @click="handleSubmit('employeeForm')">Submit</Button>
        <Button type="ghost" @click="handleSubmit('employeeForm')" style="margin-left: 8px">Cancel</Button>
      </div>

    </Form>
    </Col>
  </Row>
</template>

<script>
  export default {
    data(){
      return {
        employeeForm: {
          name: '',
          password: '',
          phone: '',
          address: '',
          gender: '',
          age: null,
          date: null,
          time: null,
          department: null,
          role: ''
        }
      }
    },
    computed: {
      authorization(){
        return this.$store.getters.authorization
      }
    },
    methods: {
      handleSubmit (name) {
        this.$Message.success('Success!');
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>
  .add-form {
    width: 100%;
  }
  .add-form-input {
    /*width: 70%;*/
    /*border: 1px solid red;*/
  }
  .add-form-label {
    font-size: 12px;
    color: #495060;
  }
</style>
