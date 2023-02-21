<template>
    <draggable 
    v-model="blocks"
    item-key="id"
    class="blocks"
    :class="{'delete-space':(blocksType === 'delete')}"
    ghost-class="ghost"
    :dragover-bubble="true"
    :group="{ name: 'people', pull: 'clone', put: (blocksType === 'delete')?true:false }"
    >
        <template #item="{element}">
            <div class="block">
                <div v-html="element.data"></div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import { useEditorStore } from '@/stores/editor'
import draggable  from 'vuedraggable'
import nestedDraggable  from 'vuedraggable'

import blocks from '../../blocks/'
export default {
    data() {
        let data : {
            drag: boolean;
            enabled:boolean;
            blocks: {
                html: boolean;
                data: string | string[];
            }[],
            dragging: boolean;
            blocksType: string;
        } = {
            drag:true,
            enabled: true,
            blocks: blocks.navBar,
            dragging: false,
            blocksType: 'navBar'
        }
        return data 
    },
    methods:{
        log(event: Event): void {
        console.log(event)
      },
    },
    components:{
        draggable,
        nestedDraggable
    },
    created(){
        useEditorStore().$onAction((e)=>{
            if(e.name === 'setActive'){
                if(e.args[0] === "delete"){
                    this.blocks = [];
                    this.blocksType = "delete";
                }else{
                    this.blocks = blocks[(e.args[0] as keyof typeof blocks)]
                    this.blocksType = e.args[0];
                }
            }   
        },true)
    }
}
</script>

<style>
.blocks{
    width: 1024px;
    height: 280vh;
    padding: 0 10px;
    overflow-y: auto;
    scale: .3333;
    transform-origin: left top;
    background: rgb(215, 215, 215);
}
.block{
    margin-top: 10px;
    padding: 0 10px;
}

.delete-space{
    background: rgb(255, 130, 130);
}

.test{
    background: red;
}

</style>