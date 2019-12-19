import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    type: 0, //0,不显示;  1,登录;   2,注册
    userId: localStorage.getItem('userName'),
    userIdCode: localStorage.getItem('userId'),
    saw: localStorage.getItem('saw') ? JSON.parse(localStorage.getItem('saw')) : [], //想看的电影
    like: localStorage.getItem('like') ? JSON.parse(localStorage.getItem('like')) : [], //喜欢的电影
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [], //所有用户资料
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
      state.data =[{
        id: state.userIdCode,
        saw: state.saw,
        like: state.like,
      }];
      localStorage.setItem('data', JSON.stringify(state.data))
    },
    login(state, type) {
      state.type = type;
    },
    getUserId(state, user) {
      state.userId = user.name;
      state.userIdCode = user.userid;
      if (state.userId) {
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.userid);
      } else {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
      }
    }
  },
})

export default store