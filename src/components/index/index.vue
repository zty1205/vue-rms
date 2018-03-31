<template>
    <div class="Layout">
      <h1>公司介绍</h1>
      <Row>
        <Col span="12">
        <h3>新闻动态</h3>
        <Timeline>
          <TimelineItem color="#ccc">
            <div class="item-box">
              <p class="content">Apple I 问世</p>
              <p class="time">1976年</p>
            </div>
          </TimelineItem>
          <TimelineItem color="#ccc">
            <div class="item-box">
              <p class="content">发布 Macintosh</p>
              <p class="time">1984年</p>
            </div>
          </TimelineItem>
          <TimelineItem color="#ccc">
            <div class="item-box">
              <p class="content">发布 iPhone</p>
              <p class="time">2007年</p>
            </div>
          </TimelineItem>
          <TimelineItem color="#ccc">
            <div class="item-box">
              <p class="content">发布 iPad</p>
              <p class="time">2010年</p>
            </div>
          </TimelineItem>
          <TimelineItem color="#ccc">
            <div class="item-box">
              <p class="content">史蒂夫·乔布斯去世</p>
              <p class="time">2011年10月5日</p>
            </div>
          </TimelineItem>
        </Timeline>
        </Col>
        <Col span="12">col-12</Col>
      </Row>

    </div>
</template>

<script>
// 首页 介绍公司
export default {

}
</script>

<style scoped>
  .time{
    font-size: 12px;
    line-height: 12px;
    margin-top: 16px;
    margin-left: 0;
    color: #ccc;
    float: left;
  }
  .content{
    font-size: 14px;
    line-height: 14px;
    position: absolute;
    float: left;
  }
  .item-box{
    opacity: .6;
    height: 40px;
    line-height: 30px;
    margin-bottom: 5px;
    margin-left: 20px;
    border: 1px solid red;
  }
  .item-box:hover{
    opacity: 1;
    transition: all .5s;
    transform: scale(1.1);
  }
</style>
