<template>
  <div class="loading">
    <div class="status">
      <img src="./load.gif" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.loading {
  top: 50%;
  left: 50%;
  width: 100%;
  z-index: 100;
  height: 100%;
  position: fixed;
  text-align: center;
  background-color: #fff;
  transform: translate(-50%, -50%);
  .status {
    & > img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>