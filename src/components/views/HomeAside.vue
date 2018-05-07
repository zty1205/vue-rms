<template>
    <Menu theme="dark" accordion="accordion" width="auto">

        <MenuItem name="1">
            <router-link to="/home/index" class="link-item">
                <Icon type="home" class="icon-item"></Icon>
              <span class="font-item">首&emsp;&emsp;页</span>
            </router-link>
        </MenuItem>

        <MenuItem name="2">
          <router-link to="/home/images" class="link-item">
            <Icon type="images" class="icon-item"></Icon>
            <span class="font-item">员工相册</span>
          </router-link>
        </MenuItem>

        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-people"></Icon>
                组织管理
            </template>
            <MenuGroup title="员工">
                <MenuItem name="3-1">
                  <router-link to="/home/employee/list" class="link-item">
                    员工信息
                  </router-link>
                </MenuItem>
                <MenuItem name="3-2"> 添加员工 </MenuItem>
            </MenuGroup>
            <MenuGroup title="考勤与工薪">
                <MenuItem name="3-4"> 员工考勤 </MenuItem>
                <MenuItem name="3-5"> 员工工薪 </MenuItem>
            </MenuGroup>
        </Submenu>

        <Submenu name="4">
            <template slot="title">
                <Icon type="briefcase"></Icon>
                行政审批
            </template>
            <MenuItem name="4-1"> 请假审批 </MenuItem>
            <MenuItem name="4-2"> 报销审批 </MenuItem>
        </Submenu>

        <MenuItem name="5">
            <Icon type="stats-bars" class="icon-item"></Icon>
          <span class="font-item">统计分析</span>
        </MenuItem>

        <Submenu name="6">
          <template slot="title">
            <Icon type="briefcase"></Icon>
            其他工具
          </template>
          <MenuItem name="6-1">
            <router-link to="/home/NotePad" class="link-item">
              <Icon type="hammer" class="icon-item"></Icon>
              <span class="font-item">记&ensp;事&ensp;本</span>
            </router-link>
          </MenuItem>
          <MenuItem name="6-2">
            <router-link to="/home/clock" class="link-item">
              <Icon type="clock"></Icon>
              <span class="font-item">钟  表</span>
            </router-link>
          </MenuItem>
        </Submenu>

        <MenuItem name="7">
            <Icon type="android-person" class="icon-item"></Icon>
          <span class="font-item">我&emsp;&emsp;的</span>
        </MenuItem>

    </Menu>
</template>

<style scoped>
  .link-item{
    color: rgba(255,255,255,.7);
  }
  .link-item:hover{
    color: #fff;
  }
  .icon-item{
    margin-right: 8px;
  }
  .font-item{
    margin-right: 19px;
  }
</style>
