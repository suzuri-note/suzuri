<template>
    <nav :class="navClass">
      <div class="navbar-brand">
        <a href="#" class="navbar-item text-brand">SUZURI</a>
        <span class="ml-1">v0.2.0 alpha</span>
      </div>
      
      <div class="navbar-menu">
        <router-link to="/edit/new">
          <button type="button" class="icon-btn icon-btn-primary"><i class="fas fa-plus"></i></button>
        </router-link>
        <router-link to="/account" class="ml-1">
          <button type="button" class="icon-btn icon-btn-primary"><i class="fas fa-user-circle"></i></button>
        </router-link>
      </div>
    </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Navbar extends Vue {
  get navClass(): object {
    return {
      'navbar': true,
      'bg-dark': true,
    };
  }
}
</script>


<style scoped lang="scss">
.navbar {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: .5rem 1rem;
  transition: transform 150ms 0s ease;
  transform: translateY(0%);
  height: 3.25rem;
}

.navbar-brand {
    font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue';
    font-size: 1.5rem;
}

i.fas {
  font-size: 1.25rem;
}
</style>
