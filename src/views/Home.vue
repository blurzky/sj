<template>
  <div class="container">
    <Lunbo :banner="banner"/>
    <Type :type="type"/>
    <div class="top">
    </div> 
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'home',
  data () {
    return {
      type: [],
      banner: [],
    }
  },
  components: {
    Lunbo: () => import('../components/Lunbo'),
    Type: () => import('../components/Type'),
  },
  created() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      axios({
        method: "get",
        url:'content/getMovieList',
        transformRequest: [
          function(data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret;
          }
        ]
      }).then(({data: {data: {banner, highScore, newest, filmReview}, status, message}}) => {
        if(status === 200) {
          this.type = [{
            typeName: '高分电影 ',
            movie: highScore,
            }, {
              typeName: '最新上映',     
              movie: newest,
            }, {
              typeName: '专业影评',     
              movie: filmReview,
          }]
          this.banner = banner;
        } else {
          alert(message);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

}
</style>
