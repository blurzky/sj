<template>
  <div class="container" @mousewheel.prevent>
    <div class="top">
      <div class="name">
        家庭影视
      </div>
      <div class="choise" @mouseover="mouseOver" @mouseleave="mouseLeave">
        <img src="../pic/topNav/九宫格.png" class="enter">
        导航
        <img src="../pic/topNav/下拉.png" class="arrow" :style="listShow ? {transform: `rotate(-90deg)`} : ''">
        <div class="list" v-if="listShow">
          <div v-for="(item,index) in page" :key="index" class="page"  @mouseover="on(index)" @mouseleave="leave(index)" :class="num === index ? `active` : ''" @click="goPage(index)">{{item}}</div>
        </div>
      </div>
      <div class="division"></div>
      <img class="homepage" v-if="user" src="../pic/topNav/home.png"/>
      <div class="mine" v-if="user" @click="$router.push('/person')">{{user}}</div>
      <div v-if="!user" class="login" @click="login()">登录</div>
      <div v-if="!user" class="register">注册</div>
      <div class="quit" v-else @click="quit()">退出</div>
      <img class="quit_arrow" src="../pic/topNav/quit.png" v-if="user">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: ['首页','动漫','电影','影评'],
      listShow: false,
      num: -1,
      user: '',
    }
  },
  computed: {
    change() { 
      return this.$store.state.userId;
    }
  },
  watch: {
    change(val, oldVal) {
      this.user = val;
    }
  },
  methods: {
    mouseOver() {
      this.listShow = true;
    },
    mouseLeave() {
      this.listShow = false; 
    },
    on(index) {
      this.num = index
    },
    leave(index) {
      this.num = -1
    },
    quit() {
      this.user = '';
      this.$store.commit('login', 0);
    },
    goPage(index) {
      if(index === 0) {
        this.$router.push('/'); 
      }
      if(index === 3) {
        this.$router.push('/typePage');
      }
    },
    login() {
      this.$store.commit('login', 1);
    },
  }
}
</script>

<style scoped lang="scss">
.container {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  color: #fff;
  position: fixed;
  background: #2d98fc;
  .top {
    height: 40px;
    display: flex;
    align-items: center;
    width: calc(100% - 200px);
    justify-content: flex-start;
    .name {
      font-size: 22px;
      margin-left: 10%;
      line-height: 24px;
      margin-right: 30px;
    }
    .choise {
      width: 80px;
      display: flex;
      font-size: 17px;
      line-height: 40px;
      position: relative;
      align-items: center;
      justify-content: flex-start;
      .enter {
        width: 15px;
        height: 15px;
        margin: 0 5px 0 2px;
      }
      .arrow {
        width: 10px;
        height: 10px;
        margin-left: 5px;
        transition: transform .3s;
      }
      .list {
        top: 0;
        left: 80px;
        display: flex;
        position: absolute;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: #2d98fc62;
        .page {
          width: 80px;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          border-right: 1px solid #ebebe8;
        }
        .active {
          border-radius: 5px;
          transform: scale(1.1);
          transition: transform .4s;
          background-color: #8cc4f8;
        }
      }
    }
    .division {
      flex: 1;
    }
    .homepage {
      width: 20px;
      height: 20px;
    }
    .mine {
      font-size: 14px;
      margin-left: 5px;
      text-align: center;
      text-decoration: underline  #fff;
    }
    .mine:hover {
      color: #0661f5;
      text-decoration: underline  #0661f5;
    }
    .login, .register {
      font-size: 14px;
      margin-left: 50px;
    }
    .login:hover, .register:hover {
      color: #0661f5;
    }
    .quit {
      font-size: 14px;
      margin-left: 50px;
    }
    .quit:hover {
      color: #f46464;
    }
    .quit_arrow {
      width: 15px;
      height: 15px;
      margin-left: 5px;
    }
  }
}
</style>
