<template>
  <div class="container">
    <Pics v-if="picShow" @closePic="closePic" :main="main" :photoNumber="photoNumber" @right="right" @left="left"/>
    <div class="all" v-for="(item,index) in type" :key="index">
      <div class="i">{{msg}} 的{{item}}  ·  ·  ·  ·  ·  ·
      </div>
      <div class="imore" v-if="index === 0">{{content}}</div>
      <div class="pics" v-else-if="index === 1">
        <img :src="item" title="点击看大图" v-for="(item,index) in main" :key="index" @click="openPic(index)"/>
      </div>
      <div class="comment" v-else>
        <div class="person" v-for="({name, time, praise, comment, times, score, type},index) in userComment" :key="index">
          <div class="title">
            <div class="username">{{name}}</div>
            <div v-for="(item,index) in 5" :key="index" :class="index < (score/2) ? `yellow` : `grey`"></div>
            <div class="date">{{time}}</div>
            <div class="praise">{{praise}}</div>
            <praise :type="type" @praiseAct="praiseAct(index)"/>
          </div>
          <div class="brief_comment">{{comment}}</div>
        </div>
        <div v-if="userComment.length === 0" class="notice">暂时还没有人评论喔~</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ['msg', 'photos', 'content', 'myScore', 'userComment'],
  data () {
    return {
      picShow: false,
      type: ['内容简介','剧照','短评'],
      photoNumber: 0,
      main: [],
    }
  },
  created() {
    this.main = this.photos;
  },
  methods: {
    openPic(index) {
      this.photoNumber = index;
      this.picShow = true;
    },
    closePic() {
      this.picShow = false;
    },
    left() {
      if( this.photoNumber > 0) {
        this.photoNumber--;
      }
    },
    right() {
      if( this.photoNumber < 5) {
        this.photoNumber++;
      }
    },
    praiseAct(index) {
      if (this.userComment[index].type === 0) {
        axios({
          method: "post",
          url:'content/praiseComment',
          data: {
            cid: this.userComment[index].cid,
            userid: this.$store.state.userIdCode,
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
          if(status === 200) {
            this.userComment[index].praise ++; //点赞
            this.userComment[index].type ++;
          } else {
            alert(message)
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        axios({
          method: "post",
          url:'content/delPraiseComment',
          data: {
            cid: this.userComment[index].cid,
            userid: this.$store.state.userIdCode,
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
          if(status === 200) {
            this.userComment[index].praise -= 1; //取消点赞
            this.userComment[index].type --;
          } else {
            alert(message)
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }
  },
  components: {
    praise: () => import('./Praise'),
    Pics: () => import('./Pics'),
  }
}
</script>
<style lang="scss" scoped>
.container {
  .all {
    width: 800px;
    margin-top: 20px;
    .i {
      font-size: 14px;
      color: #1398f1;
      margin-bottom: 10px;
      .all, .to_write {
        font-size: 12px;
        margin-left: 50px;
      }
      .all:hover, .to_write:hover {
        color: #fff;
        background-color: #1398f1;
      }
    }
    .imore {
      font-size: 12px;
      word-break: break-all;
      &>p {
        text-indent: 2em;
        margin-block-end: 0em;
        margin-block-start: 0em;
      }
    }
    .pics {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      &>img {
        width: 110px;
        height: 110px;
        display: block;
        cursor: pointer;
        object-fit: cover;
      }
    }
    .comment {
      .person {
        padding-top: 10px;
        border-top: 1px solid #eeeeee;
        .title {
          display: flex;
          font-size: 14px;
          align-items: center;
          justify-content: flex-start;
          .username {
            color: #1398f1;
            line-height: 14px;
            margin-right: 10px;
          }
          .username:hover {
            color: #fff;
            background-color: #1398f1;
          }
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
            flex: 1;
            margin: 0 10px;
            color: #6b6a6a;
            line-height: 14px;
          }
          .praise {
            width: 30px;
            color: #6b6a6a;
            text-align: center;
          }
        }
        .brief_comment {
          font-size: 13px;
          margin: 10px 0 ;
          max-height: 68px;
          overflow: hidden;
        }
      }
      .notice {
        font-size: 15px;
        color: #aaa9a9;
      }
    }
  }
}
</style>