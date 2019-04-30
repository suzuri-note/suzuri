<template>
  <div id="app">
    <Navbar/>
    <Editor class="editor"/>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Editor from './components/Editor.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Editor,
    Footer
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.editor {
  flex-grow: 1;
  width: 100%;
  min-width: 400px;
  max-width: 680px;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;  
  padding: 1em;
}
.footer {
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
</style>