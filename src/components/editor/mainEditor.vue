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
import "codemirror/mode/javascript/javascript.js";

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/foldgutter.js'

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';

import "codemirror/theme/mbo.css";
import "codemirror/addon/scroll/annotatescrollbar.js";

  export default {
    data(){
      let data: any = {
        text: "<!--- start buld your future ---->",
        fileParams: {},
        fileName: ""
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
          line: true,
          extraKeys: {
            Ctrl: 'autocomplete',
          },
          showDifferences: true,
          autoCloseBrackets: true,
          autoClosetag: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          linerWrapping: true,
          lint: true,
          indentUnit: 4, 
          foldGutter: true, 
          styleActiveLine: true, 
          completeSingle: false
        },
      };
    },
    methods: {
      onCmReady(cm : any) {
        cm.on('keypress', () => {
            cm.showHint({completeSingle:false})
          
        })
        
        cm.on('change', () => {
          cm.setOption('mode', (this.fileName.includes(".js"))?'text/javascript':'text/html')
        })
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
          localStorage.setItem(this.fileParams.path, JSON.stringify(ParsedList));
          useEditorStore().saveUpdates(false)
        }
      }, false);

      useEditorStore().$onAction((e)=>{
        if(e.name === 'editorSetValue'){
          this.text = e.args[0].text;
          this.fileParams = e.args[0].params;
        }

        if(e.name === 'setActiveEditor'){
          let list = localStorage.getItem(e.args[0].path);
          let ParsedList = JSON.parse(String(list));
          this.text = ParsedList[e.args[0].index].data;
          this.fileParams = e.args[0];
          this.fileName = ParsedList[e.args[0].index].name;
        }
        },true)
    }
  };
</script>

<style>
.editor {
  height: calc(100vh - 47px) !important;
  width: calc(100vw - 280px) !important;
}


.editor *::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.editor *::-webkit-scrollbar-track {
  background: #212529; 
}
 

.editor *::-webkit-scrollbar-thumb {
  background: #888; 
}


.editor *::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.CodeMirror {
  font-size: 18px;
}
</style>
