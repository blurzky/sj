<template>
  <div class="container">
    <Pics v-if="picShow" @closePic="closePic" :main="main" :photoNumber="photoNumber"/>
    <div class="top">
      <div class="title">
        <span class="name">{{data.title}}</span>
        <span class="year">({{data.year}})</span>
      </div>
    </div>
    <div class="mid">
      <div class="basic">
        <img :src="main" class="mainpic" @click="openPic">
        <div class="info"></div>
        <div class="score">
          <span>综合评分</span>
          <div class="point">
            <div class="num">{{point}}</div>
            <div class="process">
              <div class="stars">
                <img src="../pic/detail/star_after.png" v-for="(item,index) in (parseInt(point / 2))" :key="index">
                <div class="cover" v-if="parseInt(point) % 2 !== 0">
                  <div class="grey"/>
                </div>
                <img src="../pic/detail/halfstar.png" v-for="(item) in [11,12,13,14,15]" :key="item">
              </div>
              <div class="people">{{person}}人评分</div>
            </div>
          </div>
          <div class="ratings">
            <div class="rating"  v-for="(item, index) in ratings" :key="index">
              <div class="level">{{5 - index}}星</div>
              <div class="blue_line" :style="{width: `${item/person*100}px`}"></div>
              <div class="rating_num" v-if="person">{{(item/person * 100 ).toFixed(1)}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="see_star">
        <div class="see" @click="see">想看</div>
        <div class="like" @click="like">喜欢</div>
        <div class="rePraise" @click="rePraise" v-if="myScore">重评</div>
        <div class="appraise">
          <span>评分：</span>
          <div class="star" :class=" index < num  ? `star_click` :``" v-for="(item,index) in praise" :key="index" @mousemove="move(index)" @mouseleave="leave(index)" @click="open">
            <div class="praise" v-if="num" :class=" index != (num -1) ? `hide` :``">{{item}}</div>
          </div>
        </div>
        <img src="../pic/detail/write_comment.png" class="write">
        <div class="go_comment" @click="write">写短评</div>
      </div>
      <Comment
        v-if="data.photos"
        :msg="data.title"
        :photos="data.photos"
        :content="data.content"
      />
    </div>
    <GiveStar v-if="show" @closeGive="closeGive" :star="star" :myPraise="myPraise" @give="give"/>
    <Write v-if="toWrite" @closeWrite="closeWrite"/>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data () {
    return{
      praise: ['很差','较差','还行','推荐','力荐'],
      num: null, //移动显示星星
      star: null, //点击进入的星星数量
      myScore: null, //我打的分
      point: null, //总分
      person: null,
      ratings: [],
      show: false,
      myPraise: null,
      toWrite: false,
      picShow: false,
      photoNumber: 0,
      data: {},
      main: [],
    }
  },
  components: {
    Comment: () => import('../components/Comment'),
    GiveStar: () => import('../components/GiveStar'),
    Write: () => import('../components/Write'),
    Login: () => import('../components/Login'),
    Pics: () => import('../components/Pics'),
  },
  created() {
    this.getMovie();
  },
  methods: {
    openPic() { //全屏看图
      this.picShow = true;
    },
    closePic() {
      this.picShow = false;
    },
    move(index) {
      if (!this.myScore) {
        this.num = index + 1;
      }
    },
    leave(index) {
      if (!this.myScore) {
        this.num = null;
      }
    },
    open() { //评分
      if (!this.myScore) {
        if (this.$store.state.userId) {
          this.show = true;
          this.star = this.num;
          this.myPraise = this.praise[this.num - 1];
        } else {
          this.$store.commit('login', 1);
        }
      }
    },
    give() {
      axios({
        method: "post",
        url:'content/score',
        // headers: {
        //   post: {"Content-type": "application/x-www-form-urlencoded"}
        // },
        data: {
          userid: this.$store.state.userIdCode,
          id: this.$route.query.movie,
          score: this.star * 2,
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
      }).then(({data: {data, status, message}}) => {
        alert(data);
        location.reload();
      }).catch(error => {
        console.log(error);
      });
      this.num = this.star;
    },
    closeGive () {
      this.show = false;
    },
    write() { //评论
      if (this.$store.state.userId) {
        this.toWrite = true;
        setTimeout(() => {
          document.documentElement.scrollTop = 800;
        }, 100);
      } else {
        this.toWrite = false;
        this.$store.commit('login', 1);
      }
    },
    closeWrite() {
      this.toWrite = false;
    },
    see () { //想看
      if (this.$store.state.userId) {

      } else {
        this.$store.state.type = 1;
      }
    },
    like() { //喜欢
      if (this.$store.state.userId) {

      } else {
        this.$store.state.type = 1;
      }
    },
    rePraise() { //c重评
      if (this.myScore) {
        this.myScore = 0;
        this.num = 0;
      }
    },
    getMovie() {
      axios({
        method: "post",
        url:'content/getMovie',
        // headers: {
        //   post: {"Content-type": "application/x-www-form-urlencoded"}
        // },
        data: {
          userid: this.$store.state.userIdCode,
          id: this.$route.query.movie,
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
      }).then(({data: {data, status, message}}) => {
        if(status === 200) {
          const {cover, number, score, stars, myScore} = data;
          this.data = data;
          this.main = [cover];
          this.person = number;
          this.point = score.toFixed(1);
          this.ratings = stars;
          this.myScore = myScore/2;
          if(this.myScore) {
            this.num = this.myScore
          }
        } else {
          alert(message);
        }
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
        cursor: pointer;
        object-fit: cover;
      }
      .info {
        width: 350px;
        height: 250px;
        margin-left: 19px;
      }
      .score {
        width: 180px;
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
            margin-left: 15px;
            .stars {
              width: 75px;
              height: 15px;
              display: flex;
              flex-wrap: wrap;
              overflow: hidden;
              align-items: flex-start;
              justify-content: flex-start;
              &>img {
                width: 15px;
                height: 15px;
              }
              .cover {
                width: 15px;
                height: 15px;
                background: url('../pic/detail/halfstar.png') center / cover;
                .grey {
                  width: 7.5px;
                  height: 15px;
                  background: url('../pic/detail/star_after.png') 0px / 15px 15px;
                }
              }
            }
            .people {
              font-size: 12px;
              margin-top: 5px;
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
              width: 20px;
              font-size: 12px;
            }
            .blue_line {
              height: 12px;
              margin-left: 10px;
              background-color: #46b2fa44;
            }
            .rating_num {
              flex: 1;
              font-size: 11px;
              margin-left: 10px;
              text-align: end;
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
      .see, .like, .rePraise{
        width: 40px;
        font-size: 12px;
        line-height: 20px;
        margin-right: 5px;
        border-radius: 5px;
        text-align: center;
        border: 1px solid #cecece;
        background-color: #46b2fa44;
      }
      .see:hover, .like:hover, .rePraise:hover {
        cursor: pointer;
        color: #46b2fa;
      }
      .rePraise {
        background-color: #fc676e44;
      }
      .rePraise:hover {
        color: #fc676e;
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
          cursor: pointer;
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
        margin-left: 250px;
      }
      .go_comment {
        font-size: 14px;
        color: #46b2fa;
        cursor: pointer;
      }
      .go_comment:hover {
        color: #fff;
        line-height: 20px;
        border-radius: 3px;
        background-color: #46b2fa;
      }
    }
  }
}
</style>