<template>
  <div class="container">
    <TopNav/>
    <Lunbo/>
    <Type/>
    <div class="top">
    </div> 
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    TopNav: () => import('../components/TopNav'),
    Lunbo: () => import('../components/Lunbo'),
    Type: () => import('../components/Type'),
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.container {
}
</style>
