<template>
<div class="d-flex btn-tab text-bg-dark">
    <div class="scroll p-2">
    <div v-for="tab in tabsList">
            <button v-if="tab.type === 'page'"  @click="()=> setActivePage(tab.name)" class="tab btn btn-primary">{{tab.name}}</button>
            <button v-else  @click="()=> setActiveEditor(tab.name, String(tab.path), Number(tab.index), String(tab.id))" class="tab btn btn-primary btn-script" :class="{'tabs-active':activeTabId === tab.id}">{{tab.name}} <i class="bi bi-code-slash"></i></button>
        </div>
    </div>
        <button ref="syncButton" class="tab btn btn-primary sync-button" :class="{'btn-warning': !isSynced}" @click="saveChanges()">sync</button>
    </div>
</template>

<script lang="ts">
import DataApi from '@/api/dataApi';
import { useEditorStore } from '../../stores/editor'
    export default {
        data(){
            let data : {
                tabsList: {
                    type: string;
                    name: string;
                    path?: string; 
                    id?: string;
                    index?: number
                }[],
                activeTabId: string
                } = {
                    tabsList: [],
                    activeTabId: '',
                };

            return data
        },
        computed:{
            isSynced(){
                return useEditorStore().editorSaved;
            }
        },
        methods:{
            setActivePage(name: string) {
                useEditorStore().setActivePage(name)
                this.$router.push('/builder/create');
            },
            setActiveEditor(name: string, path: string, index: number, id: string){
                useEditorStore().setActiveEditor({name, path, index, id})
                this.$router.push('/builder/editor');
            },
            async saveChanges(){
                (this.$refs.syncButton as HTMLElement).setAttribute("style","cursor: progress;")
                let pages = [];
                for(let page in localStorage){
                    if(page.includes("/page")){
                        pages.push({
                            fileName: page.split("/")[0] + ".json",
                            content: String(localStorage.getItem(page))
                        })
                    }
                }
                const data = {
                    projectId: Number(localStorage.getItem("activeProjectId")),
                    projectName: String(localStorage.getItem("activeProject")),
                    data: pages
                }

                const answer = await DataApi.updateProject(data);
                useEditorStore().saveUpdates(true);
                (this.$refs.syncButton as HTMLElement).removeAttribute("style")
                console.log('answer', answer.data)
            }
        },

        created(){
            for(let page in localStorage){
                if(page.includes(`/${localStorage.getItem("activeProject")}/page`)){
                    this.tabsList.push({
                        type: "page",
                        name: page.split("/")[0]
                    })

                    if(page.split("/")[0] !== 'Main'){
                        useEditorStore().addTab({
                            type: "page",
                            name: page.split("/")[0]
                        })
                    }
                    
                }
            }
            useEditorStore().$onAction((e)=>{
                if(e.name === 'addTab'){
                let includes =  this.tabsList.filter((
                    tab : { 
                    type: string;
                    name: string;
                    path?: string;
                    id?: string;
                    index?: number
                    }) => {
                        if(tab.type == 'script'){
                            return tab.index == e.args[0].index 
                                    && tab.path === e.args[0].path
                        }
                    })
                    
                    if(includes.length == 0){
                        this.tabsList.push(e.args[0]);
                        localStorage.setItem("tabsList", JSON.stringify(this.tabsList))
                    }
                }

                if(e.name ==="setActiveEditor"){
                    this.activeTabId = e.args[0].id
                }
            },true)
        }

    }
    
</script>

<style>
.btn-tab{
    max-width: calc(100vw - 280px);
    display: flex;
}
.btn-tab .scroll{
    width: calc(100% - 86px);
    display: flex;
    overflow: auto !important
}
.btn-tab button{
    padding: 2px 19px !important;
    font-size: 14px;
    margin-right: 5px;
    color: rgb(233, 233, 233);
    animation-name: add-tab;
    animation-duration: 0.3s;
}
.btn-tab .sync-button{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 999;
}

.btn-script{
    background: #4d4d4d !important;
    border: none !important;
}
.tabs-active{
    background: rgb(0, 128, 255) !important;
    animation-name: add-tab;
    animation-duration: 0.4s;
}


.btn-tab .scroll::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  cursor: pointer;
}

.btn-tab .scroll::-webkit-scrollbar-track {
  background: #212529; 
}
 

.btn-tab .scroll::-webkit-scrollbar-thumb {
  background: #888; 
}


.btn-tab .scroll::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

@keyframes add-tab {
  0%   {scale: 0.7;}
  55%  {scale: 1.05;}
  80%  {scale: 0.9;}
  100% {scale: 1.0;}
}
</style>