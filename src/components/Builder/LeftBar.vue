<template>
    <div class="d-flex  flex-column flex-shrink-0 p-3 text-bg-dark left-bar" style="width: 280px;">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <i class="bi bi-box-fill mr-2"></i>   
      Blocks  {{ $route.name }}
    </a>
    <hr>
    <ul v-if="$route.name === 'creator' " class="nav nav-pills flex-column mb-auto">
      <li v-for="block in blocks">
        <a href="#" class="nav-link text-white " :val="block" @click="setActive($event)">
          <i class="bi bi-displayport"></i>
          {{block}}
        </a> 
      </li>
    </ul>
    <LeftBar v-else/>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from "../../stores/editor";
import LeftBar from "../editor/LeftBar.vue";
import blocks from '../../blocks/'; 
export default {
  data(){
    let data : any = {
        blocks : [],
    }
    return data;
  },
  components:{
    LeftBar
  },
  methods:{
    setActive(event: Event){
      let elem = (event.target as HTMLElement);
      (document.querySelector(".active") as HTMLElement).classList.remove("active");
      elem.classList.add("active");
      useEditorStore().setActive(String(elem.getAttribute("val")))
    }
  },
  created(){
    this.blocks = Object.keys(blocks);
    console.log(this.blocks)
  }
}
</script>

<style>
.left-bar{
  overflow-y: auto;
}
.mr-2{
  margin-right: 10px;
}


.left-bar::-webkit-scrollbar {
  width: 10px;
}

.left-bar::-webkit-scrollbar-track {
  background: #212529; 
}
 

.left-bar::-webkit-scrollbar-thumb {
  background: #888; 
}


.left-bar::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>