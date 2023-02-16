<template>
<div class="folders">
    <div v-for="page in list">
        <section >
            <i class="bi bi-layout-text-window-reverse"></i>
            <p>
                {{page.name}}.page
            </p>
        </section>
        <div class="page">
            <section  v-for="component, index in page.components" 
            :class="{'active': component.id  == activeId}" 
            @click="SetEditor(page.page, index, component.id)"
            >
                <i class="bi bi-body-text"></i>
                <p>
                    {{component.name}}.block
                </p>
            </section>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { useEditorStore } from "../../stores/editor"
    export default {
        data(){
            let data: any = {
                list: [],
                activeProject: '',
                activeButton: '',
                activeId: 0,
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
            }
        },
        created(){
            this.activeId = useEditorStore().activeEditor.id
            this.activeProject = localStorage.getItem("activeProject")
            for(let page in localStorage){
                if(page.includes(`/${this.activeProject}/page`)){
                    let pageList = localStorage.getItem(page)
                    this.list.push({
                            page,
                            name: page.split("/")[0],
                            components:JSON.parse(String(pageList))
                        }
                        )
                }
            }

            useEditorStore().$onAction((e)=>{
                if(e.name === 'setActiveEditor'){
                    this.activeId = e.args[0].id
                }
            },true)
            
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
    }

    .folders section:hover{
        background: #5d5d5d;
        
    }

    .folders section.active {
        background: #0776de;
    }

    .folders section i {
        margin-right: 10px;
    }
</style>