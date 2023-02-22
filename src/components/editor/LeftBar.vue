<template>
<div class="folders">
    <ContextMenu 
                :isVibsile = "contextMenuVisiblity"
                :pageName  = "ContextMenuPageName"
    />
    <div v-for="page in list">
        <section @mousedown.right="openMenu($event, page.name)"
                 @contextmenu.prevent>
            <i class="bi bi-layout-text-window-reverse"></i>
            <p>
                {{page.name}}.page
            </p>
        </section>
        <div class="page">
            <section class="file"  v-for="component, index in page.components" 
            :class="{'active': component.id  == activeId}" 
            @click="SetEditor(page.page, index, component.id)"
            >
                <i class="bi bi-body-text"></i>
                <p>
                    {{component.name}}{{!component.name.includes(".")?".block":"" }}
                </p>
                <i class="bi bi-three-dots"></i>
            </section>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { useEditorStore } from "../../stores/editor"
import ContextMenu from './ContextMenu.vue'
    export default {
        data(){
            let data: any = {
                list: [],
                activeProject: '',
                activeButton: '',
                activeId: 0,
                contextMenuVisiblity: "hidden"
            }
            return data
        },
        methods:{
            SetEditor(path: string, index: number, id : string) {
                this.activeId = id
                let pageList = JSON.parse(String(localStorage.getItem(path)))[index]
                useEditorStore().setActiveEditor({name: path.split("/")[0], path, index, id})

                useEditorStore().addTab({
                    name: pageList.name,
                    type: "script",
                    id,
                    index,
                    path
                })

                useEditorStore().editorSetValue({
                    params: {path, index, id},
                    text:pageList.data
                })
            },

            openMenu(event : Event, pageName: string){
                event.preventDefault();
                this.contextMenuVisiblity = "visible"
                this.ContextMenuPageName = pageName
                return false
            },

            updateList(){
                this.list = [];
                for(let page in localStorage){
                    if(page.includes(`/${useEditorStore().activeProject}/page`)){
                        let pageList = localStorage.getItem(page)
                        this.list.push({
                                page,
                                name: page.split("/")[0],
                                components:JSON.parse(String(pageList))
                            })
                    }
                }
            }
        },
        components:{
            ContextMenu
        },
        // computed: {
        //     count () {
        //         return useEditorStore().activeEditor
        //     }
        // },
        created(){
            this.activeId = useEditorStore().activeEditor.id;
            this.updateList()
            useEditorStore().$onAction((e)=>{
                if(e.name === 'setActiveEditor'){
                    this.activeId = e.args[0].id
                }

                if(e.name === 'updateEditorList'){
                    this.updateList()
                }
            },true)

            document.body.onclick = () =>{
                this.contextMenuVisiblity = 'hidden'
            }
        }
    }

</script>

<style>
    .folders p{
        color: #cdcdcd;
        margin-bottom: 0px;
    }
    .page{
        padding-left: 20px;
    }
    .folders section{
        padding: 0;
        display: flex;
        margin-bottom: 2px;
        cursor: pointer;
        padding: 2px 6px;
        position: relative;
    }
    .folders section:hover{
        background: #5d5d5d;
        
    }

    .folders section .bi-three-dots{
        position: absolute;
        right: 0px;
        opacity: 0.8;
        width: 20px;
        top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        border-radius: 4px;
    }

    .folders section p{
        margin-right: 20px;
    }

    .folders section.active {
        background: #0776de;
    }

    .folders section i {
        margin-right: 10px;
    }
</style>