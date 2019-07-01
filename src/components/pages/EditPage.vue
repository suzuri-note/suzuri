<template>
  <div id="edit">
    <section id="edit-editor">
      <Editor 
        :id="id" 
        :body="body" 
        :preview="preview" 
        :navbarHidden="navbarHidden"
        @clicked-done="onClieckedDone"
        @clicked-preview="onClickedPreview"
        @autosave-emitted="onAutosaveEmitted"
        @changed-body="onChangedBody"
        />
    </section>
    <section id="edit-footer" class="nodisplay-sm">
      <hr>
      <Footer/>
    </section>
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import noteService, { ISingleResponse } from '@/services/note';
import noteStore from '@/store/modules/note';
import appStore, { StatusLevel } from '@/store/modules/app';
import localstorage from '@/lib/localstorage';

import Editor from '@/components/parts/Editor.vue';
import Footer from '@/components/parts/Footer.vue';

// Add the custom hook to use `beforeRouteUpdate` in the component
// ref. https://github.com/vuejs/vue-class-component#adding-custom-hooks
Component.registerHooks(['beforeRouteUpdate']);

@Component({ components: { Editor, Footer } })
export default class EditPage extends Vue {
  public id!: string;
  public body!: string;
  public preview!: boolean;

  constructor() {
    super();
    this.id = '';
    this.body = '';
    this.preview = false;
  }

  public created() {
    this.setID(this.$route.params.id);
  }

  // `beforeRouteUpdate` navigation guard called before route updated
  // ref. https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
  public beforeRouteUpdate(to: Route, from: Route, next: (to?: string | Location | false | ((vm: Vue) => any) | void) => void) {
    this.setID(to.params.id);
    next();
  }

  get navbarHidden(): boolean {
    return appStore.navbar.hidden;
  }

  public onClieckedDone() {
    if (this.body === '') {
        const level = StatusLevel.Warning;
        const message = 'Body text is required';
        appStore.setStatus({ level, message });
        return;
    }
    noteService.save({
        id: this.id,
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

  private setID(id: string): void {
    this.id = id === 'new' ? '' : id;
  }

  @Watch('id')
  private onIDChanged(newID: string) {
    if (newID !== '') {
      noteService.get(newID)
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
}
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

#edit {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

#edit-editor {
  min-height: calc(100% - 8rem);
}

#edit-footer {
  width: 100%;
  max-width: 680px;
  margin-bottom: 1.5rem;
  margin-top: 4.5rem;
  height: 2rem;
}
</style>


<!-- Global Setting-->
<style lang="scss">
@import "@/style/global.scss";
</style>