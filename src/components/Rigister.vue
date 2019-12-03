<template>
  <transition name="login" appear>
    <div class="container" @mousewheel.prevent>
      <div class="login">
        <div class="back" @click="closeLogin()"></div>
        <div class="all">
          <input type="text" class="username" placeholder="用户名:" v-model="userId">
          <input type="password" class="password" placeholder="密码:" v-model="password">
          <input type="password" class="password" placeholder="确认密码:" v-model="rePassword">
          <div class="submit" @click="submit()">注册</div>
        </div>
        <textarea type="text" class="brief" placeholder="个性签名:" v-model="brief"></textarea>
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
      brief: '',
      rePassword: '',
    }
  },
  methods: {
    closeLogin() {
      this.$emit("closeLogin");
    },
    submit() {
      if (this.userId === '' || this.password === '') {
        alert('请输入用户名或密码!');
      } else if(this.userId.includes(' ') || this.password.includes(' ')) {
        alert('请勿输入空格!');
      } else if (this.password != this.rePassword) {
        alert('两次输入密码不一致!');
      } else {
        this.rigis();
      }
    },
    rigis() {
      axios({
        method: "post",
        url:'user/registerUser',
        // headers: {
        //   post: {"Content-type": "application/x-www-form-urlencoded"}
        // },
        data: {
          name: this.userId,
          pwd: this.password,
          brief: this.brief,
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret;
          }
        ]
      }).then(({ data }) => {
        if(data.status === 200) {
          this.$store.commit('login', 1);
        } else {
          alert(data.message);
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
        width: 180px;
        padding: 10px;
        outline: none;
        margin-bottom: 40px;
        border-radius: 5px;
        border: 1px solid #b8b8b8;
      }
      .submit {
        width: 160px;
        color: #2d98fc;
        line-height: 40px;
        text-align: center;
        border-radius: 5px;
        border: 2px solid #2d98fc;
      }
      .submit:hover {
        color: #fff;
        transition: all .3s;
        background-color: #2d98fc;
      }
    }
    .brief {
      width: 220px;
      outline: none;
      height: 280px;
      border-radius: 5px;
      margin-right: 50px;
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