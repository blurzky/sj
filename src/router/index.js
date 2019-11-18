import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },{
    path: '/typePage',
    component: () => import('../views/TypePage.vue'),
  },{
    path: '/detail',
    component: () => import('../views/Detail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  // 或
  // window.scroll(0, 0);
});
