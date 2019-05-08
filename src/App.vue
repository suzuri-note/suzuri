<template>
  <div id="app">
    <div class="global-navigation">
      <Navbar/>
      <StatusBar/>
    </div>
    <section class="editor px-3 my-2">
      <Editor/>
    </section>
    <section class="note px-3">
      <DailyNote v-for="(value, key) in note" :key="key" :date="key" :memos="value"/>
    </section>
    <section class="footer px-3">
      <hr>
      <Footer/>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import StatusBar from '@/components/StatusBar.vue'
import Editor from '@/components/Editor.vue'
import Footer from '@/components/Footer.vue'
import DailyNote from '@/components/DailyNote.vue'

import noteService from '@/services/note'
import noteStore from '@/store/modules/note'
import datelib from '@/lib/datelib'

export default {
  name: 'app',
  components: {
    Navbar,
    StatusBar,
    Editor,
    Footer,
    DailyNote
  },
  computed: {
    note: () => noteStore.dailyNote
  },
  created: function() {
    noteService.list()
      .then(result => {
        if (result.status === "success") {
          noteStore.replaceList(result.data)
        }
      })
      .catch(err => {
        const level = StatusLevel.Warning
        const message = err
        appStore.setStatus({ level, message })
      })
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

.global-navigation {
  position: fixed;
  width: 100vw;
  z-index: 1000;
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