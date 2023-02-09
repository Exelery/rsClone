<template>
    <Codemirror
      v-model:value="text"
      class="editor"
      :options="cmOptions"
      placeholder="test placeholder"
    />
  </template>
  
  <script lang="ts">
import { useEditorStore } from "@/stores/editor";
import Codemirror from "codemirror-editor-vue3";
  
  import "codemirror/mode/htmlmixed/htmlmixed.js";
  
  import "codemirror/theme/abbott.css";
  
  import { ref } from "vue";
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
          mode: "text/html", // Language mode
          theme: "abbott", // Theme
          lineNumbers: true, // Show line number
          smartIndent: true, // Smart indent
          indentUnit: 2, // The smart indent unit is 2 spaces in length
          foldGutter: true, // Code folding
          styleActiveLine: true, // Display the style of the selected row
        },
      };
    },
    created(){
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
        },true)
    }
  };
  </script>

  <style>
  .editor{
    height: calc(100vh - 41px) !important;
    width: calc(100vw - 280px)!important;
  }

  .CodeMirror {
font-size: 18px;
}
</style>