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
            <div class="type">
              <div :class="index === 0 ? `tip_saw` : `tip_like`" @click="changeTip(index)" v-for="(item,index) in tip" :key="index">{{item}}</div>
            </div>
            <div class="movie" :style="sawLike === 1 ? {backgroundColor: `#0e98f320`} : {backgroundColor: `#fa536920`}">
              <img :src="item" alt="" class="photo" v-for="(item,index) in mine[0].saw" :key="'info-' + index" v-show="sawLike === 1">
              <img :src="item" alt="" class="photo" v-for="(item,index) in mine[0].like" :key="index" v-show="sawLike === -1">
            </div>
          </div>
          <div class="comment" v-for="({score, time, praise, comment},index) in mycomment" :key="index" v-else>
            <div class="top">{{comment}}</div>
            <div class="bottom">
              <div v-for="(item,index) in 5" :key="index" :class="index < score ? `yellow` : `grey`"></div>
              <div class="date">{{time}}</div>
              <div class="praise">{{praise}}<span class="like">有用</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      kind: ['我的评论', '我的电影'],
      num: 0,
      tip: ['我想看的', '我喜欢的'],
      mycomment: [],
      sawLike: 1,
      type: false,
      mine: this.$store.state.data,
    }
  },
  created() {
    this.getcomment();
  },
  methods: {
    changeTip(e) {
      e !== this.type && (this.sawLike *= -1);
    },
    change(index) {
      this.num = index;
    },
    getcomment() {
      axios({
        method: "post",
        url:'user/findHomePage',
        data: {
          userid: this.$store.state.userIdCode,
          size: 0,
        },
        transformRequest: [
          function(data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret;
          }
        ]
      }).then(({data: {data, message, status}}) => {
        this.mycomment = data;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 40px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(to top, #fff,#dae4fa);
  .main {
    display: flex;
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
        background-size: 100%;
        background-image: url('../pic/admin/head.png');
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
          transition: all .3s;
          background-color: #ffffff85;
        }
        .other {
          border: none;
          color: #0e98f3;
          transition: all .3s;
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
                color: #fff;
                padding: 0 2px;
                margin-left: 5px;
                border-radius: 3px;
                background-color: #0e98f3;
              }
            }
          } 
        }
        .movies {
          width: 100%;
          height: 100%;
          .type {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .tip_saw, .tip_like {
              width: 50%;
              font-size: 15px;
              color: #0e98f3;
              line-height: 40px;
              text-align: center;
              transition: all .3s;
            }
            .tip_saw:hover, .choose_saw {
              color: #fff;
              background-color: #4cb1f585;
            }
            .tip_like {
              color: #fa5369;
            }
            .tip_like:hover, .choose_like {
              color: #fff;
              background-color: #fa536996;
            }
          }
          .movie {
            flex-wrap: wrap;
            .photo {
              width: 200px;
              height: 280px;
              padding: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
