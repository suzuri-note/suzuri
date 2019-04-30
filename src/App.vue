<template>
  <div id="app">
    <Navbar class="header-layout"/>
    <section class="editor">
      <Editor/>
    </section>
    <section class="note p-3">
      <DailyNote v-for="dailyNote in note" :key="dailyNote.date" :dailyNote="dailyNote"/>
    </section>
    <section class="footer p-3">
      <hr>
      <Footer/>
    </section>
    
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Editor from './components/Editor.vue'
import Footer from './components/Footer.vue'
import DailyNote from './components/DailyNote.vue'

import DummyData from './store/dummy.js'

export default {
  name: 'app',
  components: {
    Navbar,
    Editor,
    Footer,
    DailyNote
  },
  data: () => ({
    note: DummyData.note
  }),
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-layout {
  position: fixed;
  width: 100vw;
}
section.editor {
  min-height: 100vh;
  padding: 4.125rem 1rem 1rem 1rem;
  width: 100%;
  min-width: 400px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}
section.note {
  width: 100%;
  min-width: 400px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
}
section.footer {
  width: 100%;
  min-width: 400px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
}


</style>


<!-- Global Setting-->
<style lang="scss">
/* background-color */
body {
    background-color: $background;
}
.bg-primary {
    background-color: $primary!important;
}
.bg-secondary {
    background-color: $secondary!important;
}
.bg-background {
    background-color: $background;
}
.bg-border {
    background-color: $border;
}
.bg-surface {
    background-color: $surface;
}

/* text color */
a {
    color: $link;
}
.text-primary {
    color: $primary!important;
}
.text-secnodary {
    color: $secondary!important;
}
.text-default {
  color: $text;
}
.text-link {
  color: $link;
}
.text-error {
    color: $error;
}
.text-muted {
    color: $muted;
}
.text-border {
    color: $border;
}

/* btn */
.btn-primary {
    color: $primary;
    background-color: transparent;
    border-color: $primary;
}
.btn-secondary {
    color: $secondary;
    background-color: transparent;
    border-color: $secondary;
}

/*icon*/
.icon-large {
  font-size: 1.5em;
}

/*icon-btn*/
.icon-btn {
  border: none;
  background-color: transparent;
}
.icon-btn:focus {
  outline: none!important;
  box-shadow: none!important;
}
.icon-btn-secondary {
  color: $secondary;
}
.icon-btn-secondary:hover {
  color: $secnodary-dark;
}
.icon-btn-border {
  color: $border;
}
.icon-btn-border:hover {
  color: $border-dark;
}

/* form-control */
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: $surface;
  background-clip: padding-box;
  border: 1px solid $border;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-control:focus {
  color: #495057;
  background-color: $surface;
  border-color: $border-dark;
  outline: 0;
  box-shadow: none;
}
textarea.form-control {
  resize: none;
}

/* hr */
hr {
  border-top: 1px solid $border;
}

/* dropdown-menu */
.dropdown-menu {
  background-clip: padding-box;
  background-color: $surface;
  border: 1px solid $border;
  border-radius: .25rem;
  box-shadow: 0 3px 12px rgba(27,31,35,.15);
  
  list-style: none;
  margin-top: 2px;
  padding-bottom: 5px;
  padding-top: 5px;
  position: absolute;
  top: 80%;
  left: auto;
  right: 0.5rem;
  width: auto;
  z-index: 100;

  display: block;
}
.dropdown-menu:after, .dropdown-menu:before {
    content: "";
    display: inline-block;
    position: absolute;
    border: .5rem solid transparent;
    border-bottom-color: $border;
    top: -1.0rem;
    left: auto;
    right: 1.0rem;
    z-index: 1;
}
.dropdown-menu:before {
    border: .5rem solid transparent;
    border-bottom-color: $surface;
    top: -webkit-calc(-1.0rem + 2px);
    top: -moz-calc(-1.0rem + 2px);
    top: calc(-1.0rem + 2px);
    left: auto;
    right: 1.0rem;
    z-index: 2;
}

/* dropdown-item */
.dropdown-item {
    display: block;
    width: 100%;
    padding: .25rem 1.5rem;
    clear: both;
    font-weight: 400;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}
.dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: $secondary;
}
.dropdown-item:focus, .dropdown-item:hover {
    color: #fff;
    text-decoration: none;
    background-color: $link;
}
</style>