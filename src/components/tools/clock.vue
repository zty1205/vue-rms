<template>
  <canvas id="canvas" style="height: 100%;"></canvas>
</template>

<script>
  import {clock, WINDOW_HEIGHT, WINDOW_WIDTH} from  '../../utils/clock'

  export default {
    data() {
      return {
        timer: ''
      }
    },
    mounted(){
      this.initCanvas()
    },
    beforeRouteLeave (to, from, next) {   // 路由导航钩子
      clearInterval(this.timer)
      next()
    },
    methods: {
      initCanvas(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT-20;

        let curShowTimeSeconds = clock.getCurrentShowTimeSeconds()
        clock.setCurShowTimeSeconds(curShowTimeSeconds)
        this.timer = setInterval(function(){
          clock.render( context );
          clock.update();
        },50);
      }
    }
  }


</script>

<style scoped>

</style>
