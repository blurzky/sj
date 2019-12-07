import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    type: 0, //0,不显示;  1,登录;   2,注册
    userId: localStorage.getItem('userName'),
    userIdCode: localStorage.getItem('userId'),
  },
  mutations: {
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