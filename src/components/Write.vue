<template>
  <div class="container">
    <div class="write">
      <textarea class="content" cols="30" rows="10" placeholder="写短评......" v-model="myWrite"></textarea>
    </div>
    <div class="action">
      <button class="submit" @click="deleteWrite()">清空</button>
      <button class="submit" @click="closeWrite()">提交</button>
    </div>
    <WriteAlert v-if="show" @closeWriteAlert="closeWriteAlert"/>
  </div>
</template>
<script>
export default {
  data () {
    return{
      myWrite: '',
      show: false,
    }
  },
  components: {
    WriteAlert: () => import('../components/WriteAlert'),
  },
  methods: {
    closeWrite() {
      this.$emit("closeWrite");
      if(this.myWrite === '') {
        this.show = true;
      }
      else {
        console.log(this.myWrite)
      }
    },
    deleteWrite() {
      this.myWrite = '';
    },
    closeWriteAlert() {
      this.show = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-bottom: 100px;
  padding: 20px 0 30px 0;
  .write {
    .content {
      width: 800px;
      height: 100px;
      font-size: 14px;
      border-radius: 5px;
    }
  }
  .action {
    .submit {
      width: 60px;
      height: 30px;
      outline: none;
      border-radius: 5px;
      margin: 0 50px;
    }
  }
}
</style>