<template>
    <Row>
        <Col span="12">
            <span style="text-align:center;">zty管理系统</span>
        </Col>
        <Col span="12">
          <a class="loginOut" @click="LoginOut">退出</a>
          <span class="welcome">欢迎  {{ nowUser }} </span>
          <DatePicker :open="open" type="date" :value="value" class="head_calendar">
            <Icon :style="{cursor: 'pointer'}" class="calendarIcon" type="calendar" size=30 @click.native="handleClick"></Icon>
          </DatePicker>

            <Dropdown trigger="custom" :visible="visible" >
                <a href="javascript:void(0)" @click="handleOpen">
                    <Badge count="4">
                            <Icon type="chatboxes" :size=30 color="white"></Icon>
                    </Badge>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>张腾跃发过来的消息：你好啊</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                    <div style="text-align: right;margin:10px;">
                        <Button type="primary" @click="handleClose">关闭</Button>
                    </div>
                </DropdownMenu>
            </Dropdown>

            <Avatar :src="ava_url"></Avatar>
        </Col>
    </Row>
</template>

<script>
export default {
        data () {
            return {
                visible: false,
                open: false,
                value: new Date(),
                nowUser: "admin"
            }
        },
        computed: {
          ava_url(){
            let src = this.$store.getters.avatarUrl + ''   // 调用vuex里的get方法
            // let src = 'https://pacdn.500px.org/527106/49546659c55dad2d216b9bf8de1d9cd410f34cd3/2.jpg?2'
            console.log(src)
            return src
          }
        },
        methods: {
            handleClick () {
              this.open = !this.open;
            },
            handleOpen () {
                this.visible = true;
            },
            handleClose () {
                this.visible = false;
            },
            LoginOut() {
              this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style scoped>
  .head_calendar{
    float: right;
    margin: 16px 6px;
  }
  .calendarIcon{
    margin-right: 10px;
  }
  .loginOut{
    float: right;
    font-size: 14px;
    margin: 3px 8px;
  }
  .welcome{
    font-size: 16px;
    float: right;
    font-weight: bold;
    color: burlywood;
    margin: 2px 8px;
  }


</style>
