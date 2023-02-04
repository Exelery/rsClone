<template>
    <div class="d-flex vh-100 bg-light">
        <LeftBar/>
        <LeftBlocks/>
        <workingSpace ref="workingSpace"/>
    </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import LeftBar from '../components/builder/LeftBar.vue'
import LeftBlocks from '../components/builder/LeftBlocks.vue'
import workingSpace from '../components/builder/WorkingSpace.vue'

declare var require: any

 export default {
    data() {
        return {
            htmlCode: '<h1>hello world</h1>'
        }
    },
    components: {
        LeftBar,
        LeftBlocks,
        workingSpace,
        draggable
    },
    computed:{
        getComponents(): number {
            const ComponentContext = import.meta.glob('../components/builder/')
            return 1
        },
        show(){
            
        }
    },
    created(){
      let i = this.getComponents
    }
 }
</script>

<style>
@import '../blocks/style/blocks.css';
</style>