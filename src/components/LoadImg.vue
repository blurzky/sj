<template>
  <div class="container">
    <input type="file" class="headPic">
     <section>
        <div v-bind:style="{backgroundImage:'url(' + imageUrl + ')'}">
          <i v-if="imageUrl.length == 0" class="el-icon-plus avatar-uploader-icon"></i>
          <input @change="handleUploadImage" type="file" accept="image/jpeg,image/x-png,image/gif"/>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl
    }
  },
  methods: {
    handleUploadImage(e) {
        var file = e.target.files[0]
        var name = e.target.value
        // var fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
        // if (fileName !== 'jpg' && fileName !== 'jpeg' && fileName !== 'png' && fileName !== 'gif') {
        //     this.$message.error('图片格式错误')
        //     return
        // }
        // const isLt2M = file.size / 1024 / 1024 < 10
        // if (!isLt2M) {
        //     this.$message.error('上传图片大小不能超过 10MB!')
        // } else {
        //     this.transformFileToFormData(file)
        // }
    },
    transformFileToFormData(file) {
      try {
          const formData = new FormData()
          formData.append('file', file)
            const _self = this
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function(e) {
              // 图片base64化
              var newUrl = this.result
              _self.imageUrl = newUrl
          }
          this.imgFile = formData
      } catch (e) {
          console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .container {
//   .headPic {
//     font-size: 0;
//   }
//   .headPic::-webkit-file-upload-button {
//     border: 0;
//     color: #333;
//     outline: none;
//     font-size: 14px;  
//     padding: 20px 50px;
//     border-radius: 5px;
//     background: #efeeee;
//     box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);
//   }
// }
</style>