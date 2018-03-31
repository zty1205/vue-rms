<template>
  <div class="imagelist">
    <div class="imagesWrapper">
      <Loading :center="true" v-show="!images.length"></Loading>
      <ImageItem v-for="image in images" :key="image._id" :image="image"></ImageItem>
    </div>
    <a href="#" class="loadMore" @click.prevent="fetchMore" v-show="images.length && fetchCount <= 1">加载更多</a>
    <Loading v-show="this.$store.state.isFetch"></Loading>
    <router-view></router-view>
    <BackTop :height="420" :bottom="200">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
  import ImageItem from './ImageItem'
  import Loading from '../loading/loading'
  import { mapState } from 'vuex'
  export default {
    components: {
      ImageItem,
      Loading,
    },
    created () {
      this.$store.commit('FETCH_IMAGES', this.fetchCount)
    },
    computed: {
      ...mapState({
        images: 'images',
        fetchCount: 'fetchCount'
      })
    },
    methods: {
      fetchMore () {
        this.$store.state.fetchCount += 1
        this.$store.commit('FETCH_IMAGES', this.fetchCount)
      }
    },
    mounted () {
      this.$store.state.isHome = false
      window.addEventListener('scroll', () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        // 页面滚动的高度 + 浏览器窗口的视口（viewport）高度 >= 整个页面可视区域高度 - 页面底部高度
        if (scrollTop + window.innerHeight >= document.body.clientHeight - 50 && this.$store.state.isFetch === false && this.fetchCount >= 2) {
          this.$store.state.isFetch = true
          this.fetchMore()
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins.scss';

  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }

  .imagelist {
    text-align: center;
    padding-top: .2rem;

  .imagesWrapper {
  @include stickFooter;
    width: 79rem;
    margin: 1rem auto;
    padding: 0 3.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @include mediaQ(1366px) {
      width: 100%;
    }
  }

  .loadMore {
    display: inline-block;
    padding: .5rem;
    margin: 1rem;
    color: white;
    background: #999;
    border-radius: 5px;
  }
  }
</style>
