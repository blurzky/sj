<template>
  <div class="container" @mousewheel.prevent>
    <div class="top">
      <div class="name" @click="$router.push('/')">家庭影视</div>
      <div class="choise" @mouseover="mouseOver" @mouseleave="mouseLeave">
        <img src="../pic/topNav/九宫格.png" class="enter">
        导航
        <img src="../pic/topNav/下拉.png" class="arrow" :style="listShow ? {transform: `rotate(-90deg)`} : ''">
        <div class="list" v-if="listShow">
          <div v-for="(item,index) in page" :key="index" class="page"  @mouseover="on(index)" @mouseleave="leave(index)" :class="num === index ? `active` : ''" @click="goPage(index)">{{item}}</div>
        </div>
      </div>
      <div class="division"></div>
      <img class="homepage" v-if="user != 'zky' && user" src="../pic/topNav/home.png"/>
      <a class="admin" v-if="user === 'zky'" href='http://zky.liyi.life/'>管理员</a>
      <div class="mine" v-if="user" @click="$router.push('/person')">{{user}}</div>
      <div v-if="!user" class="login" @click="login()">登录</div>
      <div v-if="!user" class="register" @click="register()">注册</div>
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
      user: this.$store.state.userId,
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
      this.$store.commit('getUserId', {});
      this.$router.push('/');
    },
    goPage(index) {
      if(index === 0) {
        this.$router.push('/'); 
      } else if (index === 1) {
        this.$router.push('/comic')
      } else if(index === 3) {
        this.$router.push('/typePage?index=2');
      }
    },
    login() {
      this.$store.commit('login', 1);
    },
    register() {
      this.$store.commit('login', 2);
    }
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
    .name:hover {
      cursor: pointer;
    }
    .choise {
      display: flex;
      font-size: 17px;
      cursor: pointer;
      line-height: 40px;
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
        display: flex;
        margin-left: 10px;
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
          transform: scaleX(1.1);
          transition: transform .4s;
          background-color: #8cc4f8;
          border-right: 1px solid #8cc4f8;
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
    .admin {
      padding: 0 5px;
      font-size: 14px;
      border-radius: 5px;
    }
    .admin:visited {
      color: #fff;
    }
    .admin:hover {
      cursor: pointer;
      color: #0661f5;
      transition: all .6s;
      transform: scale(1.1);
      background-color: #fff;
    }
    .mine {
      font-size: 14px;
      margin-left: 10px;
      text-align: center;
      text-decoration: underline  #fff;
    }
    .mine:hover {
      cursor: pointer;
      color: #0661f5;
      transition: all .4s;
      text-decoration: underline  #0661f5;
    }
    .login, .register {
      font-size: 14px;
      margin-left: 50px;
    }
    .login:hover, .register:hover {
      cursor: pointer;
      color: #0661f5;
      transition: all .3s;
    }
    .quit {
      font-size: 14px;
      margin-left: 50px;
    }
    .quit:hover {
      cursor: pointer;
      color: #f46464;
      transition: all .3s;
    }
    .quit_arrow {
      width: 15px;
      height: 15px;
      margin-left: 5px;
    }
  }
}
</style>
