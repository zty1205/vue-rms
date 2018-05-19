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
                <MenuItem name="3-2">
                  <router-link to="/home/employee/add" class="link-item">
                    添加员工
                  </router-link>
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="部门">
                <MenuItem name="3-4">
                  <router-link to="/home/department/list" class="link-item">
                    部门信息
                  </router-link>
                </MenuItem>
            </MenuGroup>
        </Submenu>

        <Submenu name="4">
            <template slot="title">
              <Icon type="ios-barcode"></Icon>
                行政审批
            </template>
            <MenuItem name="4-1">
              <router-link to="/home/applicant" class="link-item">
                请假管理
              </router-link>
            </MenuItem>
        </Submenu>

        <Submenu name="5">
          <template slot="title">
            <Icon type="briefcase"></Icon>
            系统工具
          </template>
          <MenuItem name="5-1">
            <router-link to="/home/NotePad" class="link-item">
              <Icon type="hammer" class="icon-item"></Icon>
              <span class="font-item">记&ensp;事&ensp;本</span>
            </router-link>
          </MenuItem>
          <MenuItem name="5-2">
            <router-link to="/home/clock" class="link-item">
              <Icon type="clock" class="icon-item"></Icon>
              <span class="font-item">数字时钟</span>
            </router-link>
          </MenuItem>
        </Submenu>

      <Submenu name="6">
        <template slot="title">
          <Icon type="android-person"></Icon>
          用户中心
        </template>
        <MenuItem name="6-1">
          <router-link to="/home/myself" class="link-item">
            个人信息
          </router-link>
        </MenuItem>
        <MenuItem name="6-2">
          <router-link to="/home/AttendSalary" class="link-item">
            考勤/工资
          </router-link>
        </MenuItem>
      </Submenu>

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
