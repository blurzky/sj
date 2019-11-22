<template>
  <div class="container" @mousewheel.prevent @click="closeWriteAlert">
    <div class="all" @click.stop>您还没有写短评！</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    closeWriteAlert() {
      this.$emit("closeWriteAlert")
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
    width: 400px;
    font-size: 20px;
    text-align: center;
    line-height: 200px;
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    border: 2px solid #46b2fa44;
    transform: translate(-50%,-50%);
  }
}
</style>