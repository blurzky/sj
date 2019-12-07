<template>
  <div class="container">
    <div class="type" v-for="(item,index) in type" :key="index">
      <div class="title">
        <div class="type_name">{{item.typeName}}</div>
        <div class="detail" @click="goPage(index)">点击查看更多 >></div>
      </div>
      <div class="line">
        <div class="content" v-for="({id, cover, title, score, content},index) in item.movie" :key="index">
          <img :src="cover" class="photo" @click="goDetail(id)">
          <div class="all">
            <div class="name">{{title}}</div>
            <div class="point" v-if="score">{{score.toFixed(1)}}</div>
          </div>
          <div class="info">{{content}}</div>
        </div>
        <div class="more"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  methods: {
    goPage(index) {
      this.$router.push(`/typePage?index=${index}`)
    },
    goDetail(id) {
      this.$router.push(`/detail?movie=${id}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .type {
    margin: 30px 0;
    .title {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      .type_name {
        font-size: 24px;
      }
      .detail {
        font-size: 14px;
        margin-left: 10px;
      }
      .detail:hover {
        cursor: pointer;
        color: #7dbcf5;
      }
    }
    .line {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .content {
        width: 200px;
        overflow: hidden;
        margin: 20px 20px 0 0; 
        background-color: #f1f1f1;
        .photo {
          width: 100%;
          height: 280px;
          object-fit: cover;
        }
        .photo:hover {
          transform: scale(1.05);
          transition: transform .5s;
        }
        .all {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .name {
            width: 150px;
            font-size: 14px;
            overflow: hidden;
            margin-left: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
          .point {
            flex: 1;
            text-align: end;
            font-size: 16px;
            color: #f83314;
            margin-right: 10px;
          }
        }
        .info {    
          font-size: 12px;
          overflow: hidden;
          color: #9c9b9b;
          min-height: 60px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
      }
      .more {
        width: 40px;
        height: 30px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('../pic/type/more_before.png');
      }
      .more:hover {
        transition: 0.3s;
        background-image: url('../pic/type/more_after.png');
      }
    }
  }
}
</style>