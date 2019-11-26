<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="head"></div>
        <div class="name">zky</div>
        <p class="word">这个世界上有百分之五十的烦恼都是通过好好睡一觉就能解决的，至于剩下的一半，等睡醒再去想。</p>
      </div>
      <div class="right">
        <div class="title">
          <div v-for="(item,index) in kind" :key="index" @click="change(index)" :class="num === index ? `now` : `other`">{{item}}</div>
        </div>
        <div class="content">
          <div class="movies" v-if="num === 1">
            <div class="movie" v-for="(item,index) in 3" :key="index">
              <img src="../pic/type/joker.webp" class="photo">
              <div class="tip_saw" v-if="sawLike === 0 ">看过</div>
              <div class="tip_like" v-else>喜欢</div>
            </div>
          </div>
          <div class="comment" v-for="({star, date, praise, content},index) in mycomment" :key="index" v-else>
            <div class="top">希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。</div>
            <div class="bottom">
              <div v-for="(item,index) in 5" :key="index" :class="index < star ? `yellow` : `grey`"></div>
              <div class="date">{{date}}</div>
              <div class="praise">{{praise}}<span class="like">有用</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: ['我的评论', '我的电影'],
      num: 0,
      mycomment: [{
          star: 5,
          date: '2019-11-20',
          praise: 50,
          content: '希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。'
        },{
          star: 5,
          date: '2019-11-20',
          praise: 50,
          content: '希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。'
      }],
      sawLike: 0,
    }
  },
  methods: {
    change(index) {
      this.num = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 40px;
  background: linear-gradient(to top, #fff,#dae4fa);
  .main {
    display: flex;
    margin: 0 400px;
    padding-top: 50px;
    align-items: flex-start;
    justify-content: flex-start;
    .left {
      width: 300px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      background-color: #ffffff85;
      .head {
        width: 200px;
        height: 200px;
        margin: 30px 0;
        background-color: #fff;
      }
      .name {
        margin: 30px 0;
        font-size: 24px;
      }
      .word {
        width:250px;
        font-size: 14px;
        text-indent: 2em;
        word-break: break-all;
      }
    }
    .right {
      .title {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .other, .now {
          width: 50%;
          color: #000;
          font-size: 15px;
          line-height: 40px;
          text-align: center;
          background-color: #ffffff85;
        }
        .other {
          border: none;
          color: #0e98f3;
          background-color: #ffffff00;
        }
        .other:hover {
          color: #fff;
          transition: all .3s;
          background-color: #4cb1f585;
        }
      }
      .content {
        width: 700px;
        padding: 30px 30px;
        background-color: #ffffff85;
        .comment {
          padding: 10px;
          border-top: 1px solid #cecece;
          .top {
            font-size: 14px;
          }
          .bottom {
            display: flex;
            font-size: 14px;
            margin-top :10px;
            align-items: center;
            justify-content: flex-start;
            .grey, .yellow {
              width: 15px;
              height: 15px;
              background: center / cover;
            }
            .grey {
              background-image: url('../pic/detail/halfstar.png');
            }
            .yellow {
              background-image: url('../pic/detail/star_after.png');
            }
            .date {
              color: #6b6a6a;
              margin: 0 10px;
            }
            .praise {
              flex: 1;
              text-align: end;
              color: #6b6a6a;
              .like {
                margin-left: 5px;
                color: #0e98f3;
              }
              .like:hover {
                color: #fff;
                background-color: #0e98f3;
              }
            }
          } 
        }
        .movies {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          .movie {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
            .photo {
              width: 200px;
              height: 300px;
              object-fit: contain;
              border-radius: 15px;
            }
            .tip_saw, .tip_like {
              width: 100px;
              margin: 10px 0;
              font-size: 15px;
              color: #0e98f3;
              line-height: 30px;
              border-radius: 5px;
              text-align: center;
              transition: all .3s;
              background-color: #fff;
            }
            .tip_saw:hover {
              color: #fff;
              background-color: #4cb1f585;
            }
            .tip_like {
              color: #fa5369;
            }
            .tip_like:hover {
              color: #fff;
              background-color: #fa536996;
            }
          }
        }
      }
    }
  }
}
</style>
