<template>
    <Row>
      <Col span="22" offset="1">
        <Form :model="employeeForm" :label-width="110" label-position="left" ref="employeeForm" class="add-form">
        <!-- 姓名-->
        <FormItem>
          <Row :gutter="16">
            <Col span="11" style="border: 1px solid blue;">
              <label class="add-form-label">名字</label>
              <Input class="add-form-input" v-model="employeeForm.name" placeholder="Enter name..."/>
            </Col>
            <Col span="11" offset="2" style="border: 1px solid blue;">
              <label class="add-form-label">初始密码</label>
              <Input type="password" class="add-form-input" v-model="employeeForm.password" placeholder="Enter password..."/>
            </Col>
          </Row>

        </FormItem>
        <!-- 密码 -->
        <FormItem label="初始密码">

        </FormItem>
        <!-- 电话-->
        <FormItem label="电话">
          <Input v-model="employeeForm.phone" placeholder="Enter your phone..."></Input>
        </FormItem>
        <!-- 地址 -->
        <FormItem label="地址">
          <Input type="password" v-model="employeeForm.address" placeholder="Enter your address..."></Input>
        </FormItem>
          <!-- 入职时间 默认now-->
        <FormItem label="入职时间">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="Select date" v-model="employeeForm.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="employeeForm.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <!-- 部门  -->
        <FormItem label="部门">
          <Select v-model="employeeForm.department">
            <Option value="1">研发部</Option>
            <Option value="2" >业务部</Option>
            <Option value="3" >后勤部</Option>
            <Option value="4" >人事部</Option>
          </Select>

        </FormItem>
          <!-- 职位 -->
        <FormItem label="职位">
          <RadioGroup v-model="employeeForm.department">
            <Radio label="1">组员</Radio>
            <Radio label="2">经理</Radio>
            <Radio label="3" :disabled="authorization <= 3">总监</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 性别 -->
        <FormItem label="性别">
          <RadioGroup v-model="employeeForm.gender">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 年龄  -->
        <FormItem label="Age">
          <Slider v-model="employeeForm.age" :min="18" :max="130" show-input></Slider>
        </FormItem>


        <!--图片和头像 先不考虑-->




        <FormItem>
          <Button type="primary" @click="handleSubmit('employeeForm')">Submit</Button>
          <Button type="ghost" @click="handleSubmit('employeeForm')" style="margin-left: 8px">Cancel</Button>
        </FormItem>
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
    width: 70%;
    border: 1px solid red;
  }
  .add-form-label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #495060;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
  }
</style>
