<template>
  <div id="edit">
    <section class="editor px-3 my-2">
      <Editor :id="id"/>
    </section>
    <section class="footer px-3">
      <hr>
      <Footer/>
    </section>
  </div>
</template>

<script lang="ts">
import Editor from '@/components/parts/Editor.vue';
import Footer from '@/components/parts/Footer.vue';
import { Route } from 'vue-router';

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: { Editor, Footer } })
export default class EditPage extends Vue {
  id!: string | null;

  constructor() {
    super();
    this.id = null;
  }

  public created() {
    const id: string | (string | null)[] = this.$route.query.id;
    if (id instanceof Array) {
      if (id[0] != undefined) {
        this.id = id[0];
      }
    } else {
      this.id = id;
    }
  }
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