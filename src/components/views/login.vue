<template>
  <div class="wrap">
    <div class="container">
      <h1>Welcome ZTY-RMS</h1>
      <Form ref="loginForm" :model="loginForm" :label-width="100" label-position="left" :rules="loginValidate">

        <FormItem label="ID" prop="uid">
          <Input v-model="loginForm.uid" size="large" placeholder="Please enter your uid ......" />
        </FormItem>

        <FormItem label="Password" prop="password">
          <Input v-model="loginForm.password" type="password" size="large" placeholder="Please enter your password ......" auto-complete="off"/>
        </FormItem>

        <FormItem label="Remember?">
          <i-switch v-model="rememberMe" size="large" class="remember-switch">
            <span slot="open">Yes</span>
            <span slot="close">No</span>
          </i-switch>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('loginForm')">Submit</Button>
          <Button type="info" @click="handleReset('loginForm')" style="margin-left: 8px">Reset</Button>
        <!-- 忘记密码 再说 -->
        </FormItem>
      </Form>
    </div>
    <!-- 登录界面的动画 css3 线性渐变 动画等 -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  import User from '../../api/user'
  export default {
    data(){
      return {
        loginForm: {
          uid: '',
          password: ''
        },
        loginValidate: {   // 登录前端验证
          uid: [
            { required: true, message: 'The uid cannot be empty', trigger: 'blur' }  // 失去焦点
          ],
          password: [
            { required: true, message: 'The password cannot be empty', trigger: 'blur' }
          ],
        },
        rememberMe: false
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let user = this.loginForm
            User.login(user).then(res => {
              // console.log('res'+res)
              if(!this.rememberMe){
                user.uid = '';
                user.password = ''
              }
              let data = res.data
              if(data && data.success){
                console.log('login success')
                // to do  存储登录信息 到store
                this.$Message.loading({
                  top: 200,
                  content: '正在登录，请稍后 ...',
                  duration: 2,     // load框显示2秒
                  onClose: () => {  //  关闭时的回调
                    // 路由跳转
                    console.log('close in router dump')
                    this.$router.push({path: '/index'})
                  }
                })
                // vuex store 存储处理
                let saveUser = data.info
                this.$store.commit('SET_LOGIN_USER',saveUser) // 用vue-devtools 可以看到vuex里的数据
              }else {
                this.$Message.error({
                  content: '该用户不存在，请重试 ...',
                  duration: 1
                })
              }
            })
          } else {
            this.$Message.error('Please input valid information');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font: 16px/20px microsft yahei;
  }
  .wrap {
    width: 700px;
    height: 400px;
    padding: 40px 0;
    position: fixed;
    top: 50%;
    margin-top: -200px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    opacity: 0.8;
    background: linear-gradient(to bottom right,#50a3a2,#53e3a6);
    background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);
  }
  .container {
    width: 60%;
    margin: 0 auto;
  }
  .container h1 {
    margin-bottom: 40px;
  }
  .ivu-form-item {
    /* 覆盖iview原本的样式 */
    margin-bottom: 34px;
    vertical-align: top;
    zoom: 1;
  }
  .remember-switch {
    float: left;
    margin-top: 4px;
  }
  .container h1 {
    text-align: center;
    color: #FFFFFF;
    font-weight: 500;
  }
  .wrap ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
  }
  .wrap ul li {
    list-style-type: none;
    display: block;
    position: absolute;
    bottom: -120px;
    width: 15px;
    height: 15px;
    z-index: -8;
    background-color:rgba(255, 255, 255, 0.15);
    animotion: square 25s 10;
    -webkit-animation: square 25s 10;
  }
  .wrap ul li:nth-child(1) {
    left: 0;
    width: 30px;
    height: 30px;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .wrap ul li:nth-child(2) {
    left: 20%;
    width: 45px;
    height: 45px;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .wrap ul li:nth-child(3) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .wrap ul li:nth-child(4) {
    left: 60%;
    width: 40px;
    height: 40px;
    animation-duration: 8s;
    -moz-animation-duration: 8s;
    -o-animation-duration: 8s;
    -webkit-animation-duration: 8s;
  }
  .wrap ul li:nth-child(5) {
    width: 100px;
    height: 100px;
    left: 80%;
    animation-duration: 16s;
    -moz-animation-duration: 16s;
    -o-animation-duration: 16s;
    -webkit-animation-duration: 16s;
  }

  @keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 400px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
  @-webkit-keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 400px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
</style>

