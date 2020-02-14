<template>
  <div class=" container">
    <div class="cover" >
      <div class="box1">
        <div class="nav">
        </div>
      </div>
      <div class="box2" :style="distance >= 380 ? {left: `${distance - 380}px`} : ``">
        <div class="nav">
        </div>
      </div>
      <div class="box3" @mousedown="start" @mousemove="move" @mouseup="end" @mouseleave="end" :style="{left: `${distance}px`}">
        <div class="nav">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      moveX: 0,
      distance: 0,
      go: false,
      sum : 0,
    }
  },
  methods: {
    start(e) {
      this.startX = e.pageX;
      this.go = true;
      
    },
    move(e) {
      if (this.go) {
        this.moveX = e.pageX;
        this.distance = this.moveX - this.startX + this.sum;
        if (this.distance <= 0) {
          this.distance = 0
        } else if((this.moveX - this.startX) < 0 && this.distance > 380 && this.distance < 760) {
          
          console.log(2);
        } else if (this.distance >= 760) {
          this.distance = 760
          console.log(1);
        }
      }
    },
    end() {
      this.go = false;
      this.sum = this.distance;
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 40px;
  .cover {
    display: flex;
    height: 600px;
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;
    .box1, .box2, .box3 {
      top: 0;
      left: 0;
      width: 400px;
      height: 100%;
      position: absolute;
      margin-right: -20px;
      background-color: #e4e4f7;
      border-radius: 0 20px 20px 0;
      .nav {
        width: 20px;
        height: 100%;
        background-color: #7577fc;
      }
    }
    .box1 {
      z-index: 1;
    }
    .box2 {
      z-index: 5;
    }
    .box3 {
      z-index: 10;
    }
  }
}
</style>