<template>
  <div class="mt-0 ">
    <div class="d-flex vh-100 builder" >
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
import LeftBar from '@/components/builder/LeftBar.vue'
import BuilderTabs from "@/components/builder/BuilderTabs.vue";
import draggable from 'vuedraggable'
declare var require: any

 export default {
    components: {
        draggable,
        LeftBar,
        BuilderTabs
    }
 }
</script>

<style>
@import '@/blocks/style/blocks.css';
.builder{
    overflow-y: hidden;
    background-color: #171717 !important;
}
#header {
  padding: 0 0;
}
</style>