<template>
  <transition name="alert" appear>
    <div class="container" @mousewheel.prevent>
      <div class="bg">
        <div class="box">
          <div class="title">您的评价为: {{myPraise}}</div>
          <div class="star">
            <div v-for="(item,index) in 5" :key="index" :class="index < star ? `yellow` : `grey`"></div>
          </div>
          <div class="enter" @click="close()">确定</div>
          <img src="../pic/detail/back.png" class="back" @click="close()"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['star','myPraise'],
  data () {
    return {
    }
  },
  methods: {
    close() {
      this.$emit("close")
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
  .bg {
    .box {
      top: 50%;
      left: 50%;
      width: 400px;
      height: 200px;
      position: absolute;
      border-radius: 10px;
      background-color: #fff;
      transform: translate(-50%,-50%);
      .title {
        margin: 20px;
        font-size: 20px;
      }
      .star {
        margin: 30px 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .grey, .yellow {
          width: 30px;
          height: 30px;
          background: center / cover;
        }
        .grey {
          background-image: url('../pic/detail/halfstar.png');
        }
        .yellow {
          background-image: url('../pic/detail/star_after.png');
        }
      }
      .enter {
        width: 100px;
        margin: 0 auto;
        color: #1398f1;
        line-height: 35px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #1398f1;
      }
      .enter:hover {
        color: #fff;
        background-color: #1398f1;
      }
      .back {
        top: 0px;
        width: 40px;
        right: -45px;
        height: 40px;
        object-fit: cover;
        position: absolute;
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