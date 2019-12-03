<template>
  <div class="container">
    <div class="write">
      <textarea class="content" cols="30" rows="10" placeholder="写短评......" v-model="myWrite"></textarea>
    </div>
    <div class="action">
      <button class="submit" @click="deleteWrite()">清空</button>
      <button class="submit" @click="closeWrite()">提交</button>
    </div>
    <WriteAlert v-if="alert"/>
    <WriteSubmit v-if="submit" @closeSubmit="closeSubmit" @postSubmit="postSubmit"/>
  </div>
</template>
<script>
export default {
  data () {
    return{
      myWrite: '',
      alert: false,
      submit: false,
    }
  },
  components: {
    WriteAlert: () => import('./WriteAlert'),
    WriteSubmit: () => import('./WriteSubmit'),
  },
  methods: {
    closeWrite() {
      if(this.myWrite === '') {
        this.alert = true;
        setTimeout(() => {
          this.alert = false
        },1500)
      }
      else {
        this.submit = true;
      }
    },
    deleteWrite() {
      this.myWrite = '';
    },
    postSubmit() {
      this.$emit("closeWrite");
      console.log(this.myWrite)
    },
    closeSubmit() {
      this.submit = false
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
      margin: 0 50px;
      border-radius: 5px;
    }
  }
}
</style>