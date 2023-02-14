<template>
    <div class="d-flex  flex-column flex-shrink-0 p-3 text-bg-dark left-bar" style="width: 280px;">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <i class="bi bi-box-fill mr-2"></i>   
      Blocks {{ $route.name }}
    </a>
    <hr>
    <ul v-if="$route.name === 'creator' " class="nav nav-pills flex-column mb-auto">
      <li>
        <a href="#" class="nav-link text-white active" val="navBar" @click="setActive($event)">
          <i class="bi bi-displayport"></i>
          Navbar
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white" val="cover" @click="setActive($event)">
          <i class="bi bi-collection"></i>
          Cover
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white" val="leftBar" @click="setActive($event)">
          <i class="bi bi-file"></i>
          Leftbar
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white"  val="albums"  @click="setActive($event)">
          <i class="bi bi-columns-gap"></i>
          Albums
        </a>
      </li>
    </ul>
    <LeftBar v-else/>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from "@/stores/editor";
import LeftBar from "../editor/LeftBar.vue";
export default {
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