<template>
  <div class="container">
    <div class="type" v-for="(item,index) in type" :key="index">
      <div class="title">
        <div class="type_name">{{item.typeName}}</div>
        <div class="detail" @click="goPage(index)">点击查看更多 >></div>
      </div>
      <div class="line">
        <div class="content" v-for="(item,index) in item.movie" :key="index">
          <img :src="item.photo" class="photo" @click="$router.push('/detail')">
          <div class="all">
            <div class="name">{{item.name}}</div>
            <div class="point">{{item.point}}</div>
          </div>
          <div class="info">{{item.info}}</div>
        </div>
        <div class="more"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: [{
        typeName: '豆瓣高分',
        movie: [{
            photo: require('../pic/type/xsk.webp'),
            name: '肖申克的救赎',
            point: '9.7',
            info: '20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生'
          }, {
            photo: require('../pic/type/ct.webp'),
            name: '超脱',
            point: '8.9',
            info: '亨利•巴赫特（艾德里安•布洛迪 Adrien Brody 饰）来到社区学校担任代课老师。学校因学生反叛、经营不善而濒临绝境，多丽丝（刘玉玲 饰）为首的一批教师备受煎熬。亨利的第一堂课就遭遇了顽劣学生的挑衅，但是被他巧妙地化解'
          }, {
            photo: require('../pic/type/xjcy.webp'),
            name: '星际穿越',
            point: '9.3',
            info: '近未来的地球黄沙遍野，小麦、秋葵等基础农作物相继因枯萎病灭绝，人类不再像从前那样仰望星空，放纵想象力和灵感的迸发，而是每日在沙尘暴的肆虐下倒数着所剩不多的光景'
          }, {
            photo: require('../pic/type/zqbg.webp'),
            name: '忠犬八公的故事',
            point: '9.3',
            info: '八公（Forest 饰）是一条谜一样的犬，因为没有人知道它从哪里来。教授帕克（理查·基尔 Richard Gere 饰）在小镇的火车站拣到一只走失的小狗，冥冥中似乎注定小狗和帕克教授有着某种缘分，帕克一抱起这只小狗就再也放不下来，最终，帕克对小狗八公的疼爱感化了起初极力反对养狗的妻子卡特'
        }]
        }, {
          typeName: '最新上映',     
          movie: [{
              photo: require('../pic/type/tqzz.webp'),
              name: '天気の子',
              point: '7.1',
              info: '高一那年夏天，帆高（醍醐虎汰朗配音）离开位在离岛的家乡，独自一人来到东京，拮据的生活迫使他不得不找份工作，最后来到一间专门出版奇怪超自然刊物的出版社担任写手'
            },{
              photo: require('../pic/type/sndn.webp'),
              name: '少年的你',
              point: '8.4',
              info: '陈念（周冬雨 饰）是一名即将参加高考的高三学生，同校女生胡晓蝶（张艺凡 饰）的跳楼自杀让她的生活陷入了困顿之中'
            },{
              photo: require('../pic/type/joker.webp'),
              name: '小丑 Joker',
              point: '9.0',
              info: '电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事'
            },{
              photo: require('../pic/type/syr.webp'),
              name: '受益人',
              point: '6.7',
              info: '吴海（大鹏 饰）为了给罹患哮喘的6岁儿子治病，在好友钟振江（张子贤 饰）的怂恿下，刻意结识了一个与他同样身处边缘和底层的网络女主播淼淼（柳岩 饰），决心酝酿一场别有用心的婚姻骗局'
          }]
        }, {
          typeName: '专业影评',     
          movie: [{
              photo: require('../pic/type/yt.webp'),
              name: '一天',
              point: '7.9',
              info: '1988年7月15日，一所大学为毕业生的狂热所充盈。籍着这股躁动，轻浮的德克斯特（吉姆·斯特吉斯 Jim Sturgess 饰）穿过层层人墙，寻找可以与之共度这最后狂欢与浪漫之夜的尤物。他将目光锁定在艾玛（安妮·海瑟薇 Anne Hathaway 饰）的身上，一个来自普 通工薪家庭的聪慧女孩。'
            },{
              photo: require('../pic/type/sszs.webp'),
              name: '寿司之神',
              point: '8.7',
              info: '《寿司之神》是由大卫·贾柏拍摄的一部关于寿司的纪录片。他是一个道道地地的纽约客！从小热爱寿司的他被小野二郎的职人精神而感动，干脆扛着摄影机至日本拍摄  '
            },{
              photo: require('../pic/type/hzg.webp'),
              name: '幻の光',
              point: '8.2',
              info: '由美子（江角真纪子饰）小时候，奶奶总是离家出走，执意要从城市回乡下终老，并且有一次一去不返。再后来，由美子结婚生子，过着清贫但是幸福美满的小生活，有一天丈夫郁夫（浅野忠信饰）却意外离去。'
            },{
              photo: require('../pic/type/syr.webp'),
              name: '受益人',
              point: '6.7',
              info: '吴海（大鹏 饰）为了给罹患哮喘的6岁儿子治病，在好友钟振江（张子贤 饰）的怂恿下，刻意结识了一个与他同样身处边缘和底层的网络女主播淼淼（柳岩 饰），决心酝酿一场别有用心的婚姻骗局'
          }]
        }],
    }
  },
  methods: {
    goPage(index) {
      this.$router.push(`/typePage?index=${index}`)
    }
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
            font-size: 14px;
            margin-left: 10px;
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