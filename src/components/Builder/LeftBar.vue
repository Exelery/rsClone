<script setup lang="ts">
import { VueElement } from "vue";
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
    <div class="d-flex vh-100 flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      Sidebar
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <a href="#" class="nav-link text-white active" val="navBar" @click="setActive($event)">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Navbar
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white" val="cover" @click="setActive($event)">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Cover
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white" val="leftBar" @click="setActive($event)">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Leftbar
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white"  val="albums"  @click="setActive($event)">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          Albums
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white" @click="setActive($event)">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
          Products
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
          Customers
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useEditorStore } from "@/stores/editor";

export default {
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