<template>
  <div class="container" @mousewheel.prevent>
    <div class="login">
      <div class="back" @click="closeLogin()"></div>
      <div class="all">
        <input type="text" class="username" placeholder="username:" v-model="userId">
        <input type="password" class="password" placeholder="password:">
        <div class="submit" @click="submit()">Login</div>
      </div>
    </div>
  </div>
</template>
<script>
import { timeout } from 'q';
export default {
  data () {
    return {
      userId: '',
    }
  },
  methods: {
    closeLogin() {
      this.$emit("closeLogin");
    },
    submit() {
      if (this.userId === '') {
        alert('请输入！');
      } else {
        this.$store.commit('getUserId', this.userId);
        this.$store.commit('login', 2);
        this.closeLogin();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  color: #000;
  position: fixed;
  background-color: #161616da;
  .login {
    top: 50%;
    left: 50%;
    height: 400px;
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    border: 8px solid #b8b8b8;
    transform: translate(-50%,-50%);
    .back {
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      position: absolute;
      background: center / cover;
      background-image: url('../pic/login/back.png');
    }
    .back:hover {
      background-image: url('../pic/login/back_red.png')
    }
    .all {
      width: 300px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      .username, .password {
        width: 200px;
        margin: 60px 0 0 0;
        outline: none;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #b8b8b8;
      }
      .submit {
        width: 200px;
        margin: 70px 0;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        color: #2d98fc;
        border: 2px solid #2d98fc;
      }
      .submit:hover {
        color: #fff;
        background-color: #2d98fc;
      }
    }
  }
}
</style>