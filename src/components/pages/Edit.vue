<template>
  <div id="edit">
    <section class="editor px-3 my-2">
      <Editor 
        :id="id" 
        :body="body" 
        :preview="preview" 
        @clicked-done="onClieckedDone"
        @clicked-preview="onClickedPreview"
        @autosave-emitted="onAutosaveEmitted"
        @changed-body="onChangedBody"
        />
    </section>
    <section class="footer px-3">
      <hr>
      <Footer/>
    </section>
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { Vue, Component, Prop } from 'vue-property-decorator';

import noteService, { ISingleResponse } from '@/services/note';
import noteStore from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';
import localstorage from '@/lib/localstorage';

import Editor from '@/components/parts/Editor.vue';
import Footer from '@/components/parts/Footer.vue';

@Component({ components: { Editor, Footer } })
export default class EditPage extends Vue {
  id!: string | null;
  body!: string;
  preview!: boolean;

  constructor() {
    super();
    this.id = null;
    this.body = '';
    this.preview = false;
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

    if (this.id != null) {
      noteService.get(this.id)
        .then((result: ISingleResponse): void => {
            if (result.status === 'success') {
                this.body = result.data.body;
            }
        })
        .catch((err: Error): void => {
            const level = StatusLevel.Error;
            const message = err.toString();
            appStore.setStatus({ level, message });
        });
    } else {
        const { body } = localstorage.read();
        this.body = body;
    }
  }

  public onClieckedDone() {
    if (this.body === '') {
        const level = StatusLevel.Warning;
        const message = 'Body text is required';
        appStore.setStatus({ level, message });
        return;
    }
    noteService.save({
        id: '',
        title: 'TITLE',
        body: this.body,
    })
    .then((result: ISingleResponse) => {
        if (result.status === 'success') {
            noteStore.save(result.data);
            this.body = '';
            this.preview = false;
            localstorage.clear();

            const level = StatusLevel.Info;
            const message = 'Successfully Saved';
            appStore.setStatus({ level, message });
        } 
    })
    .catch((err: Error) => {
        const level = StatusLevel.Error;
        const message = err.toString();
        appStore.setStatus({ level, message });
    });
  }

  public onClickedPreview(): void {
    this.preview = !this.preview;
  }

  public onAutosaveEmitted(): void {
    localstorage.saveBody(this.body);
  }

  public onChangedBody(newValue: string): void {
    this.body = newValue;
  }
}
</script>

<style scoped lang="scss">
#edit {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.section.editor {
  min-height: 100vh;
  width: 100%;
  max-width: 680px;
}
section.footer {
  width: 100%;
  max-width: 680px;
  margin-top: 10rem;
  margin-bottom: 1.5rem;
}
</style>


<!-- Global Setting-->
<style lang="scss">
@import "@/style/global.scss";
</style>