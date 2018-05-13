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
      <FormItem style="margin-top: 60px">
        <label class="photo-label">头像</label>
        <div class="demo-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)" size="30"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)" size="30"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:158px;">
          <div style="width: 158px;height:158px;line-height: 158px;">
            <Icon type="camera" size="100" style="margin-top: 30px;"></Icon>
          </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </FormItem>
      <!---->

      <div class="form-btn">
        <Button type="primary" @click="handleSubmit('employeeForm')">Submit</Button>
        <Button type="ghost" @click="handleSubmit('employeeForm')" style="margin-left: 18px">Cancel</Button>
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
        },
        // 图片 上传
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    mounted () {
      // 初始化上传
      this.uploadList = this.$refs.upload.fileList;
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
      },
      // 图片上传 处理
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
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
.form-btn {
  margin-top: 60px;
}
.photo-label {
  font-size: 30px;
  margin-right: 40px;
  margin-left: 20px;
  float: left;
}
  /* 图片上传相关 */
  .demo-upload-list{
    display: inline-block;
    width: 160px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
