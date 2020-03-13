<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <img class="head" :src="this.$store.state.head"/>
        <div class="name">{{this.$store.state.userId}}</div>
        <p class="word">{{this.$store.state.brief}}</p>
        <div class="reset" @click="reSet">修改个人资料>></div>
        <!-- <LoadImg/> -->
        <div class="myChange" v-show="changeShow">
          <div class="changeHead">上传头像:</div>
            <div class="box">
              <input type="file" id="headPic" name="file" class="headPic" @change="tirggerFile($event)">
              <div :style="{backgroundImage: `url(${imgDataUrl})`}" class="preview" v-if="imgDataUrl">
                <img src="../pic/admin/del.png" v-if="imgDataUrl" class="del" @click="del">
              </div>
              <div class="changeBrief">个人简介:</div>
              <textarea class="text" v-model="text"></textarea>
              <button class="submit" @click="closeChange" >确认修改</button>
            </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <div v-for="(item,index) in kind" :key="index" @click="change(index)" :class="num === index ? `now` : `other`">{{item}}</div>
        </div>
        <div class="content">
          <div class="movies" v-if="num === 1">
            <div class="type">
              <div class="tip_saw" :class="type ? `choose_saw`: ``" @click="changeTip(true)">我想看的</div>
              <div class="tip_like" :class="type ? ``: `choose_like`" @click="changeTip(false)">我喜欢的</div>
            </div>
            <div class="movie" :style="type ? {border: `2px solid #4cb1f555`} : {border: `2px solid #fa536955`}">
              <img v-lazy="item" alt="" class="photo" v-for="(item,index) in mine.saw" :key="'info-' + index" v-show="sawLike === 1">
              <img v-lazy="item" alt="" class="photo" v-for="(item,index) in mine.like" :key="index" v-show="sawLike === -1">
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
      mycomment: [],
      sawLike: 1,
      type: true,
      mine: JSON.parse(localStorage.getItem(this.$store.state.userIdCode)),
      text: '',
      changeShow: false,
      imgDataUrl: '',
    }
  },
  components: {
    // LoadImg: ()=> import('../components/LoadImg'),
  },
  created() {
    this.getcomment();
  },
  methods: {
    changeTip(e) {
      e !== this.type && (this.sawLike *= -1) && (this.type = !this.type);
    },
    change(index) {
      this.num = index;
    },
    getcomment() {
      axios({
        method: "post",
        url:'zky/user/findHomePage',
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
    },
    reSet() {
      this.changeShow = !this.changeShow;
    },
    del() {
      this.imgDataUrl = '';
    },
    tirggerFile (event) {
        // let self = this;
        let file = event.target.files[0]
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        param.append('type', '1') // 添加form表单中其他数据
        // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        axios.post('/content/upload', param, config)
          .then(response => {
            if (response.data.status == 200) {
              this.imgDataUrl = response.data.data;
              // self.form.img = response.data.data.img;
              // self.form.imgURL  ='http://www.baidu.com/'+response.data.data.img;
            }
          })
    },
    closeChange() {
      if (this.text || this.imgDataUrl) {
        axios({
          method: "post",
          url:'zky/user/changeUSerName',
          data: {
            userid: this.$store.state.userIdCode,
            head: '' || this.imgDataUrl,
            brief: '' || this.text,
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
            if (this.text !== '') {
              this.$store.state.brief = this.text;
              localStorage.setItem('brief', this.text);
            } else if (this.imgDataUrl !== '') {
              this.$store.state.head = this.imgDataUrl;
              localStorage.setItem('head', this.imgDataUrl);
            }
          }
        }).catch(error => {
          console.log(error);
        });
        this.changeShow = false;
      } else {
        alert('未输入')
      }
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
        display: block;
        object-fit: cover;
      }
      .reset {
        font-size: 14px;
        margin-top: 50px;
      }
      .reset:hover {
        cursor: pointer;
        color: #0e98f3;
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
      .myChange {
        width: 90%;
        font-size: 14px;
        .changeHead {
          margin-top: 10px;
        }
        .box {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: flex-start;
          .headPic {
            font-size: 0;
            margin-top: 10px;
          }
          .headPic::-webkit-file-upload-button {
            color: #333;
            outline: none;
            font-size: 14px;
            padding: 8px 22px;
            border-radius: 5px;
            background: #efeeee;
          }
          .submitFile {
            outline: none;
            margin-left: 5px;
            color: #858585;
            padding: 8px 22px;
            border-radius: 5px;
            background: #e9f1e9;
          }
          .preview {
            width: 150px;
            height: 150px;
            margin-top: 10px;
            position: relative;
            background-size: cover;
            background-position: 50%;
            .del {
              top: -0;
              right: -22px;
              width: 20px;
              height: 20px;
              position: absolute;
            }
            .del:hover {
              transition: all .3s;
              transform: scale(1.1);
            }
          }
          .changeBrief {
            margin-top: 10px;
            width: 100%;
            }
            .text {
            width: 90%;
            resize: none;
            height: 100px;
            outline: none;
            display: block;
            margin-top: 10px;
            color: #696969;
          }
          .submit {
            outline: none;
            margin-top: 10px;
          }
        }
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
              background-color: #4cb1f555;
            }
            .tip_like {
              color: #fa5369;
            }
            .tip_like:hover, .choose_like {
              color: #fff;
              background-color: #fa536955;
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
