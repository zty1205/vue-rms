<template>
  <div id="app">
    <!--<my-login></my-login>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import MyLogin from './components/views/login'
export default {
  name: 'App',
  components: {
    // MyLogin
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: Microsoft Yahei, Arial, Helvetica, sans-serif, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
