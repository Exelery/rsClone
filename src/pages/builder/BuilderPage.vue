<template>
  <HeaderBox></HeaderBox>
  <div class="mt-3 ">
    <div class="d-flex vh-100 bg-light builder pt-5" >
        <LeftBar/>
        <div style="width:100%">
            <BuilderTabs/>
            <RouterView  />
        </div>
        
    </div>
  </div>
  <FooterBox></FooterBox>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import HeaderBox from "@/components/HeaderBox.vue";
import FooterBox from "@/components/FooterBox.vue";
import LeftBar from '@/components/Builder/LeftBar.vue'
import BuilderTabs from "@/components/Builder/BuilderTabs.vue";
import draggable from 'vuedraggable'
declare var require: any

 export default {
    data() {
        return {
            htmlCode: '<h1>hello world</h1>'
        }
    },
    components: {
      FooterBox,
      HeaderBox,
        draggable,
        LeftBar,
        BuilderTabs
    },
    computed:{
        getComponents(): number {
            const ComponentContext = import.meta.glob('@/components/Builder/')
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
#header {

  padding: 0 0;
}
</style>