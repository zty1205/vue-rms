<template>
  <transition>
    <div class="maskFrom">
      <div class="mask"></div>
      <Form :model="employeeForm" :label-width="80" ref="employeeForm">
        <!-- 姓名 非空 展示-->
        <FormItem label="Name">
          <Input v-model="employeeForm.name" placeholder="Enter your name..."></Input>
        </FormItem>
        <!-- 密码 非空 -->
        <FormItem label="Password">
          <Input type="password" v-model="employeeForm.password" placeholder="Enter your password..."></Input>
        </FormItem>
        <!-- 电话 非空 便于联系 展示-->
        <FormItem label="Phone">
          <Input v-model="employeeForm.phone" placeholder="Enter your phone..."></Input>
        </FormItem>
        <!-- 地址 -->
        <FormItem label="Address">
          <Input type="password" v-model="employeeForm.address" placeholder="Enter your address..."></Input>
        </FormItem>
        <!-- 性别 排序 展示-->
        <FormItem label="Gender">
          <RadioGroup v-model="employeeForm.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 年龄 展示 排序 -->
        <FormItem label="Age">
          <Slider v-model="employeeForm.age" :min="18" :max="130" show-input></Slider>
        </FormItem>
        <!-- 部门 展示 排序 -->
        <FormItem label="Department">
          <RadioGroup v-model="employeeForm.department">
            <Radio label="directorate" disabled>Directorate</Radio>
            <Radio label="development">Development</Radio>
            <Radio label="business">Business</Radio>
            <Radio label="human">Human</Radio>
            <Radio label="logistics">Logistics</Radio>
          </RadioGroup>
        </FormItem>

        <!--图片和头像 先不考虑-->

        <!-- 入职时间 默认now 展示 排序-->
        <FormItem label="Registration_Date">
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

        <FormItem>
          <Button type="primary" @click="handleSubmit('employeeForm')">Submit</Button>
          <Button type="ghost" @click="handleSubmit('employeeForm')" style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </div>


  </transition>

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
          }
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
  .maskFrom{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 800px;
    margin: 10px auto;
    z-index: 1000;
    border: 1px solid red;
  }
  .mask{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: rgba(55,55,55,.6);
     height: 100%;
     opacity: .5;
     z-index: 0;
   }
</style>
