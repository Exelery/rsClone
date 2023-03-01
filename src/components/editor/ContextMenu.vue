<template>
    <div :style="`transform: translate(${position.x}px, ${position.y}px); visibility: ${isVibsile}; ${isVibsile === 'hidden'?'display:none':''}`">
        <p @click="createFile">Create file {{ pageName }}</p>
        <p  @click="deleteFile">Delete page</p>
    </div>
</template>
<script lang="ts">
import {useEditorStore} from '@/stores/editor'
    export default {
        props:["isVibsile", "pageName"],
        data(){
            return {
                position:{
                    x: 0,
                    y:0
                },
                promptResult: "",
            }
        },
        methods:{
            createFile(){
                this.promptResult = String(prompt("Enter file name", ""));
                let list = localStorage.getItem(`${this.pageName}/${useEditorStore().activeProject}/page`);
                let ParsedList = JSON.parse(String(list));
                if(this.promptResult != null){
                    if(this.promptResult.includes(".html")){
                        ParsedList.push({
                            data: "",
                            html: true,
                            id: Math.random().toString(36).slice(-10),
                            name: this.promptResult.split(".")[0]
                        })
                    }else{
                        ParsedList.push({
                            data: "",
                            html: false,
                            id: Math.random().toString(36).slice(-10),
                            name: this.promptResult
                        })
                    }

                    localStorage.setItem(`${this.pageName}/${useEditorStore().activeProject}/page`, JSON.stringify(ParsedList));
                    
                    setTimeout(() => {
                        useEditorStore().updateEditorList();
                    }, 100);
                }
            },
            deleteFile(){
                localStorage.removeItem(`${this.pageName}/${useEditorStore().activeProject}/page`);
                setTimeout(() => {
                        useEditorStore().updateEditorList();
                    }, 200);
            }
        },
        created(){
            document.onmousemove = (event) =>{
                if(this.isVibsile != 'visible'){
                    this.position = {
                        x: event.clientX,
                        y: event.clientY
                    }
                }
            }
        }
    }
</script>
<style scoped>
    div{
        top: 20px;
        left: 10px;
        width: 200px;
        z-index: 9999;
        background: #26272e;
        color: #cbcbcb;
        position: absolute;
        border: 1px solid;
    }
    div p{
        cursor: pointer;
    }
    div p:hover{
        background: #464646;
    }
</style>