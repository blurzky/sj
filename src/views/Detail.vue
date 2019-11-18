<template>
  <div class="container">
    <TopNav/>
    <div class="top">
      <div class="title">
        <span class="name">{{name}}</span>
        <span class="year">(2019)</span>
      </div>
    </div>
    <div class="mid">
      <div class="basic">
        <img src="../pic/type/joker.webp" class="mainpic">
        <div class="info"></div>
        <div class="score">
          <span>综合评分</span>
          <div class="point">
            <div class="num">{{point}}</div>
            <div class="process">
              <div class="stars">
                <div class="cover" :style="{transform: `translateX(${point * 7.5}px)`}">
                  <img src="../pic/detail/halfstar.png" v-if="num/2 % 0 != 1">
                </div>
                <img src="../pic/detail/star_after.png" class="star" v-for="(item,index) in 5" :key="index">
              </div>
              <div class="people"><span>15</span>人评价</div>
            </div>
          </div>
          <div class="ratings">
            <div class="rating"  v-for="(item, index) in ratings" :key="index">
              <div class="level">{{5 - index}}星</div>
              <div class="blue_line" :style="{width: `${item}px`}"></div>
              <div class="rating_num">{{item}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="see_star">
        <div class="see">想看</div>
        <div class="saw">看过</div>
        <div class="appraise">
          <span>评价：</span>
          <div class="star" v-for="(item,index) in praise" :key="index" @mousemove="move(index)" @mouseleave="leave(index)" :class=" index < num  ? `star_click` :``">
            <div class="praise" v-if="num" :class=" index != num -1 ? `hide` :``">{{item}}</div>
          </div>
        </div>
        <img src="../pic/detail/write_comment.png" class="write">
        <div class="go_comment">写短评</div>
      </div>
      <div class="intro">
        <div class="i">{{name}}的内容简介  ·  ·  ·  ·  ·  ·</div>
        <div class="imore">
          <p>电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。</p>
          <p>本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。</p>
　　    </div>
      </div>
      <div class="pics">
        <div class="i">{{name}}的剧照  ·  ·  ·  ·  ·  ·<span class="all">(全部图片)</span></div>
        <img :src="item" class="pic" v-for="(item,index) in pic" :key="index">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return{
      name: '小丑 joker',
      praise: ['很差','较差','还行','推荐','力荐'],
      num: '',
      point: 9,
      pic:[
        require('../pic/detail/joker.webp'),
        require('../pic/detail/1.webp'),
        require('../pic/detail/2.webp'),
        require('../pic/detail/3.webp'),
        require('../pic/detail/4.webp'),
        require('../pic/detail/5.webp')
      ],
      ratings: [50,20,15,10,5]
    }
  },
  components: {
    TopNav: () => import('../components/TopNav'),
  },
  created() {
    this.point = this.point.toFixed(1);
  },
  methods: {
    move(index) {
      this.num = index + 1;
    },
    leave(index) {
      this.num = '';
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .top {
    width: 800px;
    margin-top: 80px;
    padding-bottom: 20px;
    .title {
      font-weight: 600;
      .name {
        width: 100px;
        font-size: 24px;
        line-height: 24px;
      }
      .year {
        font-size: 22px;
        margin-left: 5px;
        color: #acacac;
        line-height: 24px;
      }
    }
  }
  .mid {
    .basic {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .mainpic {
        width: 185px;
        height: 250px;
        object-fit: cover;
      }
      .info {
        width: 350px;
        height: 250px;
        margin-left: 19px;
      }
      .score {
        width: 200px;
        height: 250px;
        padding-left: 45px;
        border-left: 1px solid #eee;
        &>span {
          font-size: 12px;
          color: #8f8f8f;
        }
        .point {
          display: flex;
          margin-top: 10px;
          align-items: center;
          justify-content: flex-start;
          .num {
            width: 50px;
            font-size: 24px;
          }
          .process {
            .stars {
              width: 75px;
              overflow: hidden;
              position: relative;
              .cover {
                top: 0;
                left: 0;
                width: 75px;
                height: 22px;
                overflow: hidden;
                position: absolute;
                background-color: #fff;
                &>img {
                  width: 15px;
                  height: 15px;
                  margin-left: -7.5px;
                }
              }
              .star {
                width: 15px;
                height: 15px;
              }
            }
            .people {
              font-size: 12px;
            }
          }
        }
        .ratings {
          color: #8f8f8f;
          margin-top: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          .rating {
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: flex-start;
            .level {
              font-size: 12px;
            }
            .blue_line {
              height: 12px;
              margin-left: 10px;
              background-color: #46b2fa44;
            }
            .rating_num {
              font-size: 11px;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .see_star {
      display: flex;
      margin-top: 20px;
      align-items: center;
      justify-content: flex-start;
      .see, .saw{
        width: 40px;
        font-size: 12px;
        line-height: 20px;
        margin-right: 5px;
        border-radius: 5px;
        text-align: center;
        border: 1px solid #cecece;
        background-color: #46b2fa44;
      }
      .see:hover, .saw:hover {
        color: #46b2fa;
      }
      .appraise {
        display: flex;
        font-size: 12px;
        line-height: 20px;
        position: relative;
        align-items: center;
        justify-content: flex-start;
        .star {
          width: 15px;
          height: 15px;
          margin-left: 1px;
          background-size: cover;
          background-image: url('../pic/detail/star_before.png');
          .praise {
            top: 0;
            right: -25px;
            position: absolute;
          }
          .hide {
            display: none;
          }
        }
        .star_click {
          background-image: url('../pic/detail/star_after.png');
        }
      }
      .write {
        
        width: 25px;
        height: 25px;
        margin-left: 200px;
      }
      .go_comment {
        font-size: 14px;
        color: #46b2fa;
      }
      .go_comment:hover {
        color: #fff;
        line-height: 20px;
        border-radius: 3px;
        background-color: #46b2fa;
      }
    }
    .intro, .pics {
      margin-top: 20px;
      .i {
        font-size: 14px;
        color: #1398f1;
        margin-bottom: 10px;
        .all {
          font-size: 12px;
          margin-left: 50px;
        }
        .all:hover {
          color: #fff;
          background-color: #1398f1;
        }
      }
      .imore {
        width: 800px;
        font-size: 12px;
        word-break: break-all;
        &>p {
          text-indent: 2em;
          margin-block-end: 0em;
          margin-block-start: 0em;
        }
      }
      .pic {
        width: 110px;
        height: 110px;
        object-fit: cover;
        margin-right: 25px;
      }
    }
  }
}
</style>