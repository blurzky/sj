<template>
  <transition name="pics" appear>
    <div class="container" @mousewheel.prevent @click="closePic" :style="{height: `${height}px`, width: `${width}px`}">
      <div class="pic">
        <img class="left_arrow" src="../pic/lunbo/左箭头.png" @click.stop @click="left" v-if="main.length != 1" :title="photoNumber === 0 ? `已经是第一张了` : `上一张`">
        <img :class="main.length == 1 ? 'mainPicture' : 'picture'" :src="main[photoNumber]"/>
        <img class="right_arrow" src="../pic/lunbo/右箭头.png" @click.stop @click="right" v-if="main.length != 1" :title="photoNumber === 5 ? `已经是最后一张了` : `下一张`">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['main','photoNumber'],
  data() {
    return {
      height: '',
    }
  },
  created() {
    this.screen();
    this.height = window.screen.height;
    this.width = window.screen.availWidth;
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.quit , false);
  },
  methods: {
    quit() {
      if (document.fullscreenElement) {
        console.log('进入全屏')
      } else {
        this.$emit('closePic');
        document.removeEventListener("fullscreenchange", this.quit);
        console.log('退出全屏');
      }
    },
    screen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        } 
      }
      this.fullscreen = !this.fullscreen;
    },
    left() {
      this.$emit('left')
    },
    right() {
      this.$emit('right')
    },
    closePic() {
      this.screen();
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
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  .pic {
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_arrow, .right_arrow {
      width: 50px;
      height: 50px;
    }
    .left_arrow:hover, .right_arrow:hover {
      transition: all .2s;
      transform: scale(1.2);
    }
    .mainPicture {
      width:100%;
      height: 100%;
      object-fit: contain;
    }
    .picture {
      height: 100%;
      object-fit: contain;
      width: calc(100% - 300px);
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