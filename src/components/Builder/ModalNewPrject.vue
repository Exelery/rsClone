<template>
    <!-- The Modal -->
<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Create new page</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <input type="text" v-model="projectName" class="form-control rounded-2" id="floatingInput" placeholder="About or pricing...">
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" @click="createPage" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import { useEditorStore } from '../../stores/editor'
  export default {
    data(){
      return {
        projectName: ""
      }
    },
    methods:{
      createPage(){
        if(this.projectName.length != 0){
          console.log(this.projectName.length)
          localStorage.setItem(this.projectName + "/" + localStorage.getItem("activeProject") + "/page", "[]");
          useEditorStore().addTab({
            name: this.projectName,
            type: "page"
          })
          this.projectName = ""
        }    
      }
    }
  }
</script>