<template>
    <div class="d-flex vh-100 bg-light">
        <LeftBlocks/>
    <workingSpace ref="workingSpace"/>
    </div>
</template>

<script lang="ts">
import LeftBlocks from '@/components/Builder/LeftBlocks.vue'
import workingSpace from '@/components/Builder/WorkingSpace.vue'

 export default {
    data() {
        return {
            htmlCode: '<h1>hello world</h1>'
        }
    },
    components: {
        LeftBlocks,
        workingSpace,
    }
 }
</script>

<style>
@import '../../blocks/style/blocks.css';
</style>