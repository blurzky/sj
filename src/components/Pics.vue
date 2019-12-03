<template>
  <transition name="pics" appear>
    <div class="container" @mousewheel.prevent @click="closePic" :style="{height: `${height}px`}">
      <div class="pic">
        <img class="left_arrow" src="../pic/lunbo/左箭头.png" @click.stop @click="left" v-if="main.length != 1">
        <img class="picture" :src="main[number]"/>
        <img class="right_arrow" src="../pic/lunbo/右箭头.png" @click.stop @click="right" v-if="main.length != 1">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['main','number'],
  data() {
    return {
      height: '',
    }
  },
  created() {
    this.height = document.documentElement.clientHeight;
  },
  methods: {
    left() {
      this.$emit('left')
    },
    right() {
      this.$emit('right')
    },
    closePic() {
      this.$emit('closePic');
    },
  },
  components: {
    Loading: () => import('./Loading/Loading'),
  },
}
</script>

<style lang="scss" scoped>
.container {
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  position: fixed;
  background-color: #000000d8;
  .pic {
    height: 100%;
    display: flex;
    margin: 0 150px;
    align-items: center;
    justify-content: flex-start;
    .left_arrow, .right_arrow {
      height: 50px;
    }
    .left_arrow:hover, .right_arrow:hover {
      transform: scale(1.2);
      transition: all .2s;
    }
    .picture {
      height: 100%;
      margin: 0 150px;
      object-fit: contain;
    }
  }
}
.pics-enter, .pics-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.pics-enter-active, .pics-leave-active {
  transition: all .3s;
}
</style>