<template>
  <div id="edit">
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
import Editor from '@/components/Editor.vue'
import Footer from '@/components/Footer.vue'
import DailyNote from '@/components/DailyNote.vue'

import noteService from '@/services/note'
import noteStore from '@/store/modules/note'
import datelib from '@/lib/datelib'

export default {
  name: 'edit',
  components: {
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
.section.editor {
  min-height: 100vh;
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
@import "@/style/global.scss";
</style>