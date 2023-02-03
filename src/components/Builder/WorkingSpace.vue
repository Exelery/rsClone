<template>
    <draggable 
    v-model="blocks"
    group="people"
    @start="drag=true"
    @end="drag=false"
    item-key="id"
    class="working-space scrollspy-example"
    data-bs-spy="scroll"
    >
        <template #item="{element}">
            <div class="block">
                <div v-html="element.data"></div>
                <h1 v-if="element.html === false">hello</h1>
            </div>  
        </template>
    </draggable>
</template>

<script lang="ts">
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
        log(event: Event): void {
        // console.log(event)
      },
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
}
.working-space .block{
    margin-top: 0;
    background: auto;
    padding: 0;
}
</style>