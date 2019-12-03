<template>
  <div class="container">
    <div class="like" @click="praisePlus" :class="num === 1 ? `liked` : ``">有用</div>
    <transition name="plus">
      <div class="plus_one" v-if="plus && show">+1</div>
    </transition>
    <transition name="reduce">
      <div class="reduce_one" v-if="reduce">-1</div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0,
      show: true,
      plus: false,
      reduce: false,
    }
  },
  methods: {
    praisePlus() {
      if (this.$store.state.userId != '') {
        if(this.plus === false) {
          this.plus = true;
          this.num ++;
          this.$emit('praisePlus');
          setTimeout(() => {
            this.show = false
          },1000)
        } else {
          this.plus = false;
          this.num --;
          this.$emit('praisePlus');
          this.show = true;
          this.reduce = true;
          setTimeout(() => {
            this.reduce = false
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
    background-color: #1398f1;
  }
  .plus_one, .reduce_one {
    left: -20px;
    top: -25px;
    font-size: 14px;
    color: #1398f1;
    font-weight: 600;
    position: absolute;
  }
  .reduce_one {
    left: -15px;
  }
}
.plus-enter, .plus-leave-to, .reduce-enter, .reduce-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
.plus-enter-active, .plus-leave-active, .reduce-enter-active,.reduce-leave-active{
  transition: all 0.5s ease;
}

</style>