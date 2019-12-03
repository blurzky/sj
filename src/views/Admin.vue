<template>
  <div class="container">
    <div class="top">
      <img src="../pic/admin/back.png" class="back" @click="$router.go(-1)">
      后台管理系统
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
  z-index: 50;
  position: relative;
  .top {
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    position: relative;
    background-color: #2d98fc;
    .back {
      top: 5px;
      left: 20px;
      height: 30px;
      position: absolute;
    }
    .back:hover {
      cursor: pointer;
      transition: all .3s;
      transform: scale(1.2);
    }
  }
}
</style>