<template>
    <div class="d-flex bg-light">
        <mainEditor/>
    </div>
</template>

<script lang="ts">
import mainEditor from '../../components/editor/mainEditor.vue'
declare var require: any

 export default {
    components: {
        mainEditor
    }
 }
</script>
