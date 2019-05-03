<template>
  <div id="app">
    <Navbar class="header-layout"/>
    <section class="editor px-3 my-2">
      <Editor/>
    </section>
    <section class="note px-3">
      <DailyNote v-for="dailyNote in note" :key="dailyNote.date" :dailyNote="dailyNote"/>
    </section>
    <section class="footer px-3">
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

import note from "@/store/modules/note"

export default {
  name: 'app',
  components: {
    Navbar,
    Editor,
    Footer,
    DailyNote
  },
  computed: {
    note: () => ([{
      'date': '2019.05.03',
      'memos': note.memos,
    }])
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

.header-layout {
  position: fixed;
  width: 100vw;
}
section.editor {
  min-height: 100vh;
  padding-top: 4.125rem;
  width: 100%;
  max-width: 680px;
}
section.note {
  width: 100%;
  max-width: 680px;
  margin-bottom: 1rem;
}
section.footer {
  width: 100%;
  max-width: 680px;
  margin-bottom: 1rem;
}
</style>


<!-- Global Setting-->
<style lang="scss">
@import "./style/global.scss";
</style>