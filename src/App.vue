<template>
  <div id="app">
    <TopNav/>
    <Login v-if="$store.state.type === 1" @closeLogin="closeLogin"/>
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
  },
  methods: {
    closeLogin () {
      if (this.$store.state.userId != '') {
        this.$store.commit('login', 2);
      } else {
        this.$store.commit('login', 0);
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  margin: 0;
}
</style>
