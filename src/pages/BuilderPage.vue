<template>
    <div class="d-flex vh-100 bg-light">
        <LeftBar/>
        <LeftBlocks/>
        <workingSpace ref="workingSpace"/>
        <button type="button" @click="() => show" class="btn btn-primary position-absolute" style="right: 25px; bottom: 20%;">Preview</button>
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
            console.log(ComponentContext)
            return 1
        },
        show(){
            console.log(this.$refs)
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