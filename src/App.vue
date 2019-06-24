<template>
  <div id="app">
    <header :class="headerClass">
      <Navbar />
    </header>
    <StatusBar :class="statusBarClass" />
    <router-view class="router-view"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Navbar from '@/components/globals/Navbar.vue';
import StatusBar from '@/components/globals/StatusBar.vue';
import appStore from '@/store/modules/app';

@Component({ components: { Navbar, StatusBar }})
export default class App extends Vue {
  windowScrollY!: number;

  constructor() {
    super();
    this.windowScrollY = 0;
  }

  mounted() {
    this.windowScrollY = window.scrollY;
    window.addEventListener('scroll', this.onScrolled);
  }

  get headerClass(): any {
    return {
      'header': true,
      'header-hidden': appStore.navbar.hidden,
    };
  }

  get statusBarClass(): any {
    return {
      'statusbar': true,
      'statusbar-hidden': appStore.statusbar.hidden,
      'statusbar-on-header-hidden': appStore.navbar.hidden,
    }
  }

  private onScrolled(): void {
    if (window.scrollY < 24) {
      appStore.showNavbar();
    } else {
      const diff = (window.scrollY - this.windowScrollY);
      if (diff > 5) {
        appStore.hideNavbar();
      } else if (diff < -10) {
        appStore.showNavbar();
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

.header {
  position: fixed;
  width: 100vw;
  z-index: 1000;
  transition: transform 150ms 0s ease;
  transform: translateY(0%);
}
.header-hidden {
  transform: translateY(-100%);
}

.statusbar {
  position: fixed;
  z-index: 999;
  transition: transform 300ms 0s ease, top 150ms 0s ease;
  top: 3.25rem;
  left: 0px;
  transform: translateY(0%);
}
.statusbar-hidden {
  transform: translateY(-100%);
}
.statusbar-on-header-hidden {
  top: 0rem;
}

.router-view {
    padding-top: 3.25rem;
    width: 100%;
    max-width: 680px;
}
</style>

