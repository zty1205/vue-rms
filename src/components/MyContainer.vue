<template>
  <div class="layout">
    <Layout :style="{height: '780px'}">
      <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
        <home-aside></home-aside>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">
          <home-header></home-header>
        </Header>
        <!-- 路由展示区域 -->
        <Content :style="{margin: '20px',background: '#fff', minHeight: '220px'}">
          <router-view :style="{margin: '20px'}"></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import HomeAside from './HomeAside.vue'
import HomeHeader from './HomeHeader'
export default {
  data(){
    return{
      isCollapsed: false
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  components:{
      HomeAside,
      HomeHeader
  }
}
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu .ivu-menu-item-active,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    background: rgba(255,255,255,.8) !important;
  }
</style>

