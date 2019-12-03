import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    type: 0, //0,未登录;  1,登录中;    2,已登录    3,注册
    userId: '',
  },
  mutations: {
    login(state, type) {
      state.type = type;
      if (type === 0) {
        state.userId = '';
      }
    },
    getUserId(state, userId) {
      state.userId = userId;
    }
  },
})

export default store