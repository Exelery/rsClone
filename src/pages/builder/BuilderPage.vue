<template>
    <div class="d-flex vh-100 bg-light builder" >
        <LeftBar/>
        <div style="width:100%">
            <BuilderTabs/>
            <RouterView  />
        </div>
        
    </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import LeftBar from '../../components/builder/LeftBar.vue'
import BuilderTabs from "../../components/builder/BuilderTabs.vue";
import draggable from 'vuedraggable'
declare var require: any

 export default {
    data() {
        return {
            htmlCode: '<h1>hello world</h1>'
        }
    },
    components: {
        draggable,
        LeftBar,
        BuilderTabs
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
@import '../../blocks/style/blocks.css';
.builder{
    overflow-y: hidden;
}
</style>