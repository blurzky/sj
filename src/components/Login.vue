<template>
  <transition name="login" appear>
    <div class="container" @mousewheel.prevent>
      <div class="login">
        <div class="back" @click="closeLogin()"></div>
        <div class="all">
          <input type="text" class="username" placeholder="用户名:" v-model="userId">
          <input type="password" class="password" placeholder="密码:" v-model="password">
          <div class="submit" @click="submit()">登录</div>
          <div class="goRigis" @click="goRigis">还没账号，去注册 >>></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import { timeout } from 'q';
export default {
  data () {
    return {
      userId: '',
      password: '',
      user: {},
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
        this.login();
      }
    },
    login() {
      axios({
        method: "post",
        url:'user/login',
        data: {
          name: this.userId,
          pwd: this.password,
        },
      }).then(({ data:{data, message, status}}) => {
        if (data.userid in localStorage) {
          this.$store.state.data = JSON.parse(localStorage.getItem(data.userid));
          this.$store.state.saw =  this.$store.state.data.saw;
          this.$store.state.like =  this.$store.state.data.like;
        }
        if(status === 200) {
          this.user = data;
          console.log(this.user);
          this.$store.commit('getUserId', this.user);
          this.closeLogin();
          // this.$router.go(0);
        } else {
          alert(message)
        }
      }).catch(error => {
        console.log(error);
      });
    },
    goRigis() {
      this.$store.commit('login', 2);
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
        margin-top: 60px;
        outline: none;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #b8b8b8;
      }
      .submit {
        width: 160px;
        color: #2d98fc;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        margin: 60px 0 60px 0;
        border: 2px solid #2d98fc;
      }
      .submit:hover {
        color: #fff;
        transition: all .3s;
        background-color: #2d98fc;
      }
      .goRigis {
        padding: 0 5px;
        font-size: 13px;
        text-align: end;
        color: #2d98fc;
      }
      .goRigis:hover {
        cursor: pointer;
        text-decoration: underline #2d98fc;
      }
    }
  }
}
.login-enter, .login-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.login-enter-active, .login-leave-active {
  transition: all .3s ;
}
</style>