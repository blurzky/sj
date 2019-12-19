<template>
  <div class="container">
    <div class="like" :title="type === 1 ? '已点' : '点赞'" @click="praiseAct" :class="type === 1 ? `liked` : ``">有用</div>
    <transition name="plus">
      <div class="plus_one" v-if="show">{{num}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      num: '',
      show: false,
    }
  },
  methods: {
    praiseAct() {
      if (this.$store.state.userId) {
        if(this.type === 0) {
          this.num = '+1',
          this.show = true;
          this.$emit('praiseAct');
          setTimeout(() => {
            this.show = false;
          },1000)
        } else {
          this.num = `-1`,
          this.show = true;
          this.$emit('praiseAct');
          setTimeout(() => {
            this.show = false;
          },1000)
        }
      } else {
        this.$store.state.type = 1;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .like {
    margin-left: 2px;
    color: #1398f1;
    transition: all .3s;
  }
  .like:hover, .liked {
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    background-color: #1398f1;
  }
  .plus_one {
    top: -25px;
    left: -30px;
    width: 30px;
    font-size: 14px;
    color: #1398f1;
    font-weight: 600;
    text-align: center;
    position: absolute;
    // letter-spacing: 3px;
  }
}
.plus-enter, .plus-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.plus-enter-active, .plus-leave-active {
  transition: all 0.5s ease;
}

</style>