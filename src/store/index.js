import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    type: 0, //0,不显示;  1,登录;   2,注册
    userId: localStorage.getItem('userName'),
    userIdCode: localStorage.getItem('userId'),
    brief: localStorage.getItem('brief'),
    head: localStorage.getItem('head'),
    saw: localStorage.getItem('saw') ? JSON.parse(localStorage.getItem('saw')) : [], //想看的电影
    like: localStorage.getItem('like') ? JSON.parse(localStorage.getItem('like')) : [], //喜欢的电影
    data: {}, //所有用户资料
  },
  mutations: {
    add(state, res) {
      if (res.e === 0) {
        state.saw.push(res.cover);
        localStorage.setItem('saw', JSON.stringify(state.saw));
      } else if (res.e === 1) {
        state.like.push(res.cover);
        localStorage.setItem('like', JSON.stringify(state.like));
      }
      state.data = {
        saw: state.saw,
        like: state.like,
      }
      localStorage.setItem(state.userIdCode, JSON.stringify(state.data))
    },
    login(state, type) {
      state.type = type;
    },
    getUserId(state, user) {
      state.userId = user.name;
      state.userIdCode = user.userid;
      state.brief = user.brief;
      state.head = user.head;
      if (state.userId) {
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.userid);
        localStorage.setItem('brief', user.brief);
        localStorage.setItem('head', user.head);
      } else {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('brief');
        localStorage.removeItem('head');
        localStorage.removeItem('like');
        localStorage.removeItem('saw');
      }
    }
  },
})

export default store