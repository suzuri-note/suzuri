<template>
  <div id="app">
    <header>
      <Navbar class="header"/>
      <StatusBar class="statusbar"/>
    </header>
    <router-view class="router-view px-3 my-2"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/globals/Navbar.vue'
import StatusBar from '@/components/globals/StatusBar.vue'

export default {
    name: 'app',
    components: {
        Navbar,
        StatusBar
    }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  position: fixed;
  width: 100vw;
  z-index: 1000;
}
.header {
  z-index: 1000;
}
.statusbar {
  z-index: 999;
}

.router-view {
    padding-top: 4.125rem;
}
</style>

