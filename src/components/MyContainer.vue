<template>
    <Layout>
        <Header>
            <home-header></home-header>
        </Header>
        <Layout>
            <Sider hide-trigger>
                <home-aside></home-aside>
            </Sider>
            <!-- 路由展示区域 -->
            <Content>
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import HomeAside from './HomeAside.vue'
import HomeHeader from './HomeHeader'
export default {
  components:{
      HomeAside,
      HomeHeader
  }
}
</script>

<style scoped>

</style>

