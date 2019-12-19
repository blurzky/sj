<template>
  <div class="container">
    <div class="leftNav">{{name}}</div>
    <div class="all">
      <div class="movie" v-for="({id, cover, title, score, content},index) in type" :key="index">
        <img :src="cover" :title="title"  @click="goDetail(id)" class="cover">
        <div class="info">
          <div class="name">{{title}}</div>
          <div class="point" v-if="score">{{score.toFixed(1)}}</div>
        </div>
        <div class="content">{{content}}</div>
      </div>
    </div>
    <div class="end">
      <div class="left" @click="lastPage">上一页</div>
      <div class="right" @click="nextPage">下一页</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      type: [],
      name: '',
      typeName: ['高分电影', '最新上映', '专业影评'],
      size: 0,
      page: null,
    }
  },
  created() {
    this.searchMovies();
    this.findMoviesCounts();
    this.name = this.typeName[this.$route.query.index];
  },  
  methods: {
    lastPage() {
      if (this.size > 0) {
        this.size --;
        this.searchMovies();
      } else {
        alert('已经是第一页了');
      }
    },
    nextPage() {
      if (this.size < this.page) {
        this.size ++;
        this.searchMovies();
      } else {
        alert('已经是最后一页了');
      }
    },
    searchMovies() {
      axios({
        method: "post",
        url:'content/searchMovies',
        data: {
          type: this.$route.query.index - (-1),
          size: this.size,
          keyWord: '',
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
          this.type = data;
        } else {
          alert(message);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    findMoviesCounts() {
      axios({
        method: "post",
        url:'content/findMoviesCounts',
        data: {
          type: this.$route.query.index - (-1),
          keyWord: '',
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
          this.page = parseInt(data/20);
        } else {
          alert(message);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    goDetail(id) {
      this.$router.push(`/detail?movie=${id}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 40px 0;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .leftNav {
    top: 30px;
    left: 60px;
    width: 120px;
    height: 400px;
    color: #fff;
    font-size: 22px;
    position: fixed;
    line-height: 300px;
    text-align: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('../pic/type/leftNav.png');
  }
  .all {
    width: 1300px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    .movie {
      box-sizing: border-box;
      padding: 20px 0 0 40px;
      .cover {
        width: 270px;
        height: 378px;
        display: block;
        object-fit: cover;
      }
      .cover:hover {
        width: 264px;
        height: 372px;
        border: 3px solid #7bc7fa;
        transition: all .2s;
      }
      .info {
        padding: 5px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        background-color: #f1f1f1;
        .name {
          width: 220px;
          font-size: 14px;
          overflow: hidden;
          min-height: 30px;
          line-height: 15px;
          display: -webkit-box;
          word-break: keep-all;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        .point {
          flex: 1;
          height: 30px;
          text-align: end;
          font-size: 16px;
          color: #F45454;
        }
      }
      .content {
        width: 260px;
        padding: 5px;
        font-size: 12px;
        overflow: hidden;
        color: #9c9b9b;
        min-height: 60px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        word-break: break-all;
        text-overflow: ellipsis;
        background-color: #f1f1f1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .end {
    width: 500px;
    display: flex;
    margin-top: 40px;
    align-items: center;
    justify-content: space-between;
    .left, .right {
      font-size: 15px;
    }
    .left:hover, .right:hover {
      cursor: pointer;
      color: #48b0f5;
    }
  }
}
</style>
