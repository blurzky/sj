<template>
  <div id="app">
    <TopNav/>
    <Login v-if="$store.state.type === 1" @closeLogin="closeLogin"/>
    <Rigister v-if="$store.state.type === 2" @closeLogin="closeLogin"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
    TopNav: () => import('./components/TopNav'),
    Login: () => import('./components/Login'),
    Rigister: () => import('./components/Rigister'),
  },
  methods: {
    closeLogin () {
      this.$store.commit('login', 0);
    }
  }
}
</script>
<style lang="scss">
#app {
  margin: 0;
}
</style>
