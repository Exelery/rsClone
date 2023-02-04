<template>
    <div>
    <div ref="workingSpace" class="working-space">
        <draggable 
        v-model="blocks"
        group="people"
        @start="drag=true"
        @end="drag=false"
        item-key="id"
        class="working-space-drop"
        >
            <template  #item="{element}">
                <div @mouseover="edit($event)" class="block">
                    <div v-html="element.data"></div>
                    <h1 v-if="element.html === false">hello</h1>
                </div>  
            </template>
        </draggable>
    </div>
    <button type="button" @click="show" class="btn btn-primary position-absolute" style="right: 25px; bottom: 25px;">Preview</button>
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useEditorStore } from '@/stores/editor'
import draggable from 'vuedraggable'
import blocks from '@/blocks/'
export default {
    data() {
        return {
            drag:true,
            enabled: true,
            blocks: [],
            blocksType: '',
            dragging: false,
        }
    },
    methods:{
        edit(event: Event){
            let elem = (event.target) as HTMLElement;
            // elem.setAttribute("style", "background: red")
            // https://api.unsplash.com/search/photos?page=1&query=mountain&client_id=yugMy1rL6bPUQVHjtXVFzkZWc8mRLS0EOqrb6IAw3oA&per_page=2
        },
      show() {
        let workingSpace = this.$refs.workingSpace as HTMLElement;
        if( workingSpace.className.includes("active")){
            workingSpace.classList.remove("active")
        }else{
            workingSpace.classList.add("active")
        }
        
    }
    },
    components:{
        draggable,
    },
    created(){
        useEditorStore().$onAction((e)=>{
            this.blocksType = e.args[0];
        },true)
    }
}
</script>

<style>
.working-space{
    position: absolute;
    right: 0;
    margin: auto;
    width: 100vw;
    height: 300vh;
    overflow-y: auto;
    max-width: 1824px;
    max-height: 824px;
    scale: 0.5;
    transform: translateY(10px);
    transform-origin: calc(630px + 50%) top;
    background: rgb(230, 230, 230);
    transition: all 0.2s ease-in;
}

.working-space-drop{
    height: 100%;
    width: 100%;
}

.active.working-space{
    scale: 1;
    transform: translateY(0px);
    transform-origin: 0 0;
    width: 100vw;
    height: 100vh;
}
.working-space .block{
    margin-top: 0;
    background: auto;
    padding: 0;
}
</style>