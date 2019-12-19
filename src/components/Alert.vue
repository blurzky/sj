<template>
  <transition name="alert" appear>
    <div class="container" @mousewheel.prevent>
      <div class="all">{{message}}</div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['message'],
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #ffffff00;
  .all {
    top: 50%;
    left: 50%;
    width: 400px;
    font-size: 20px;
    text-align: center;
    line-height: 200px;
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    border: 2px solid #46b2fa;
    transform: translate(-50%,-50%);
  }
}
.alert-enter, .alert-leave-to {
  opacity: 0;
  transform: translateY(-500px);
}
.alert-enter-active, .alert-leave-active {
  transition: all .5s ease;
}
</style>