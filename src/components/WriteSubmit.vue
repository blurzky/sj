<template>
  <transition name="alert" appear>
    <div class="container" @mousewheel.prevent>
      <div class="all">
        <div class="title">确认提交？</div>
        <div class="choise">
          <img class="retry" src="../pic/write/no.png" @click="closeSubmit"/>
          <img class="submit" src="../pic/write/yes.png" @click="postSubmit"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    postSubmit() {
      this.$emit('postSubmit');
    },
    closeSubmit() {
      this.$emit('closeSubmit');
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #3e3e3e93;
  .all {
    top: 50%;
    left: 50%;
    position: absolute;
    border-radius: 10px;
    padding-bottom: 25px;
    background-color: #fff;
    border: 2px solid #46b2fa;
    transform: translate(-50%,-50%);
    .title {
      width: 400px;
      font-size: 20px;
      line-height: 100px;
      text-align: center;
    }
    .choise {
      display: flex;
      margin: 20px 50px;
      align-items: flex-start;
      justify-content: space-around;
      .submit, .retry {
        width: 35px;
        height: 35px;
        display: block;
      }
      .submit:hover, .retry:hover {
        transform: scale(1.3);
        transition: all .3s;
      }
    }
  }
}
.alert-enter, .alert-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.alert-enter-active, .alert-leave-active {
  transition: all .3s ease;
}
</style>