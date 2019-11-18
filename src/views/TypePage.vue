<template>
  <div class="container">
    <TopNav/>
    <div class="all">
      <div class="movie" v-for="(item,index) in type" :key="index">
        <img :src="item.head">
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div class="point">{{item.point}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return{
      type: [],
      top: [{
        head: require('../pic/type/xsk.webp'),
        name: '肖申克的救赎',
        point: 9.7,
      },{
        head: require('../pic/type/xsk.webp'),
        name: '肖申克的救赎',
        point: 9.7,
      },{
        head: require('../pic/type/xsk.webp'),
        name: '肖申克的救赎',
        point: 9.7,
      },],
      new: [{
        head: require('../pic/type/tqzz.webp'),
        name: '天气之子',
        point: 7.1,
      },{
        head: require('../pic/type/tqzz.webp'),
        name: '天气之子',
        point: 7.1,
      },{
        head: require('../pic/type/tqzz.webp'),
        name: '天气之子',
        point: 7.1,
      },],
      comment: [{
        head: require('../pic/type/joker.webp'),
        name: 'joker 2019',
        point: 9.5,
      },{
        head: require('../pic/type/joker.webp'),
        name: 'joker 2019',
        point: 9.5,
      },{
        head: require('../pic/type/joker.webp'),
        name: 'joker 2019',
        point: 9.5,
      },],
    }
  },
  created() {
    if (this.$route.query.index === '0') {
      this.type = this.top;
    } else if (this.$route.query.index === '1') {
      this.type = this.new;
    } else {
       this.type = this.comment;
    }
  },
  components: {
    TopNav: () => import('../components/TopNav'),
  },
}
</script>
<style lang="scss" scoped>
.container {
  .all{
    display: flex;
    flex-wrap: wrap;
    margin: 40px 0 0 10px;
    align-items: flex-start;
    justify-content: flex-start;
    .movie {
      box-sizing: border-box;
      padding: 30px 0 30px 40px;
      &>img {
        width: 200px;
        height: 280px;
        object-fit: cover;
      }
      .info {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        .name {
          width: 150px;
          font-size: 15px;
          overflow: hidden;
          margin-left: 10px;
          text-overflow: ellipsis;
        }
        .point {
          flex: 1;
          text-align: end;
          font-size: 16px;
          color: #F45454;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
