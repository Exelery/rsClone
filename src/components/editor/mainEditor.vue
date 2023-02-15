<template>
  <Codemirror
    v-model:value="text"
    class="editor"
    :options="cmOptions"
    placeholder="test placeholder"
    @ready="onCmReady"
    @focus="onCmFocus"
    @input="onCmCodeChange"
  />
</template>

<script lang="ts">
import { useEditorStore } from "../../stores/editor";
import Codemirror from "codemirror-editor-vue3";

import "codemirror/mode/htmlmixed/htmlmixed.js";

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode.js'

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';

import "codemirror/theme/mbo.css";

  export default {
    data(){
      let data: any = {
        text: "<!--- start buld your future ---->",
        fileParams: {}
      }

      return data
    },
    components: { Codemirror },
    setup() {

      return {
        cmOptions: {
          mode: "text/html",
          theme: "mbo", 
          lineNumbers: true, 
          smartIndent: true,
          extraKeys: {
            Ctrl: 'autocomplete',
          },
          autoCloseBrackets: true,
          autoClosetag: true,
          linerWrapping: true,
          lint: true,
          indentUnit: 4, 
          foldGutter: true, 
          styleActiveLine: true, 
          completeSingle:false
        },
      };
    },
    methods: {
      onCmReady(cm : any) {
        cm.on('keypress', () => {
            cm.showHint({completeSingle:false})
        })

    },
    onCmFocus() {
    },
    onCmCodeChange(newCode: any) {
      this.code = newCode;
    },
    onChange() {
      this.codemirror.showHint();
    },
  },
    computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
    },
    created(){
      if(useEditorStore().activeEditor.index !== -1){
        let list = localStorage.getItem(useEditorStore().activeEditor.path);
          let ParsedList = JSON.parse(String(list));
          this.text = ParsedList[useEditorStore().activeEditor.index].data;
          this.fileParams = useEditorStore().activeEditor
      }
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
          e.preventDefault();
          let list = localStorage.getItem(this.fileParams.path);
          let ParsedList = JSON.parse(String(list));
          ParsedList[this.fileParams.index].data = this.text;
          localStorage.setItem(this.fileParams.path, JSON.stringify(ParsedList))
        }
      }, false);

      useEditorStore().$onAction((e)=>{
        if(e.name === 'editorSetValue'){
          this.text = e.args[0].text;
          this.fileParams = e.args[0].params
        }

        if(e.name === 'setActiveEditor'){
          let list = localStorage.getItem(e.args[0].path);
          let ParsedList = JSON.parse(String(list));
          this.text = ParsedList[e.args[0].index].data;
          this.fileParams = e.args[0]
        }
        },true)
    }
  };
</script>

<style>
.editor {
  height: calc(100vh - 41px) !important;
  width: calc(100vw - 280px) !important;
}

.CodeMirror {
  font-size: 18px;
}
</style>
