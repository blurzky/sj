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
        <img :src="main" class="mainpic" @click="openPic" title="点击查看封面海报">
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
        <div class="see" @click="addMine(e = 0)" title="添加到我想看的">想看</div>
        <div class="like" @click="addMine(e = 1)" title="添加到我喜欢的">喜欢</div>
        <Alert :message="message" v-if="alert"/>
        <div class="rePraise" @click="rePraise" v-if="myScore" title="重新评分点此">重评</div>
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
        :myScore="data.myScore"
        :userComment="userComment"
      />
    </div>
    <GiveStar v-if="show" @closeGive="closeGive" :star="star" :myPraise="myPraise" @give="give"/>
    <Write v-if="toWrite" @closeWrite="closeWrite" @postSubmit="postSubmit"/>
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
      person: null, //总人数
      ratings: [],  //每种评分的人数
      show: false,  //评分界面是否显示
      myPraise: null, //我打的分
      toWrite: false, //去写评论
      picShow: false, //点开图片
      photoNumber: 0, //大图图片索引
      data: {},
      main: [], //大图
      // systemDate: '', //系统时间
      comment: '',
      userComment: [],
      message: '', //喜欢想看提示界面
      alert: false, //喜欢想看提示界面
    }
  },
  components: {
    Comment: () => import('../components/Comment'),
    GiveStar: () => import('../components/GiveStar'),
    Write: () => import('../components/Write'),
    Login: () => import('../components/Login'),
    Pics: () => import('../components/Pics'),
    Alert: () => import('../components/Alert'),
  },
  created() {
    this.getMovie();
    this.getWrite();
  },
  methods: {
    openPic() { //全屏看图
      this.picShow = true;
    },
    closePic() { //关闭全屏
      this.picShow = false;
    },
    addMine (e) {
      if (this.$store.state.userId) {
        if(!this.$store.state.saw.includes(this.data.cover) && !this.$store.state.like.includes(this.data.cover)) {
          if(e === 0) {  //想看
            this.message = '已添加到您想看的~';
            this.$store.commit('add',{e , cover: this.data.cover});
          } else {   //喜欢
            this.message = '已添加到您喜欢的~';
            this.$store.commit('add',{e , cover: this.data.cover});
          }
        } else {
          this.message = '您已添加过了'
        }
        this.alert = true;
        setTimeout(() => {
          this.alert = false
        },1500)
      } else {
        this.$store.state.type = 1;
      }
    },
    rePraise() { //重评
      if (this.myScore) {
        this.myScore = 0;
        this.num = 0;
      }
    },
    move(index) { //移入打分
      if (!this.myScore) {
        this.num = index + 1;
      }
    },
    leave(index) { //移出打分
      if (!this.myScore) {
        this.num = null;
      }
    },
    open() { //打开评分界面
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
    give() { //打分
      axios({
        method: "post",
        url:'content/score',
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
          document.documentElement.scrollTop = 1000;
        }, 100);
      } else {
        this.toWrite = false;
        this.$store.commit('login', 1);
      }
    },
    getWrite() {
      axios({
        method: "post",
        url:'content/getComments',
        data: {
          id: this.$route.query.movie,
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
        if (status === 200) {
          this.userComment = data;
        } else {
          alert(message)
        }
      }).catch(error => {
        console.log(error);
      });
    },
    postSubmit(text) { //提交评论
      axios({
        method: "post",
        url:'content/comment',
        data: {
          userid: this.$store.state.userIdCode,
          id: this.$route.query.movie,
          comment: text,
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
      }).then(({data: {message}}) => {
        location.reload();
      }).catch(error => {
        console.log(error);
      });
    },
    closeWrite() { //关闭评论
      this.toWrite = false;
    },
    // addDate() { //获取系统时间
    //   const nowDate = new Date();
    //   let date = {
    //       year: nowDate.getFullYear(),
    //       month: nowDate.getMonth() + 1,
    //       day: nowDate.getDate(),
    //   }
    //   if (date.month < 10) {
    //     date.month = '0' +  date.month;
    //   } else if (date.day < 10) {
    //     date.day = '0' +  date.day;
    //   }
    //   let systemDate = date.year + '-' + date.month + '-' + date.day;
    //   this.systemDate = systemDate;
    // },
    getMovie() { //获取电影详情
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