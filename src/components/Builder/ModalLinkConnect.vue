<template>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="flex" v-for="page in pages">
        <div 
        class="page-name" 
        data-bs-dismiss="modal"
        @click="setActiveLink(page.name)">
            {{ page.name }}
        </div>
        <hr>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Connect</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { useEditorStore } from "../../stores/editor"
import { useBuilderFloatMenu } from "@/stores/builderFloatMenu"
export default{
    data(){
        return {
            bool: true
        }
    },
    methods:{
        setActiveLink(name: string){
            useBuilderFloatMenu().setActive(name)
        }   
    },
    computed:{
        pages(){
            return useEditorStore().tabs.filter((page: {type:string}) => page.type == 'page')
        }
    }
}
</script>

<style>
.page-name{
    cursor: pointer;
    padding:10px;
}
.page-name:hover{
    background: #d5d5d5;
}
</style>