<template>
  <div class="container" v-if="banner">
    <div class="bg">
      <div class="arrow" @click="moveLeft(),stopPlay()"></div>
      <div class="cover" :style="{width: `${width}px`}">
        <div class="wrapper" :style="{width: `${width * banner.length}px`, transform: `translateX(${-num * width}px)`}">
          <img :src="item.picture" v-for="(item,index) in banner" :key="index" :style="{width: `${width}px`}" @click="goDetail(item.id)"/>
        </div>
        <div class="list">
          <div class="white" v-for="(item,index) in banner.length" :key="index" :class="num === index ? `blue` : ''" @click="change(index)"></div>
        </div>
      </div>
      <div class="arrow2" @click="moveRight(),stopPlay()"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['banner'],
  data () {
    return {
      width: '',
      num: 1,
      timer: '',
    }
  },
  created() {
    this.width = document.body.clientWidth - 600;
  },
  mounted() {
    this.autoplay();
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail?movie=${id}`);
    },
    moveRight() {
      this.num ++;
      if(this.num > this.banner.length - 1) {
        this.num = 0;
      }
    },
    moveLeft() {
      this.num --;
      if(this.num < 0) {
        this.num = this.banner.length -1
      }
    },
    autoplay() {
      this.timer = setTimeout(() => {
        this.moveRight();
        this.autoplay();
      },3000)
    },
    stopPlay() {
      clearTimeout(this.timer);
      this.autoplay();
    },
    change(index) {
      this.stopPlay();
      this.num = index;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  z-index: 0;
  padding-top: 40px;
  position: relative;
  .bg {
    display: flex;
    padding-top: 5px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to top, #fff 10%, #7dbcf7 80%);
    .arrow, .arrow2 {
      width: 50px;
      height: 50px;
      margin-right: 80px;
      background-size: 100%;
      transform: translateY(-50%);
      background-repeat: no-repeat;
      background-image: url('../pic/lunbo/左箭头.png');
    }
    .arrow2 {
      margin-right: 0;
      margin-left: 80px;
      background-image: url('../pic/lunbo/右箭头.png');
    }
    .arrow2:hover {
      background-image: url('../pic/lunbo/右箭头blue.png');
    }
    .arrow:hover {
      background-image: url('../pic/lunbo/箭头blue.png');
    }
    .cover {
      overflow: hidden;
      position: relative;
      .wrapper {
        display: flex;
        align-items: center;
        transition: all .3s;
        justify-content: flex-start;
        &>img {
          height: 600px;
          display: block;
          object-fit: cover;
        }
      }
      .list {
        left: 50%;
        bottom: 0;
        display: flex;
        position: absolute;
        transform: translate(-50%,-50%);
        .white {
          width: 15px;
          height: 15px;
          cursor: pointer;
          margin-left: 25px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-image: url('../pic/lunbo/圆点.png')
        }
        .blue {
          background-image: url('../pic/lunbo/圆点blue.png')
        }
      }
    }
  }
}
</style>