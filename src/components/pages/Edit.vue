<template>
  <div id="edit">
    <section class="editor px-3 my-2">
      <Editor/>
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

export default {
  name: 'edit',
  components: {
    Editor,
    Footer
  },
}
</script>

<style scoped lang="scss">
.section.editor {
  min-height: 100vh;
  width: 100%;
  max-width: 680px;
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