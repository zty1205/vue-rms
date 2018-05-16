<template>
    <div class="Layout">
      <Row>
        <Carousel  v-model="value2" loop :autoplay-speed="speed"> <!-- autoplay -->
          <CarouselItem>
            <div class="demo-carouse1">
              <div class="img-container1"></div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carouse1">
              <div class="img-container2"></div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carouse1">
              <div class="img-container3"></div>
            </div>
          </CarouselItem>
        </Carousel>
        <!--<div class="img-container">-->
          <!--<p class="img-innerDes">Apollo 如期而至</p>-->
        <!--</div>-->
      </Row>

      <h1 class="news-title">公司动态</h1>
      <hr class="img-hr-content"/>

      <Row>
        <Col span="9" offset="1">
        <h2 class="news">新闻动态</h2>
          <Timeline pending>
            <TimelineItem color="green">
              <div class="item-box">
                <a href="https://home.baidu.com/home/index/news_detail/id/17786"
                   class="content" target="_blank">
                  Apollo 全球首发
                </a>
                <p class="time">2018-1-1</p>
              </div>
            </TimelineItem>
            <TimelineItem>
              <div class="item-box">
                <a href="https://home.baidu.com/home/index/news_detail/id/17783"
                   class="content" target="_blank">
                  人脸技术再次刷新世界纪录 攻克多项人脸检测难题
                </a>
                <p class="time">2017-6-7</p>
              </div>
            </TimelineItem>
            <TimelineItem>
              <div class="item-box">
                <a href="https://home.baidu.com/home/index/news_detail/id/17778"
                   class="content" target="_blank">
                  成立量子计算研究所
                </a>
                <p class="time">2017-4-1</p>
              </div>
            </TimelineItem>
            <TimelineItem color="rgb(233,233,233)">
              <div class="item-box">
                <a href="https://home.baidu.com/home/index/news_list"
                   target="_blank" class="more-news">
                  查看更多
                </a>
                <Icon type="chevron-right" class="more-news-icon"></Icon>
              </div>
            </TimelineItem>
          </Timeline>

          </Col>
        <Col span="14">
          <Row :gutter="16">
            <Col span="12">
              <Card>
                <p slot="title">DuerOS 唤醒万物</p>
                <img src="../../assets/img/dueros.jpg" class="img-os"/>
              </Card>
            </Col>
            <Col span="12">
              <Card>
                <p slot="title">AI 开发平台</p>
                <img src="../../assets/img/AI.jpg" class="img-os"/>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
</template>

<script>
// 首页 介绍公司
export default {
  data() {
    return {
      value2: 1,
      speed: 3000
    }
  }
}
</script>

<style scoped>
  .news-title {
    color: rgb(150,150,150);
    display: block;
    margin-top: 10px;
    margin-bottom: 4px;
  }
  .content{
    text-align: left;
    display: block;
    float: left;
    font-size: 18px;
    line-height: 18px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width: 100%;
    text-decoration: none;
    color: rgb(102,102,102);
  }
  .content:hover {
    text-decoration: underline;
  }
  .time{
    font-size: 14px;
    line-height: 14px;
    margin-top: 30px;
    margin-left: 0;
    color: #999999;
    float: left;
    display: block;
  }
  .item-box{
    opacity: .6;
    height: 40px;
    line-height: 30px;
    margin-bottom: 4px;
    margin-left: 30px;
  }
  .img-container1 {
    background-image: url('../../assets/img/apollo.png');
    background-repeat: round;
    background-size: contain;
    width: 98%;
    height: 300px;
    margin: 1px auto;
  }
  .img-container2 {
    background-image: url('../../assets/img/index.jpg');
    background-repeat: round;
    background-size: contain;
    width: 98%;
    height: 300px;
    margin: 1px auto;
  }
  .img-container3 {
    background-image: url('../../assets/img/wein.jpg');
    background-repeat: round;
    background-size: contain;
    width: 98%;
    height: 300px;
    margin: 1px auto;
  }
  .img-innerDes {
    z-index: 10;
    font-size: 60px;
    font-weight: 500;
    color: white;
    position: relative;
    top: 40px;
  }
  .img-hr-content {
    border: 1px solid rgb(232,232,232);
    margin-bottom: 6px;
    margin-top: 10px;
    width: 98%;
    display: block;
  }
  .news {
    text-align: left;
    margin-top: 3px;
    margin-bottom: 12px;
    margin-left: -30px;
    color: #8e8d8d;
  }
  .more-news {
    text-decoration: none;
    font-size: 16px;
    line-height: 16px;
    display: inline-block;
    margin-bottom: 4px;
    margin-right: 2px;
    text-align: left;
    vertical-align: top;
    float: left;
  }
  .more-news:hover{
    text-decoration: underline;
  }
  .more-news-icon {
    float: left;
    margin-left: 4px;
  }
  .img-os {
    width: 98%;
    height: 200px;
  }
</style>
