<template>
  <div id="app">
    <header>
      <Navbar class="header" :hidden="hideStatusBar"/>
      <StatusBar class="statusbar"/>
    </header>
    <router-view class="router-view px-3 my-2"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Navbar from '@/components/globals/Navbar.vue';
import StatusBar from '@/components/globals/StatusBar.vue';

@Component({ components: { Navbar, StatusBar }})
export default class App extends Vue {
  hideStatusBar!: boolean;
  windowScrollY!: number;

  constructor() {
    super();
    this.hideStatusBar = false;
    this.windowScrollY = 0;
  }

  mounted() {
    this.windowScrollY = window.scrollY;
    window.addEventListener('scroll', this.onScrolled);
  }

  private onScrolled(): void {
    if (window.scrollY < 24) {
      this.hideStatusBar = false;
    } else {
      const diff = (window.scrollY - this.windowScrollY);
      if (diff > 5) {
        this.hideStatusBar = true;
      } else if (diff < -10) {
        this.hideStatusBar = false;
      }
    }
    this.windowScrollY = window.scrollY;
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
    padding-top: 3.25rem;
    width: 100%;
    max-width: 680px;
}
</style>

