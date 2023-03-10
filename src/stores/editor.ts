import { defineStore } from "pinia";


export const useEditorStore = defineStore({
  id: "editor",
  state: () => ({
    activeBlock: 'navBar',
    activeProject: localStorage.getItem("activeProject"),
    tabs: [{
      type: "page", //"page" or "script"
      name: "Main"
    }],
    editorValue: '',
    activePage:'Main',
    activeEditor: {name:'', path: '', index: -1, id:''},
    editorSaved: Boolean(localStorage.getItem("editorSaved"))
  }),
  getters: {
    value: (state) => state.activeBlock,
    getEditorValue: (state) => state.editorValue,
    getactivePage: (state) => state.activePage
  },
  actions: {
    setActive(blockType: string) {
      this.activeBlock = blockType;
    },
    addTab(tab: {type: string; name: string, path?: string; index?: number, id?: string }) {
      this.tabs.push(tab);
    },
    editorSetValue(data: {params: {path: string; index: number; id?: string}; text: string}){
       this.editorValue = data.text
    },
    setActiveEditor(data: {name:string, path: string; index: number, id: string}){
        this.activeEditor = data
    },
    setActivePage(name: string){
      this.activePage = name
    },
    saveBlocks(){
      return true
    },
    updateEditorList(){
      return 1
    },
    saveUpdates(save : boolean){
      this.editorSaved = save;
      localStorage.setItem("editorSaved", String(save))
    }
  },
});