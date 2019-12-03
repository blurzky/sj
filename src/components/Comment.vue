<template>
  <div class="container">
    <Pics v-if="picShow" @closePic="closePic" :main="main" :number="number" @right="right" @left="left"/>
    <div class="all" v-for="(item,index) in type" :key="index">
      <div class="i">{{msg}} 的{{item}}  ·  ·  ·  ·  ·  ·
      </div>
      <div class="imore" v-if="index === 0">
        <p>电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。</p>
        <p>本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。</p>
　　   </div>
      <div class="pics" v-else-if="index === 1">
        <img :src="item" v-for="(item,index) in main" :key="index" @click="openPic(main, index)"/>
      </div>
      <div class="comment" v-else>
        <div class="person" v-for="({username, star, date, praise, content, times},index) in user" :key="index">
          <div class="title">
            <div class="username">{{username}}</div>
            <div v-for="(item,index) in 5" :key="index" :class="index < star ? `yellow` : `grey`"></div>
            <div class="date">{{date}}</div>
            <div class="praise">{{praise}}</div>
            <praise :praise="praise" @praisePlus="praisePlus(index)"/>
          </div>
          <div class="brief_comment">{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['msg'],
  data () {
    return {
      num: 0,
      picShow: false,
      type: ['内容简介','剧照','短评'],
      main: [
        require('../pic/detail/joker.webp'),
        require('../pic/detail/1.webp'),
        require('../pic/detail/2.webp'),
        require('../pic/detail/3.webp'),
        require('../pic/detail/4.webp'),
        require('../pic/detail/5.webp')
      ],
      number: 0,
      user:[{
          username: 'zky',
          star: 5,
          date: '2019-11-20',
          praise: 50,
          times: 0,
          content: '希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。'
        },{
          username: 'zky',
          star: 5,
          date: '2019-11-20',
          praise: 50,
          times: 0,
          content: '希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。'
        },{
          username: 'zky',
          star: 5,
          date: '2019-11-20',
          praise: 50,
          times: 0,
          content: '希斯·莱杰之后无小丑“这个论述终于是被打破了。这是当代电影史的光荣日。'
        },{
          username: '桃桃林林 ',
          star: 4,
          date: '2019-10-03',
          praise: 30,
          times: 0,
          content: '9分，菲尼克斯值得一座奥斯卡，表演太带情绪了，以无法抑制的狂笑表达痛苦，竟然笑到让人难过。影片与之前大部分超级英雄电影截然不同，没有特效、没有奇观、甚至没太多动作场面。而是以略复古的方式，讲小丑为什么会成为那个小丑。其实是挺严肃的一部片子，包括去关注社会问题。片子还挺邪恶的，会让你有些同情这个小丑。另外，这片应该是无法续集和衍生，因为还是太实了，如果这个角色重新漫画化，也就不再是他了。'
      }]
    }
  },
  methods: {
    openPic(main, index) {
      this.number = index;
      this.picShow = true;
    },
    closePic() {
      this.picShow = false;
    },
    left() {
      if( this.number > 0) {
        this.number--;
      }
    },
    right() {
      if( this.number < 5) {
        this.number++;
      }
    },
    change(index) {
      this.num = index;
    },
    praisePlus(index) {
      if (this.user[index].times === 0) {
      this.user[index].praise ++;
      this.user[index].times ++;
      } else {
        this.user[index].praise -= 1; 
        this.user[index].times --;
      }
    }
  },
  components: {
    praise: () => import('./Praise'),
    Pics: () => import('./Pics'),
  }
}
</script>
<style lang="scss" scoped>
.container {
  .all {
    width: 800px;
    margin-top: 20px;
    .i {
      font-size: 14px;
      color: #1398f1;
      margin-bottom: 10px;
      .all, .to_write {
        font-size: 12px;
        margin-left: 50px;
      }
      .all:hover, .to_write:hover {
        color: #fff;
        background-color: #1398f1;
      }
    }
    .imore {
      font-size: 12px;
      word-break: break-all;
      &>p {
        text-indent: 2em;
        margin-block-end: 0em;
        margin-block-start: 0em;
      }
    }
    .pics {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      &>img {
        width: 110px;
        height: 110px;
        display: block;
        object-fit: cover;
      }
    }
    .comment {
      .person {
        padding-top: 10px;
        border-top: 1px solid #eeeeee;
        .title {
          display: flex;
          font-size: 14px;
          align-items: center;
          justify-content: flex-start;
          .username {
            color: #1398f1;
            line-height: 14px;
            margin-right: 10px;
          }
          .username:hover {
            color: #fff;
            background-color: #1398f1;
          }
          .grey, .yellow {
            width: 15px;
            height: 15px;
            background: center / cover;
          }
          .grey {
            background-image: url('../pic/detail/halfstar.png');
          }
          .yellow {
            background-image: url('../pic/detail/star_after.png');
          }
          .date {
            flex: 1;
            margin: 0 10px;
            color: #6b6a6a;
            line-height: 14px;
          }
          .praise {
            color: #6b6a6a;
          }
        }
        .brief_comment {
          font-size: 13px;
          margin: 10px 0 ;
          max-height: 68px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>