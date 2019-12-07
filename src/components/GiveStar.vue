<template>
  <transition name="alert" appear>
    <div class="container" @mousewheel.prevent>
      <div class="bg">
        <div class="box">
          <div class="title">您的评价为: {{myPraise}}</div>
          <div class="star">
            <div v-for="(item,index) in 5" :key="index" :class="index < star ? `yellow` : `grey`"></div>
          </div>
          <div class="action">
            <div class="retry" @click="closeGive()">取消</div>
            <div class="submit" @click="give()">确定</div>
          </div>
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
    give() {
      this.$emit("give");
    },
    closeGive() {
      this.$emit("closeGive")
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
      .action {
        display: flex;
        margin: 0 50px;
        align-items: flex-start;
        justify-content: space-around;
        .submit, .retry {
          width: 80px;
          color: #1398f1;
          line-height: 30px;
          text-align: center;
          border-radius: 8px;
          border: 1px solid #1398f1;
        }
        .submit:hover, .retry:hover {
          color: #fff;
          cursor: pointer;
          transition: all .3s;
          background-color: #1398f1;
        }
        .retry {
          color: #fc676e;
          border: 1px solid #fc676e;
        }
        .retry:hover {
          background-color: #fc676e;
        }
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