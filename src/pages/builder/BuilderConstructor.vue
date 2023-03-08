<template>
    <div class="d-flex vh-100">
        <LeftBlocks/>
    <workingSpace ref="workingSpace"/>
    </div>
</template>

<script lang="ts">
import LeftBlocks from '@/components/builder/LeftBlocks.vue'
import workingSpace from '@/components/builder/WorkingSpace.vue'

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